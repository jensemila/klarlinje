import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Mangler token" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("waitlist_signups")
    .update({
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
    })
    .eq("confirmation_token", token)
    .is("confirmed_at", null)
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Ugyldig eller brukt token" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
