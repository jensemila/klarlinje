"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Metadata } from "next";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Feil e-post eller passord.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-3xl text-forest mb-8 text-center">
          Klarlinje Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              E-post
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Passord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
          </div>
          {error && (
            <p className="text-sm text-terra bg-terra/10 px-4 py-3 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-sand font-semibold py-3 rounded-lg hover:bg-forest/90 transition disabled:opacity-60"
          >
            {loading ? "Logger inn…" : "Logg inn"}
          </button>
        </form>
      </div>
    </main>
  );
}
