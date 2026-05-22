import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { toCSV } from "@/lib/csv";

export async function GET() {
  // Verify admin session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from("waitlist_signups")
    .select("id, email, name, source, created_at, confirmed_at, unsubscribed_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []).map((row) => ({
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    source: row.source ?? "",
    created_at: row.created_at,
    confirmed_at: row.confirmed_at ?? "",
    unsubscribed_at: row.unsubscribed_at ?? "",
    status: row.unsubscribed_at
      ? "unsubscribed"
      : row.confirmed_at
      ? "confirmed"
      : "pending",
  }));

  const csv = toCSV(rows);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="klarlinje-venteliste-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
