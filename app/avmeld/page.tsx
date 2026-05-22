import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avmelding — Klarlinje",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function AvmeldPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-heading text-3xl text-forest mb-4">
            Ugyldig lenke
          </h1>
          <p className="text-charcoal/70 mb-8">
            Avmeldingslenken mangler eller er ugyldig.
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
  const res = await fetch(`${baseUrl}/api/avmeld?token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  });

  const success = res.ok;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        {success ? (
          <>
            <h1 className="font-heading text-3xl text-forest mb-4">
              Du er avmeldt
            </h1>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              E-postadressen din er fjernet fra ventelisten. Du vil ikke motta
              flere e-poster fra oss.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-3xl text-forest mb-4">
              Noe gikk galt
            </h1>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Avmeldingslenken er ugyldig eller allerede brukt. Ta kontakt hvis
              du fortsatt får e-poster.
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
