/* Klarlinje landing page — main app */
const { useState, useEffect, useRef } = React;

/* ───────────────────────────────────────────────────────────────────────────
   Tweakable defaults — handled by host
   ─────────────────────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "skog",
  "heroHeadline": "to-dager",
  "showProblem": true,
  "showVideos": true,
  "showQuotes": true,
  "datoLabel": "Son Spa · Våren 2027 · 15 plasser"
}/*EDITMODE-END*/;

/* ───────────────────────────────────────────────────────────────────────────
   Placeholder image — striped fill + monospace label
   ─────────────────────────────────────────────────────────────────────────── */
function Placeholder({ label, meta, className, style }) {
  return (
    <div className={`placeholder ${className || ""}`} style={style}>
      {meta && <div className="hero-image-meta">{meta}</div>}
      <div className="placeholder-label">{label}</div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Nav
   ─────────────────────────────────────────────────────────────────────────── */
function Nav({ onSignup }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="shell nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark"></span>
          <span>Klarlinje</span>
        </a>
        <div className="nav-links">
          <a href="#om" className="nav-link-text">Om</a>
          <a href="#retreat" className="nav-link-text">Retreaten</a>
          <a href="#bedrift" className="nav-link-text">Bedrift</a>
          <button className="btn" onClick={onSignup}>
            Bli med på ventelisten <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Hero
   ─────────────────────────────────────────────────────────────────────────── */
const HERO_OPTIONS = {
  "to-dager": "To dager uten støy.",
  "uthvilt":  "En helg du faktisk kommer hjem fra uthvilt.",
  "linje":    "En klar linje gjennom helgen.",
};

function Hero({ headlineKey, datoLabel, onSignup }) {
  const headline = HERO_OPTIONS[headlineKey] || HERO_OPTIONS["to-dager"];
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <div className="hero-label">
              <span className="hero-label-dot"></span>
              <span className="label">{datoLabel}</span>
            </div>
            <h1>{headline}</h1>
            <p className="hero-sub">
              For deg som allerede vet at du trenger mer ro, men som aldri har funnet et format som faktisk funker. Klarlinje er et sekulært, evidensbasert retreat for høytfungerende voksne.
            </p>
            <div className="hero-cta-row">
              <button className="btn btn-lg" onClick={onSignup}>
                Meld deg på ventelisten <span className="btn-arrow">→</span>
              </button>
              <a href="#program" className="btn btn-lg btn-ghost">
                Se programmet
              </a>
            </div>
            <p className="hero-fineprint">
              Gratis å melde seg på. Ingen spam. Du velger selv om du vil delta.
            </p>
          </div>
          <div className="hero-image-frame">
            <img src="images/hero-linen.webp" alt="Tre personer i linkapper sitter ved fjorden" className="hero-image-img" />
            <div className="hero-image-meta">01 / Hero</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Problem
   ─────────────────────────────────────────────────────────────────────────── */
function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="shell-narrow">
        <div className="problem-stack">
          <p>
            Du presterer. Du leverer. <span className="soft">Likevel er du aldri helt til stede.</span>
          </p>
          <p>
            Du har prøvd meditasjon via app. Det funker noen dager. <span className="soft">Roen forsvinner like fort som den kom.</span>
          </p>
          <p>
            En helg hjelper neppe, tenker du. <span className="soft">Det kommer an på helgen.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Hva er Klarlinje (3 columns)
   ─────────────────────────────────────────────────────────────────────────── */
function Hva() {
  const cols = [
    {
      glyph: "◎",
      title: "Meditasjon",
      body: "Guidede økter basert på forskning, ikke tradisjon. Korte, lange, sittende, gående. Ingen mantra, ingen røkelse.",
    },
    {
      glyph: "◈",
      title: "Bevegelse",
      body: "Rolig trening og bevegelse som forbereder kroppen på stillhet. Praktisk, lavterskel, uten ritualer.",
    },
    {
      glyph: "◇",
      title: "Restitusjon",
      body: "Badstue, søvn, måltider. Plass til at hodet får roe seg ned.",
    },
  ];
  return (
    <section id="om">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">02 · Innhold</span>
          </div>
          <h2>Tre ting,<br/>gjort godt.</h2>
        </div>
        <div className="three-cols">
          {cols.map((c, i) => (
            <div className="col" key={i}>
              <div className="col-glyph">{c.glyph}</div>
              <div className="col-title">{c.title}</div>
              <p className="col-body">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="son-note">
          Son Spa skaper gode følelser av seg selv. 40 minutter fra Oslo, fjordutsikt, gourmetmåltider og badstue er en del av opplevelsen.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Jens
   ─────────────────────────────────────────────────────────────────────────── */
function Jens() {
  return (
    <section id="jens">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">03 · Hvem leder</span>
          </div>
          <h2>Ingen guru,<br/>kun en pragmatiker.</h2>
        </div>
        <div className="jens-grid">
          <div className="jens-photo-frame">
            <img src="images/jens.jpg" alt="Portrett av Jens" className="jens-photo-img" />
          </div>
          <div>
            <div className="jens-prose">
              <p>
                <strong>Ingen guru, kun en pragmatiker.</strong> Jeg har meditert daglig i over ti år og undervist på folkehøgskole i fire. Et format uten svada, bygget på hva som faktisk virker.
              </p>
              <p>
                Jeg tar en master i ledelse, og har hatt topplederjobber i fire år. Klarlinje er stedet der det jeg har lært om prestasjon, ro og folk møter praksis.
              </p>
            </div>
            <div className="facts">
              <div className="fact">
                <div className="fact-num">10+</div>
                <div className="fact-label">år med daglig meditasjon</div>
              </div>
              <div className="fact">
                <div className="fact-num">4</div>
                <div className="fact-label">år i topplederrolle</div>
              </div>
              <div className="fact">
                <div className="fact-num">0</div>
                <div className="fact-label">chakra, aura, eller energi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Program
   ─────────────────────────────────────────────────────────────────────────── */
function Program() {
  const days = [
    {
      name: "Fredag kveld",
      meditation: "30 min meditasjon",
      body: "Ankomst til Son Spa. Velkomst og rolig innføring. Felles åpningsøkt. Middag.",
    },
    {
      name: "Lørdag",
      meditation: "2 × 30 min  ·  1 t valgfri",
      body: "Morgenmeditasjon og kveldsmeditasjon, hver på 30 minutter. En valgfri lengre økt på en time midt på dagen. Bevegelse mellom øktene. Måltider, badstue og stille perioder.",
    },
    {
      name: "Søndag formiddag",
      meditation: "1 t meditasjon",
      body: "Avsluttende økt på en time. Felles lunsj. Avreise.",
    },
  ];
  return (
    <section id="program">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">04 · Programmet</span>
          </div>
          <h2>Tre dager.<br/>Lite å huske på.</h2>
        </div>
        <div className="program-list">
          {days.map((d, i) => (
            <div className="program-day" key={i}>
              <div className="program-day-col">
                <div className="program-day-name">{d.name}</div>
                <div className="program-day-meditation">
                  <span className="program-med-dot">◎</span>
                  <span>{d.meditation}</span>
                </div>
              </div>
              <p className="program-day-body">{d.body}</p>
            </div>
          ))}
        </div>
        <div className="program-foot">
          <div>
            <div className="program-price">15 000 kr</div>
            <div className="program-price-note">Inkl. overnatting, alle måltider, spa og hele programmet.</div>
          </div>
          <div className="program-foot-mid">
            <div className="program-foot-num">2,5 t</div>
            <div className="program-foot-num-label">guidet meditasjon, pluss 1 t valgfri</div>
          </div>
          <a href="#retreat" className="btn btn-ghost">
            Full timesplan på /retreat <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Sted · Son Spa
   ─────────────────────────────────────────────────────────────────────────── */
function Sted() {
  const facilities = [
    {
      k: "Badstueflåte",
      v: "Fritt­liggende flåte på fjorden. Aufguss-seremoni hver kveld.",
      tag: "Høydepunkt",
    },
    {
      k: "Spa-avdeling",
      v: "Innendørs basseng, dampbad, finsk badstue og kalde stup.",
    },
    {
      k: "Fjord­badet",
      v: "Stille brygge. Badestige rett i Oslofjorden, året rundt.",
    },
    {
      k: "Hvile­rom",
      v: "Dempet lys, leire­vegger, plass til å sove mellom øktene.",
    },
  ];
  return (
    <section className="sted" id="sted">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">05 · Stedet</span>
          </div>
          <h2>Son Spa.<br/>Stille fjord, varm badstue.</h2>
        </div>

        <div className="sted-grid">
          <div className="sted-photo-frame">
            <img src="images/son-spa-pool.jpg" alt="Son Spa basseng med utsikt mot fjord og seilbåter" className="sted-photo-img" />
            <div className="hero-image-meta">JPG · 5:4</div>
          </div>
          <div className="sted-meta">
            <p>
              Et 4-stjerners spa-hotell 40 minutter sør for Oslo. Konferansesal med fjordutsikt, gourmetmåltider og full tilgang til hele spa-avdelingen er en del av opplevelsen.
            </p>
            <div className="sted-pull">
              Son Spa skaper gode følelser av seg selv.
            </div>
            <div className="sted-meta-rows">
              <div className="sted-meta-row">
                <span className="k">Sted</span>
                <span className="v">Son Spa, Vestby</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Fra Oslo S</span>
                <span className="v">40 min med bil · 50 min med tog</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Rom</span>
                <span className="v">Enkeltrom inkludert</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Måltider</span>
                <span className="v">Frokost, lunsj, middag · alle dager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spa-feature: badstueflåte + aufguss */}
        <div className="spa-feature">
          <div className="spa-feature-photo-wrap">
            <div className="spa-feature-photo-frame">
              <img src="images/aufguss-plunge.webp" alt="Øyeblikket etter aufguss ved fjorden" className="spa-feature-photo-img" />
            </div>
            <span className="spa-feature-badge">Hver kveld</span>
          </div>

          <div className="spa-feature-body">
            <span className="label label-accent">Kveldens høydepunkt</span>
            <h3 className="spa-feature-title">
              Aufguss på<br/>badstueflåten.
            </h3>
            <p className="spa-feature-lead">
              En flytende badstue på fjorden, 90 grader, plass til femten. Aufguss-mester heller vann tilsatt eteriske oljer på steinene og fordeler dampen med håndkle. Etter syv minutter er det stupet ned i Oslofjorden.
            </p>
            <div className="spa-feature-steps">
              <div className="spa-step">
                <span className="spa-step-num">01</span>
                <div>
                  <div className="spa-step-h">Tre runder, syv minutter hver</div>
                  <div className="spa-step-b">Hver runde har sin egen olje. Furu, einer, bergamott.</div>
                </div>
              </div>
              <div className="spa-step">
                <span className="spa-step-num">02</span>
                <div>
                  <div className="spa-step-h">Stupet i fjorden mellom rundene</div>
                  <div className="spa-step-b">Stige rett ned i saltvann. Stigen er belyst.</div>
                </div>
              </div>
              <div className="spa-step">
                <span className="spa-step-num">03</span>
                <div>
                  <div className="spa-step-h">Stille hvilerom etterpå</div>
                  <div className="spa-step-b">Te, tepper, ingenting du må si til noen.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hele spa-avdelingen som et lite raster */}
        <div className="spa-facilities">
          <div className="spa-facilities-head">
            <span className="label">Hele spa-avdelingen er inkludert</span>
          </div>
          <div className="spa-facilities-grid">
            {facilities.map((f, i) => (
              <div className="spa-fac" key={i}>
                <div className="spa-fac-row">
                  <span className="spa-fac-k">{f.k}</span>
                  {f.tag && <span className="spa-fac-tag">{f.tag}</span>}
                </div>
                <div className="spa-fac-v">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Bevis / Quotes
   ─────────────────────────────────────────────────────────────────────────── */
function Quotes() {
  const quotes = [
    {
      body: "Fantastisk opplegg, mange takk til alle som arrangerte og bidro.",
      attr: "Deltaker · breathwork-helg, 2024",
    },
    {
      body: "Bra lagt opp mht henting, program A til Å, fasiliteter og variasjon av happenings.",
      attr: "Deltaker · breathwork-helg, 2024",
    },
    {
      body: "Den beste helga jeg har hatt så langt i år. Fantastisk atmosfære og hyggelige folk all over the place.",
      attr: "Deltaker · breathwork-helg, 2024",
    },
    {
      body: "Tusen hjertelig takk.",
      attr: "Deltaker · breathwork-helg, 2024",
    },
  ];
  return (
    <section id="bevis">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">06 · Bevis</span>
          </div>
          <h2>Hva tidligere<br/>deltakere sier.</h2>
        </div>
        <p className="quotes-intro">
          Sitater fra deltakere på en breathwork-helg jeg arrangerte i 2024. Samme håndverk, samme nivellå av omsorg for detaljene, nå i et nytt format.
        </p>
        <div className="quotes quotes-grid-4">
          {quotes.map((q, i) => (
            <div className="quote" key={i}>
              <div className="quote-mark">“</div>
              <p className="quote-body">{q.body}</p>
              <div className="quote-attr">{q.attr}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Videos
   ─────────────────────────────────────────────────────────────────────────── */
function Videos() {
  const videos = [
    { title: "Hva Klarlinje er, kort fortalt", duration: "12:08", big: true },
    { title: "60-sekunders intro",                     duration: "01:14" },
    { title: "En helg, oppsummert",                    duration: "02:36" },
  ];
  return (
    <section className="sted" id="videoer" style={{ background: "var(--paper)" }}>
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">07 · Se det selv</span>
          </div>
          <h2>Bli kjent før du<br/>melder deg på.</h2>
        </div>
        <div className="video-grid">
          {videos.map((v, i) => (
            <div className={`video-card ${v.big ? "video-big" : ""}`} key={i}>
              <div className="video-thumb-wrap">
                <Placeholder
                  className="video-thumb"
                  label={`YouTube · ${v.duration}`}
                />
                <div className="video-play" style={{ pointerEvents: "none" }}>
                  <div className="video-play-circle">▶</div>
                </div>
              </div>
              <div className="video-meta">
                <div className="video-title">{v.title}</div>
                <div className="video-duration">{v.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   FAQ
   ─────────────────────────────────────────────────────────────────────────── */
const FAQ_DATA = [
  {
    q: "Må jeg ha meditert før?",
    a: "Nei. De fleste deltakerne har prøvd via app eller kurs, men det er ikke et krav. Du får alt du trenger på plass.",
  },
  {
    q: "Hva koster det, og hva er inkludert?",
    a: "15 000 kr inkl. enkeltrom, alle måltider, spa, badstue og hele programmet. Ikke inkludert: reise, alkohol og massasje.",
  },
  {
    q: "Er dette religiøst eller alternativt?",
    a: "Nei. Klarlinje er sekulært og evidensbasert. Ingen chakra, aura, energi eller healing. Bare praksis som faktisk er studert.",
  },
  {
    q: "Hva skjer på retreaten?",
    a: "Meditasjon, bevegelse, måltider, badstue og stille perioder. Full timesplan sendes ut til påmeldte i god tid før helgen.",
  },
  {
    q: "Hvem deltar?",
    a: "Voksne mellom 28 og 55 år som presterer mye og vil ha mer ro. Mange jobber innen tech, helse, ledelse eller akademia.",
  },
  {
    q: "Hva med trening?",
    a: "Rolig morgenbevegelse er en del av programmet. I tillegg arrangerer vi en felles joggetur eller gåtur for de som har lyst. Hotellets fasiliteter står også åpne for egen bruk.",
  },
  {
    q: "Kan jeg komme alene?",
    a: "De fleste kommer alene. Du får enkeltrom og bestemmer selv hvor mye du vil snakke med andre.",
  },
  {
    q: "Hvordan er det med mobil og alkohol?",
    a: "Vi anbefaler at mobilen blir liggende på rommet, og at du holder deg unna alkohol gjennom helgen. Du får mest ut av oppholdet slått på den måten. Ønsker du å forplikte deg, kan du levere inn telefonen i resepsjonen. Det er ingen regel eller forbud, bare en sterk anbefaling.",
  },
  {
    q: "Hva er avbestillingsvilkårene?",
    a: "Fri avbestilling fram til 30 dager før retreaten. Etter dette refunderes 50 % fram til 14 dager før.",
  },
  {
    q: "Hva bør jeg pakke?",
    a: "Behagelige klær til bevegelse og innendørs, badetøy, og noe varmt for kveldsturer. Mer praktisk info i påmeldingen.",
  },
  {
    q: "Hvordan er søknadsprosessen?",
    a: "Du melder deg på ventelisten først. Når datoene er satt, sender vi et kort søknadsskjema. Det handler om passform.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq">
      <div className="shell">
        <div className="section-head">
          <div className="section-head-meta">
            <span className="label">08 · Spørsmål</span>
          </div>
          <h2>De vanlige tvilene,<br/>kort besvart.</h2>
        </div>
        <div className="faq-list">
          {FAQ_DATA.map((item, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.q}</span>
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  <p className="faq-a-text">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Final CTA
   ─────────────────────────────────────────────────────────────────────────── */
function FinalCTA({ onSignup }) {
  return (
    <section className="final" id="bedrift">
      <div className="final-inner">
        <span className="label final-label">09 · Bli med</span>
        <h2>Du trenger ikke<br/>bestemme deg nå.</h2>
        <p>
          Ventelisten er gratis. Ingen forpliktelse. Vi sender deg dato og mer informasjon, så velger du selv om du vil søke om en plass.
        </p>
        <button className="btn btn-lg btn-final" onClick={onSignup}>
          Meld deg på ventelisten <span className="btn-arrow">→</span>
        </button>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Footer
   ─────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div>© 2026 Klarlinje · Oslo / Son</div>
        <div className="footer-links">
          <a href="#om">Om</a>
          <a href="#retreat">Retreat</a>
          <a href="#bedrift">Bedrift</a>
          <a href="#personvern">Personvern</a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Signup Modal
   ─────────────────────────────────────────────────────────────────────────── */
function SignupModal({ open, onClose }) {
  const [step, setStep] = useState("form"); // form | success
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setStep("form");
      setEmail("");
      setName("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStep("success");
  };

  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Lukk">×</button>
        {step === "form" ? (
          <form onSubmit={submit}>
            <span className="label modal-label">Venteliste · Høsten 2026</span>
            <h3>Bli med på ventelisten.</h3>
            <p>
              Du får én e-post når datoene er satt, og igjen når påmeldingen åpner. Det er alt.
            </p>
            <div className="modal-field">
              <label>Navn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Fornavn Etternavn"
                required
              />
            </div>
            <div className="modal-field">
              <label>E-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="navn@firma.no"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-lg">
              Sett meg på listen <span className="btn-arrow">→</span>
            </button>
            <p className="modal-fineprint">
              Ingen spam. Du kan melde deg av når som helst.
            </p>
          </form>
        ) : (
          <div className="modal-success">
            <div className="modal-success-mark">✓</div>
            <h3>Du står på listen.</h3>
            <p>
              Vi har sendt en bekreftelse til <strong style={{ color: "var(--ink)" }}>{email}</strong>. Sjekk innboksen din, eventuelt spam-mappen om den skulle smyge seg dit.
            </p>
            <button className="btn btn-ghost btn-block" onClick={onClose}>
              Lukk
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Tweaks panel
   ─────────────────────────────────────────────────────────────────────────── */
function KlarTweaks({ t, setTweak }) {
  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection label="Palette">
        <window.TweakSelect
          label="Fargeskala"
          value={t.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { value: "skog",  label: "Skog · sand, skog, terrakotta" },
            { value: "kveld", label: "Kveld · mørk skog" },
            { value: "papir", label: "Papir · minimal, kald grønn" },
          ]}
        />
      </window.TweakSection>

      <window.TweakSection label="Hero">
        <window.TweakSelect
          label="Headline"
          value={t.heroHeadline}
          onChange={(v) => setTweak("heroHeadline", v)}
          options={[
            { value: "to-dager", label: "«To dager uten støy.»" },
            { value: "uthvilt",  label: "«En helg du faktisk kommer hjem fra uthvilt.»" },
            { value: "linje",    label: "«En klar linje gjennom helgen.»" },
          ]}
        />
        <window.TweakText
          label="Etikett over headline"
          value={t.datoLabel}
          onChange={(v) => setTweak("datoLabel", v)}
        />
      </window.TweakSection>

      <window.TweakSection label="Seksjoner">
        <window.TweakToggle
          label="Problem-seksjon"
          value={t.showProblem}
          onChange={(v) => setTweak("showProblem", v)}
        />
        <window.TweakToggle
          label="Sitater / bevis"
          value={t.showQuotes}
          onChange={(v) => setTweak("showQuotes", v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   App
   ─────────────────────────────────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
  }, [t.palette]);

  const openSignup = () => setSignupOpen(true);
  const closeSignup = () => setSignupOpen(false);

  return (
    <>
      <Nav onSignup={openSignup} />
      <Hero
        headlineKey={t.heroHeadline}
        datoLabel={t.datoLabel}
        onSignup={openSignup}
      />
      {t.showProblem && <Problem />}
      <Hva />
      <Jens />
      <Program />
      <Sted />
      {t.showQuotes && <Quotes />}
      <FAQ />
      <FinalCTA onSignup={openSignup} />
      <Footer />
      <SignupModal open={signupOpen} onClose={closeSignup} />
      <KlarTweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
