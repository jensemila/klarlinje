import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResend, getFrom } from "@/lib/resend";
import { campaignEmail } from "@/lib/email-templates";
import { markdownToHtml, substituteVariables } from "@/lib/markdown";

const schema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
});

const BATCH_SIZE = 50;

export async function POST(request: NextRequest) {
  // Verify admin session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const { subject, body: bodyMarkdown } = parsed.data;
  const adminClient = createAdminClient();

  // Fetch all confirmed, non-unsubscribed recipients
  const { data: recipients, error: fetchError } = await adminClient
    .from("waitlist_signups")
    .select("id, email, name, unsubscribe_token")
    .not("confirmed_at", "is", null)
    .is("unsubscribed_at", null);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!recipients || recipients.length === 0) {
    return NextResponse.json({ error: "Ingen mottakere" }, { status: 400 });
  }

  // Create campaign record
  const { data: campaign, error: campaignError } = await adminClient
    .from("email_campaigns")
    .insert({
      subject,
      body_markdown: bodyMarkdown,
      recipient_count: recipients.length,
      sent_by: user.id,
    })
    .select("id")
    .single();

  if (campaignError || !campaign) {
    return NextResponse.json({ error: "Kunne ikke opprette kampanje" }, { status: 500 });
  }

  // Send in batches of 50
  const emailSends: { campaign_id: string; signup_id: string; resend_message_id: string }[] = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    const messages = batch.map((r) => {
      const personalizedBody = substituteVariables(bodyMarkdown, r.name);
      const bodyHtml = markdownToHtml(personalizedBody);
      const html = campaignEmail(subject, bodyHtml, r.unsubscribe_token);

      return {
        from: getFrom(),
        to: r.email,
        subject,
        html,
      };
    });

    const { data: batchResult, error: sendError } = await getResend().batch.send(messages);

    if (sendError) {
      console.error("Resend batch error:", sendError);
      continue;
    }

    if (batchResult?.data) {
      batchResult.data.forEach((sent, idx) => {
        emailSends.push({
          campaign_id: campaign.id,
          signup_id: batch[idx].id,
          resend_message_id: sent.id,
        });
      });
    }
  }

  // Log all sends
  if (emailSends.length > 0) {
    await adminClient.from("email_sends").insert(emailSends);
  }

  return NextResponse.json({ ok: true, count: emailSends.length });
}
