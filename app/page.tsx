import WaitlistForm from "@/components/WaitlistForm";
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const activities = [
  {
    title: "Meditasjonsøkter",
    desc: "Korte, guidede øvelser. Forankret i forskning, ikke tradisjon. Ingen erfaring nødvendig.",
    icon: "◎",
  },
  {
    title: "Trening",
    desc: "Fysisk aktivitet er en del av programmet, tilpasset alle nivåer. Kropp og hode henger sammen.",
    icon: "◈",
  },
  {
    title: "Badstue",
    desc: "Tradisjonell badstue som del av programmet. En av de mest effektive måtene å gi kroppen hvile.",
    icon: "◇",
  },
  {
    title: "Felles måltider",
    desc: "Enkelt og godt. Samtalene rundt bordet er en del av retreaten, ikke en pause fra den.",
    icon: "◻",
  },
];

const faqs = [
  {
    q: "Må jeg meditere fra før?",
    a: "Nei. Vi starter fra grunnen. Alle øvelser forklares og tilpasses. Det eneste kravet er at du møter opp.",
  },
  {
    q: "Hva om jeg ikke klarer å sitte stille?",
    a: "Det er poenget. Vi jobber med akkurat det. Programmet veksler mellom øvelser, trening, samtaler og fri tid. Ingen lange sekvenser som krever perfekt ro.",
  },
  {
    q: "Er dette religion eller åndelig praksis?",
    a: "Nei. Klarlinje er sekulær. Metodene er basert på psykologi og nevrobiologi, ikke tro eller tradisjon.",
  },
  {
    q: "Hva slags trening er det?",
    a: "Tilpasset, tilgjengelig trening som passer ved siden av meditasjon og badstue. Ikke CrossFit, ikke konkurranse. Tenk funksjonell bevegelse og aktivering.",
  },
  {
    q: "Kan jeg komme alene?",
    a: "Ja, og de fleste gjør det. En stor del av verdien er å møte andre i samme situasjon. Du trenger ikke kjenne noen på forhånd.",
  },
  {
    q: "Hvor mange deltar?",
    a: "Vi holder deltakerantallet bevisst lavt. Maks rundt 20 personer. Nok til fellesskap, lite nok til at det føles trygt.",
  },
  {
    q: "Hva koster det?",
    a: "Prisen er ikke satt ennå. Ventelistemedlemmer får tidlig tilgang og egne betingelser. Vi har som mål å holde prisen tilgjengelig.",
  },
  {
    q: "Når er det?",
    a: "Høsten 2026. Ventelisten varsles med dato og detaljer så snart det er klart.",
  },
  {
    q: "Er det Wi-Fi?",
    a: "Nei. Telefonfri helg er en del av formatet. Det er bevisst, og det er en stor del av hvorfor det virker.",
  },
  {
    q: "Hva trenger jeg å ta med?",
    a: "Ta gjerne med en treningsmatte eller yogamatte. Har du meditasjonspute eller krakk kan du ta det med, ellers låner du. Ta med noen lag varme klær til meditasjon, det er lett å bli kald når man sitter stille. En full pakkeliste sendes til alle på ventelisten.",
  },
  {
    q: "Må jeg sitte i en bestemt stilling når vi mediterer?",
    a: "Nei. Du kan sitte på stol, knele, stå eller sitte i lotusstilling på pute eller gulv. Alle vanlige stillinger fungerer. Vi bruker tid på å gå gjennom hva de ulike stillingene gjør med kropp og oppmerksomhet, slik at du kan velge bevisst og ikke bare av vane.",
  },
  {
    q: "Hva om jeg ikke er i form?",
    a: "Treningen tilpasses. Det er ingen krav til fysisk nivå, og ingenting er obligatorisk. Du setter tempoet selv.",
  },
  {
    q: "Leier dere hele Son Spa?",
    a: "Nei. Son Spa er et åpent hotell, og det kan godt hende andre gjester er der samme helg. Hvis nabobordet har fest lørdag kveld er det en fin anledning til å øve på det vi holder på med.",
  },
];

const videos = [
  {
    id: "3e08KHmZxDI",
    title: "Hvorfor pauser faktisk fungerer",
    desc: "Forskningen bak hvile og hva som skjer i hjernen din når du slutter å pushe.",
  },
  {
    id: "VIDEO_ID_2",
    title: "Meditasjon uten mystikk",
    desc: "Hva sekulær meditasjon er og hva det ikke er. Ingen tro nødvendig.",
  },
  {
    id: "VIDEO_ID_3",
    title: "Tilbake til mandag ladet",
    desc: "Hvordan en helg kan gi deg energi og klartenkthet som varer.",
  },
];

const shorts = [
  { id: "ElPfAgch1zY", title: "" },
  { id: "SHORT_ID_2", title: "Kjapt klipp 2" },
  { id: "SHORT_ID_3", title: "Kjapt klipp 3" },
];

const natureImages = [
  { src: "/naeromra-det_maridalsvannet25-4.webp", alt: "Natur ved Son Spa nær Oslo, rolige omgivelser for retreat" },
  { src: "/naeromra-det_maridalsvannet25-6.webp", alt: "Stille naturomgivelser nær retreatstedet Son Spa" },
];

const indoorImages = [
  { src: "/00-felles_mg_7953-2.webp", alt: "Deltakere i samtale under meditasjonsretreater nær Oslo" },
  { src: "/rom_internat25-13.webp", alt: "Overnatting på Son Spa under Klarlinje retreat" },
];

function VideoEmbed({ id, title }: { id: string; title: string }) {
  const isPlaceholder = id.startsWith("VIDEO_ID") || id.startsWith("SHORT_ID");
  if (isPlaceholder) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-forest/25 gap-3">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <code className="text-xs opacity-60">{id}</code>
      </div>
    );
  }
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "Klarlinje Retreat på Son Spa",
      "description": "Sekulært, evidensbasert meditasjonsretreat for høytfungerende voksne. Meditasjon, trening, badstue og felles måltider på Son Spa, 40 minutter sør for Oslo.",
      "startDate": "2026-10-01",
      "endDate": "2026-10-04",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Son Spa",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Verven 1",
          "addressLocality": "Son",
          "postalCode": "1555",
          "addressCountry": "NO"
        }
      },
      "organizer": {
        "@type": "Person",
        "name": "Jens",
        "url": "https://klarlinje.no/om"
      },
      "url": "https://klarlinje.no",
      "inLanguage": "nb-NO"
    },
    {
      "@type": "Person",
      "name": "Jens",
      "url": "https://klarlinje.no/om",
      "jobTitle": "Retreat-leder og meditasjonslærer",
      "description": "Jens har meditert i over ti år og undervist i meditasjon på Oslo folkehøgskole i fire år. Grunnlegger av Klarlinje.",
      "knowsAbout": ["meditasjon", "mindfulness", "evidensbasert meditasjon", "retreater", "stressreduksjon"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a
        }
      }))
    },
    {
      "@type": "Organization",
      "name": "Klarlinje",
      "url": "https://klarlinje.no",
      "description": "Sekulært, evidensbasert retreat nær Oslo. For høytfungerende voksne som vil ha ro som faktisk virker.",
      "founder": { "@type": "Person", "name": "Jens" },
      "areaServed": "Oslo og Viken"
    }
  ]
};

export default function HomePage() {
  return (
    <main className="bg-sand">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Nav ─── */}
      <header className="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <span className="font-heading font-bold text-forest text-xl tracking-tight">
          Klarlinje
        </span>
        <nav className="flex gap-8 text-sm font-medium text-charcoal/50">
          <Link href="/om" className="hover:text-forest transition-colors">Om</Link>
          <Link href="/personvern" className="hover:text-forest transition-colors">Personvern</Link>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section className="px-8 pt-12 pb-24 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">
            Høsten 2026 · Oslo
          </p>
        </div>

        {/* Two-column hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.0] tracking-tight text-forest mb-8">
              Klar for å bli helt uthvilt?
            </h1>
            <p className="text-lg text-charcoal/60 leading-relaxed mb-10 max-w-md font-light">
              Sekulær. Evidensbasert. Du finner ikke ditt tredje øye. En helg
              sammen med andre høytfungerende voksne.
            </p>
            <div className="max-w-sm">
              <WaitlistForm />
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/naeromra-det_nordmarka_stills.webp"
              alt="Nordmarka sett fra luften ved solnedgang"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sand/80 text-xs tracking-widest uppercase font-medium">Nordmarka, Oslo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Manifesto ─── */}
      <section className="bg-forest">
        <div className="max-w-6xl mx-auto px-8 py-24 grid lg:grid-cols-3 gap-0">
          {[
            { num: "01", text: "Ingen åndelig overbygning. Kun evidensbaserte pauser." },
            { num: "02", text: "Telefonfri helg, men ikke streng stillhet. Fellesskap er en del av helgen." },
            { num: "03", text: "Du skal kunne gå rett tilbake til mandag morgen full av energi og klartenkt." },
          ].map(({ num, text }, i) => (
            <div
              key={num}
              className={`px-8 py-10 ${i < 2 ? "lg:border-r border-sand/10" : ""} border-b lg:border-b-0 border-sand/10 last:border-b-0`}
            >
              <p className="font-heading font-bold text-6xl text-sand/10 mb-6 leading-none">{num}</p>
              <p className="text-sand/80 text-lg leading-relaxed font-light">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Hva er inkludert ─── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Alt inkludert</p>
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-14 tracking-tight leading-tight">
          Hva får du?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "🛏", title: "2 netter på Son Spa", desc: "Deluxe-rom på 4-stjerners spa-hotell inkludert i prisen." },
            { icon: "🍽", title: "Alle måltider", desc: "Frokost, lunsj og middag fredag kveld til søndag lunsj." },
            { icon: "♨️", title: "Spa og badstue", desc: "Full tilgang til Son Spas spa-anlegg gjennom hele oppholdet." },
            { icon: "◎", title: "Guidede meditasjonsøkter", desc: "Evidensbasert program tilpasset alle erfaringsnivåer." },
            { icon: "◈", title: "Trening og bevegelse", desc: "Tilpasset fysisk aktivitet som passer ved siden av meditasjon." },
            { icon: "◻", title: "Materiell og program", desc: "Alt du trenger er klart. Du trenger bare å møte opp." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-6 bg-cream rounded-2xl border border-bark/15">
              <span className="text-2xl mb-4 block">{icon}</span>
              <h3 className="font-heading font-semibold text-forest mb-2">{title}</h3>
              <p className="text-charcoal/55 text-sm leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── What to expect ─── */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-terra" />
              <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Programmet</p>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-6 tracking-tight leading-tight">
              Hva skjer på retreaten?
            </h2>
            <p className="text-charcoal/55 leading-relaxed mb-12 font-light">
              Vi holder til på Son Spa, et 4-stjerners spa-hotell 40 minutter
              sør for Oslo. Overnatting, mat og spa er inkludert.
            </p>
            <div className="space-y-4">
              {activities.map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="flex gap-5 p-5 bg-cream rounded-2xl border border-bark/15 hover:border-bark/35 hover:shadow-sm transition-all duration-200 group"
                >
                  <span className="text-terra text-xl mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">{icon}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-forest mb-1">{title}</h3>
                    <p className="text-charcoal/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-16">
            <ImageGallery images={indoorImages} aspectRatio="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* ─── Long-form videos ─── */}
      <section className="bg-cream px-8 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-terra" />
            <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Videoer</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest tracking-tight max-w-md leading-tight">
              Se det for deg selv
            </h2>
            <p className="text-charcoal/55 max-w-sm font-light leading-relaxed">
              Videoer som svarer på det du lurer på og viser at det faktisk virker.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map(({ id, title, desc }) => (
              <div key={id} className="group">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-forest/8 border border-forest/10 mb-4">
                  <VideoEmbed id={id} title={title} />
                </div>
                <h3 className="font-heading font-semibold text-forest mb-1 group-hover:text-terra transition-colors">{title}</h3>
                <p className="text-sm text-charcoal/55 leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Shorts ─── */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Kjappe svar</p>
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-16 tracking-tight">
          Ikke tid til en lang video?
        </h2>
        <div className="grid grid-cols-3 gap-5 max-w-xl">
          {shorts.map(({ id, title }) => (
            <div key={id} className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-forest/8 border border-forest/10">
              <VideoEmbed id={id} title={title} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Fellesskap ─── */}
      <section className="bg-forest">
        <div className="max-w-6xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/00-felles_mg_7953-2.webp"
              alt="Deltakere i samtale i felleslokalet"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sand">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-bark/60" />
              <p className="text-bark/60 text-xs font-semibold tracking-[0.2em] uppercase">Fellesskap</p>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-7 tracking-tight leading-tight">
              Fellesskap er en del av programmet
            </h2>
            <p className="text-sand/65 leading-relaxed text-lg font-light">
              Du deler helgen med andre høytfungerende voksne som kjenner på
              det samme presset som deg. Ikke streng stillhet, ikke tvungen
              prating. Bare rom til å være menneske blant mennesker.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Nærmiljøet ─── */}
      <section className="px-8 py-28 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Stedet</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest tracking-tight">
            Nærmiljøet
          </h2>
          <p className="text-charcoal/55 max-w-sm font-light leading-relaxed">
            Son Spa ligger ved fjorden i Son, ca. 40 minutter sør for Oslo.
            Rolig natur, sjøluft og god avstand fra hverdagen.
          </p>
        </div>
        <ImageGallery images={natureImages} aspectRatio="aspect-[4/3]" />
      </section>

      {/* ─── Kart og reisevei ─── */}
      <section className="bg-cream px-8 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-terra" />
            <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Praktisk</p>
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-16 tracking-tight">
            Lett å komme seg dit
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl overflow-hidden shadow-md border border-bark/10 aspect-[4/3]">
              <iframe
                src="https://maps.google.com/maps?q=Son+Spa,+Verven+1,+1555+Son&output=embed&z=13"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Son Spa på kart"
              />
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Bil",
                  text: "Ca. 40 minutter sør for Oslo sentrum via E6. Gratis parkering på stedet.",
                },
                {
                  label: "Tog",
                  text: "Vy tog fra Oslo S til Son stasjon, ca. 55 minutter. Taxi eller shuttle derfra.",
                },
                {
                  label: "Samkjøring",
                  text: "Vi kobler deltakere som ønsker samkjøring. Oppgi gjerne om du trenger skyss når du melder deg på.",
                },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-5 p-5 bg-sand rounded-2xl border border-bark/15">
                  <div className="w-2 h-2 rounded-full bg-terra mt-2.5 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-semibold text-forest text-sm mb-1">{label}</p>
                    <p className="text-charcoal/60 text-sm leading-relaxed font-light">{text}</p>
                  </div>
                </div>
              ))}
              <div className="p-5 rounded-2xl border border-terra/20 bg-terra/5">
                <p className="text-xs text-terra font-semibold tracking-widest uppercase mb-1">Adresse</p>
                <p className="font-heading font-bold text-forest text-lg">Verven 1, 1555 Son</p>
                <p className="text-charcoal/55 text-sm">Son Spa · 40 min sør for Oslo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Passer dette for deg? ─── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">For hvem?</p>
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-14 tracking-tight leading-tight">
          Passer dette for deg?
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-8 bg-cream rounded-2xl border border-bark/15">
            <p className="font-heading font-semibold text-forest text-lg mb-6">Dette passer for deg som</p>
            <ul className="space-y-4">
              {[
                "Har full jobb, kanskje barn, og for lite tid til deg selv",
                "Har prøvd meditasjon via app, men ikke funnet noe som varer",
                "Er skeptisk til det åndelige, men nysgjerrig på det evidensbaserte",
                "Vil møte andre i samme situasjon uten tvungen prating",
                "Trenger en helg der du faktisk lader opp, ikke bare slapper av",
              ].map((point) => (
                <li key={point} className="flex gap-3 items-start">
                  <span className="text-forest mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <p className="text-charcoal/65 leading-relaxed font-light">{point}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 bg-sand rounded-2xl border border-bark/15">
            <p className="font-heading font-semibold text-forest text-lg mb-6">Dette passer ikke for deg som</p>
            <ul className="space-y-4">
              {[
                "Leter etter en åndelig eller religiøs opplevelse",
                "Forventer et spa-opphold uten struktur eller program",
                "Ikke er åpen for å sitte stille i korte perioder",
                "Ønsker full luksus uten fellesskap med andre",
                "Vil ha alkohol som en del av helgen",
              ].map((point) => (
                <li key={point} className="flex gap-3 items-start">
                  <span className="text-charcoal/30 mt-0.5 flex-shrink-0 font-bold">✗</span>
                  <p className="text-charcoal/45 leading-relaxed font-light">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-8 py-28 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-terra" />
          <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">FAQ</p>
        </div>
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-16 tracking-tight">
          Spørsmål og svar
        </h2>
        <div>
          {faqs.map(({ q, a }, i) => (
            <div key={q} className={`py-7 ${i < faqs.length - 1 ? "border-b border-charcoal/8" : ""}`}>
              <h3 className="font-heading font-semibold text-forest mb-3">{q}</h3>
              <p className="text-charcoal/60 leading-relaxed font-light">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Grunnlegger ─── */}
      <section className="bg-cream px-8 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-terra" />
              <p className="text-terra text-xs font-semibold tracking-[0.2em] uppercase">Hvem er dette?</p>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-forest mb-7 tracking-tight">Jens</h2>
            <p className="text-charcoal/65 leading-relaxed text-lg font-light mb-5">
              Jeg har meditert i over ti år og undervist i meditasjon på Oslo
              folkehøgskole, der jeg jobbet i fire år. Klarlinje er laget
              fordi jeg tror retreats er en av de viktigste motgiftene mot det
              livet de fleste av oss lever.
            </p>
            <p className="text-charcoal/65 leading-relaxed font-light mb-8">
              Ingen åndelig overbygning. Ingen krav til erfaring. Jeg kjenner
              stedet og nærmiljøet godt. Du er i trygge hender.
            </p>
            <Link
              href="/om"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-terra transition-colors"
            >
              Les mer om Jens
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-80 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/Jens.jpg"
                alt="Jens, grunnlegger av Klarlinje"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-forest px-8 py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-bark/60 text-xs font-semibold tracking-[0.2em] uppercase mb-6">Høsten 2026 · Oslo</p>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-sand mb-6 tracking-tight leading-tight">
            Klar for 3 dager med ro?
          </h2>
          <p className="text-sand/55 mb-12 text-lg font-light">
            Ventelisten er gratis. Du forplikter deg ikke til noe.
          </p>
          <div className="max-w-sm mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-bark/20 px-8 py-8 bg-sand">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <span className="font-heading font-bold text-forest tracking-tight">Klarlinje</span>
          <div className="flex gap-8">
            <Link href="/om" className="hover:text-forest transition-colors">Om</Link>
            <Link href="/personvern" className="hover:text-forest transition-colors">Personvern</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
