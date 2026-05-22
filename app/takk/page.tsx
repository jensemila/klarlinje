import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Takk for påmeldingen — Klarlinje",
  robots: { index: false },
};

export default function TakkPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="text-5xl mb-6">✉️</div>
        <h1 className="font-heading text-3xl text-forest mb-4">
          Sjekk innboksen din
        </h1>
        <p className="text-charcoal/70 leading-relaxed mb-8">
          Vi har sendt deg en e-post med en bekreftelseslenke. Klikk på lenken
          for å bekrefte e-postadressen din og sikre plassen på ventelisten.
        </p>
        <p className="text-sm text-muted mb-8">
          Ikke finner du e-posten? Sjekk søppelpost-mappen.
        </p>
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
