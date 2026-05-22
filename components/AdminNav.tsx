"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const linkClass = (href: string) =>
    `text-sm px-3 py-1.5 rounded-md transition ${
      pathname === href
        ? "bg-forest/10 text-forest font-medium"
        : "text-charcoal/60 hover:text-forest"
    }`;

  return (
    <header className="border-b border-bark/20 bg-white px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-heading font-semibold text-forest">
            Klarlinje Admin
          </span>
          <nav className="flex gap-1">
            <Link href="/admin" className={linkClass("/admin")}>
              Oversikt
            </Link>
            <Link href="/admin/send" className={linkClass("/admin/send")}>
              Send e-post
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted hidden sm:block">{email}</span>
          <button
            onClick={signOut}
            className="text-sm text-muted hover:text-terra transition"
          >
            Logg ut
          </button>
        </div>
      </div>
    </header>
  );
}
