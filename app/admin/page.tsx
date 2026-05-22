import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Klarlinje",
  robots: { index: false },
};

function statusLabel(row: {
  confirmed_at: string | null;
  unsubscribed_at: string | null;
}) {
  if (row.unsubscribed_at) return { label: "Avmeldt", color: "text-muted bg-muted/10" };
  if (row.confirmed_at) return { label: "Bekreftet", color: "text-forest bg-forest/10" };
  return { label: "Venter", color: "text-bark bg-bark/20" };
}

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ count: total }, { count: confirmed }, { count: unsubscribed }, { data: signups }] =
    await Promise.all([
      supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true })
        .not("confirmed_at", "is", null),
      supabase
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true })
        .not("unsubscribed_at", "is", null),
      supabase
        .from("waitlist_signups")
        .select("id, email, name, created_at, confirmed_at, unsubscribed_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

  const stats = [
    { label: "Totalt påmeldt", value: total ?? 0 },
    { label: "Bekreftet", value: confirmed ?? 0 },
    { label: "Avmeldt", value: unsubscribed ?? 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl text-forest">Oversikt</h1>
        <a
          href="/api/admin/export"
          className="text-sm bg-forest text-sand px-4 py-2 rounded-lg hover:bg-forest/90 transition"
        >
          Last ned CSV
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-6 border border-bark/20 shadow-sm"
          >
            <p className="text-2xl font-semibold text-forest">{value}</p>
            <p className="text-sm text-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-bark/20 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bark/20 bg-sand">
              <th className="text-left px-4 py-3 font-medium text-muted">Navn</th>
              <th className="text-left px-4 py-3 font-medium text-muted">E-post</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Påmeldt</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {(signups ?? []).map((row) => {
              const status = statusLabel(row);
              return (
                <tr
                  key={row.id}
                  className="border-b border-bark/10 last:border-0 hover:bg-sand/50"
                >
                  <td className="px-4 py-3 text-charcoal">
                    {row.name ?? <span className="text-muted italic">—</span>}
                  </td>
                  <td className="px-4 py-3 text-charcoal">{row.email}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(row.created_at).toLocaleDateString("nb-NO")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {(signups ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  Ingen påmeldinger ennå.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
