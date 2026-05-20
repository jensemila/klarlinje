import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResend, getFrom } from "@/lib/resend";
import { confirmationEmail } from "@/lib/email-templates";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  website: z.string().max(0, "bot"),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Honeypot triggered
    if (parsed.error.issues.some((i) => i.path[0] === "website")) {
      return NextResponse.json({ ok: true }); // Silent success for bots
    }
    return NextResponse.json({ error: "Ugyldig e-postadresse" }, { status: 400 });
  }

  const { email, name } = parsed.data;
  const supabase = createAdminClient();

  // Check if already confirmed
  const { data: existing } = await supabase
    .from("waitlist_signups")
    .select("id, confirmed_at")
    .eq("email", email)
    .single();

  if (existing?.confirmed_at) {
    return NextResponse.json(
      { error: "Denne e-postadressen er allerede på ventelisten." },
      { status: 409 }
    );
  }

  const confirmationToken = crypto.randomUUID();

  if (existing) {
    // Resend confirmation
    await supabase
      .from("waitlist_signups")
      .update({ name: name ?? existing, confirmation_token: confirmationToken })
      .eq("id", existing.id);
  } else {
    const { error } = await supabase.from("waitlist_signups").insert({
      email,
      name: name || null,
      confirmation_token: confirmationToken,
      source: request.headers.get("referer") ?? null,
    });

    if (error) {
      console.error("Signup insert error:", error);
      return NextResponse.json(
        { error: "Kunne ikke lagre påmeldingen. Prøv igjen." },
        { status: 500 }
      );
    }
  }

  const { subject, html } = confirmationEmail(name ?? null, confirmationToken);

  await getResend().emails.send({
    from: getFrom(),
    to: email,
    subject,
    html,
  });

  return NextResponse.json({ ok: true });
}
