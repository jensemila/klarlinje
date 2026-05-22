import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bekreft e-postadresse — Klarlinje",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function BekreftPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-heading text-3xl text-forest mb-4">
            Ugyldig lenke
          </h1>
          <p className="text-charcoal/70 mb-8">
            Bekreftelseslenken mangler eller er ugyldig.
          </p>
          <Link href="/" className="text-sm text-forest underline hover:text-terra transition">
            Tilbake til forsiden
          </Link>
        </div>
      </main>
    );
  }

  const baseUrl =
    process.env.APP_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${baseUrl}/api/bekreft?token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  });

  const success = res.ok;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        {success ? (
          <>
            <div className="text-5xl mb-6">✅</div>
            <h1 className="font-heading text-3xl text-forest mb-4">
              E-post bekreftet!
            </h1>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Du er nå på ventelisten for Klarlinje-retreat. Vi tar kontakt så
              snart vi har dato og mer informasjon.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-6">⚠️</div>
            <h1 className="font-heading text-3xl text-forest mb-4">
              Lenken virker ikke
            </h1>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Bekreftelseslenken er ugyldig eller allerede brukt. Er du allerede
              bekreftet? Da er alt i orden.
            </p>
          </>
        )}
        <Link
          href="/"
          className="text-sm text-forest underline hover:text-terra transition"
        >
          Tilbake til forsiden
        </Link>
      </div>
    </main>
  );
}
