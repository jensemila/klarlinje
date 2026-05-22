import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personvernerklæring — Klarlinje",
  description: "Klarlinje sin personvernerklæring i henhold til GDPR.",
};

export default function PersonvernPage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted hover:text-forest transition mb-12 inline-block"
      >
        ← Tilbake
      </Link>

      <h1 className="font-heading text-4xl text-forest mb-2">
        Personvernerklæring
      </h1>
      <p className="text-muted text-sm mb-10">Sist oppdatert: mai 2025</p>

      <div className="space-y-8 text-charcoal/80 leading-relaxed">
        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            1. Behandlingsansvarlig
          </h2>
          <p>
            Klarlinje er behandlingsansvarlig for personopplysningene som samles
            inn via denne nettsiden. Ta kontakt på{" "}
            <a href="mailto:hei@klarlinje.no" className="text-forest underline">
              hei@klarlinje.no
            </a>{" "}
            for spørsmål om personvern.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            2. Hvilke opplysninger samler vi inn?
          </h2>
          <p>
            Vi samler inn følgende opplysninger når du melder deg på ventelisten:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>E-postadresse (obligatorisk)</li>
            <li>Fornavn (valgfritt)</li>
            <li>Tidspunkt for registrering og bekreftelse</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            3. Formål og rettslig grunnlag
          </h2>
          <p>
            Opplysningene brukes utelukkende til å sende deg informasjon om
            Klarlinje-retreat — datoer, priser og relevante oppdateringer.
            Rettslig grunnlag er ditt samtykke, jf. personvernforordningen (GDPR)
            art. 6 nr. 1 bokstav a.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            4. Dobbelt opt-in
          </h2>
          <p>
            Vi bruker dobbelt opt-in: du mottar en bekreftelsese-post og må
            aktivt bekrefte e-postadressen din før du legges til på ventelisten.
            Dette sikrer at ingen melder deg på uten ditt samtykke.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            5. Dine rettigheter
          </h2>
          <p>Du har rett til å:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Trekke tilbake samtykket ditt når som helst (avmelding)</li>
            <li>Kreve innsyn i hvilke opplysninger vi har om deg</li>
            <li>Kreve retting eller sletting av opplysninger</li>
            <li>Klage til Datatilsynet</li>
          </ul>
          <p className="mt-3">
            For å melde deg av, bruk avmeldingslenken i enhver e-post fra oss,
            eller ta kontakt på{" "}
            <a href="mailto:hei@klarlinje.no" className="text-forest underline">
              hei@klarlinje.no
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            6. Lagring og sikkerhet
          </h2>
          <p>
            Data lagres i Supabase (EU-region). Vi deler ikke opplysningene dine
            med tredjeparter, og bruker ingen tredjeparts e-postmarkedsverktøy.
            E-post sendes via Resend.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-forest mb-3">
            7. Sletting
          </h2>
          <p>
            Opplysninger slettes etter 12 måneder uten aktivitet, eller umiddelbart
            på forespørsel.
          </p>
        </section>
      </div>
    </main>
  );
}
