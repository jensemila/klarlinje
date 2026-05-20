import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Klarlinje — Jens",
  description: "Jens har meditert i over ti år og undervist i meditasjon på folkehøgskole. Klarlinje er hans svar på det han savnet.",
};

export default function OmPage() {
  return (
    <main className="min-h-screen bg-sand">
      {/* Nav */}
      <header className="px-6 py-5 max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-muted hover:text-forest transition-colors">
          ← Tilbake
        </Link>
      </header>

      <div className="px-6 pb-24 max-w-2xl mx-auto">

        {/* Photo + name */}
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end mb-14 mt-8">
          <div className="relative w-36 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
            <Image
              src="/Jens.jpg"
              alt="Jens"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div>
            <p className="text-terra text-xs tracking-widest uppercase mb-2">Grunnlegger</p>
            <h1 className="font-heading text-5xl text-forest leading-tight tracking-tight">Jens</h1>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-6 text-charcoal/75 leading-relaxed text-lg">
          <p>
            Jeg har meditert i over ti år. Ikke fordi jeg er en spirituell type,
            men fordi det er det mest effektive jeg har funnet for å fungere godt
            over tid.
          </p>
          <p>
            I fire år jobbet jeg på Oslo folkehøgskole Rønningen, der jeg blant
            annet underviste i meditasjon. Jeg så på nært hold hva en helg borte
            fra hverdagen gjør med folk — og jeg begynte å lure på hvorfor det
            ikke fantes et tilbud for de som trengte det mest: travle,
            ambisiøse voksne med barn, karriere og et konstant underskudd på ro.
          </p>
          <p>
            Klarlinje er mitt svar. Jeg tror retreats er en av de viktigste
            motgiftene mot det livet de fleste av oss lever. Ikke som flukt,
            men som vedlikehold. Som en service av deg selv.
          </p>
          <p>
            Ingen åndelig overbygning. Ingen krav til erfaring. Bare et par
            dager med god mat, gode folk, og øvelser som faktisk virker.
          </p>
        </div>

        {/* Divider stats */}
        <div className="grid grid-cols-3 gap-4 my-14 py-10 border-t border-b border-bark/20">
          {[
            { num: "10+", label: "år med meditasjon" },
            { num: "4", label: "år på Oslo FHS" },
            { num: "0", label: "chakra involvert" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-4xl text-forest mb-1">{num}</p>
              <p className="text-sm text-muted leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Klarlinje pitch */}
        <div className="space-y-5 text-charcoal/75 leading-relaxed">
          <h2 className="font-heading text-2xl text-forest">Hva er Klarlinje?</h2>
          <p>
            Et helgeretreater for folk som har full jobb og barn. Vi holder til
            på Oslo folkehøgskole Rønningen, ti minutters buss fra Storo.
            Romstandard på hotellnivå. Mat som er faktisk god.
          </p>
          <p>
            Programmet er sekulært og evidensbasert. Ingenting her krever tro.
            Du trenger ikke ha meditert før. Du trenger ikke sitte stille i
            timevis. Du trenger bare å møte opp.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            href="/"
            className="inline-block bg-forest text-sand font-semibold py-4 px-8 rounded-xl hover:bg-forest/90 transition-colors"
          >
            Bli med på ventelisten
          </Link>
        </div>
      </div>
    </main>
  );
}
