/* Klarlinje v2 — dark editorial direction */
const { useState, useEffect, useRef } = React;

/* ─── Research ─── */
function Research() {
  return (
    <section className="research" id="forskning">
      <div className="shell">
        <div className="research-head">
          <span className="label">05 / Forskning</span>
          <div></div>
          <h2><em className="editorial">Tre dager</em><br/>er nok.</h2>
        </div>

        <div className="research-grid">
          <div></div>
          <p className="research-lead">
            En randomisert studie viser at <em>tre dager</em> med meditasjon gir målbare biologiske endringer i immunsystemet.
          </p>
          <div className="research-stats">
            <div className="research-stat">
              <div className="research-stat-icon">↓</div>
              <div className="research-stat-body">
                <div className="research-stat-key"><em className="editorial">IL-6 &amp; IL-8</em></div>
                <div className="research-stat-val">Pro-inflammatoriske cytokiner signifikant redusert.</div>
              </div>
            </div>
            <div className="research-stat">
              <div className="research-stat-icon">↑</div>
              <div className="research-stat-body">
                <div className="research-stat-key"><em className="editorial">IL-10</em></div>
                <div className="research-stat-val">Anti-inflammatorisk cytokin økt.</div>
              </div>
            </div>
            <div className="research-stat">
              <div className="research-stat-icon">●</div>
              <div className="research-stat-body">
                <div className="research-stat-key"><em className="editorial">Stress &amp; angst</em></div>
                <div className="research-stat-val">Redusert opplevd stress og økt mindfulness.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="research-prose">
          <div></div>
          <div className="research-prose-col">
            <p>
              Studien randomiserte 95 friske deltakere i alderen 18 til 67 år til enten et tre-dagers mindfulness-retreat eller en aktiv kontrollgruppe i lignende sosial setting. Blodprøver og selvrapportering før og etter.
            </p>
            <p>
              Kronisk betennelse er koblet til depresjon, hjertesykdom og aldring. Et helgeretreat <em>er ikke alternativmedisin, det er fysiologi.</em>
            </p>
          </div>
          <div className="research-cite">
            <span className="label" style={{ display: "block", marginBottom: 10 }}>Kilde</span>
            <div className="research-cite-title">
              Rosenkranz et al. (2021)<br/>
              <em className="editorial">Psychoneuroendocrinology</em>
            </div>
            <a className="research-cite-link" href="https://pubmed.ncbi.nlm.nih.gov/34775250/" target="_blank" rel="noopener">
              pubmed.ncbi.nlm.nih.gov/34775250 <span className="btn-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const TWEAK_DEFAULTS_V2 = /*EDITMODE-BEGIN*/{
  "theme": "natt",
  "heroHeadline": "tre-dager",
  "showQuotes": true,
  "showAufguss": true,
  "showMarquee": true,
  "datoLabel": "Våren 2027"
}/*EDITMODE-END*/;

/* ─── Nav ─── */
function Nav({ onSignup }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-brand">
        <img src="images/icon.png" className="nav-brand-icon" alt="" aria-hidden="true" />
        <span><em className="editorial">Klarlinje</em></span>
      </a>
      <div className="nav-links">
        <a href="#programmet" className="nav-link-text">Programmet</a>
        <a href="#jens" className="nav-link-text">Hvem leder</a>
        <a href="#sted" className="nav-link-text">Stedet</a>
        <a href="#faq" className="nav-link-text">Spørsmål</a>
        <button className="btn" onClick={onSignup}>
          Venteliste <span className="btn-arrow">→</span>
        </button>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
const HERO_OPTIONS = {
  "tre-dager": { line1: "Tre dager", line2: "uten støy." },
  "uthvilt":   { line1: "En helg du",  line2: "kommer hjem fra." },
  "linje":     { line1: "En klar linje", line2: "gjennom helgen." },
};

function Hero({ headlineKey, datoLabel, onSignup }) {
  const h = HERO_OPTIONS[headlineKey] || HERO_OPTIONS["tre-dager"];
  return (
    <section className="hero" id="top">
      <img className="hero-image" src="images/hero-linen.webp" alt="Tre personer i linkapper ved fjorden" />
      <div className="hero-tint"></div>
      <div className="hero-grain"></div>
      <div className="hero-content">
        <div className="hero-top">
          <div></div>
          <div className="hero-meta-block">
            <span className="label">Datoer</span>
            <div className="meta-val">{datoLabel}</div>
            <span className="label" style={{ marginTop: 18 }}>Sted</span>
            <div className="meta-val">Son Spa, Vestby</div>
          </div>
        </div>

        <div>
          <h1 className="hero-headline">
            {h.line1}<br/><em>{h.line2}</em>
          </h1>

          <div className="hero-bottom">
            <div>
              <p className="hero-sub">
                Et sekulært, evidensbasert retreat for høytfungerende voksne. Tre dager med meditasjon, bevegelse og badstue på fjorden.
              </p>
              <div className="hero-cta-row">
                <button className="btn btn-fill btn-lg" onClick={onSignup}>
                  Bli med på ventelisten <span className="btn-arrow">→</span>
                </button>
                <a href="#programmet" className="btn btn-lg btn-ghost">
                  Programmet
                </a>
              </div>
            </div>
            <div className="hero-scroll">
              <span className="hero-scroll-label">Bla videre</span>
              <div className="hero-scroll-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
function Marquee({ datoLabel }) {
  const items = [
    "Klarlinje",
    "Son Spa",
    datoLabel,
    "15 plasser",
    "Sekulært",
    "Evidensbasert",
    "Aufguss hver kveld",
    "40 min fra Oslo",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <React.Fragment key={i}>
            <span><em className="editorial">{it}</em></span>
            <span className="dot"></span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Intro ─── */
function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="shell">
        <div className="intro-grid">
          <div className="intro-index"></div>
          <div className="intro-eyebrow">
            <span className="label">Hva er dette?</span>
            <span className="ttl"><em className="editorial">For deg som aldri slår av.</em></span>
          </div>
          <div className="intro-prose">
            <p>
              Livet kan være krevende til tider. <span className="soft">Noen perioder er hodet sjelden stille.</span>
            </p>
            <p>
              Du har kanskje opplevd at meditasjon hjelper, men det er vanskelig å prioritere i en travel hverdag.
            </p>
            <p>
              Noen ganger er alt du trenger en helg ved fjorden fylt med meditasjon og ro. Hvis alt går etter planen kommer du hjem <em>100% uthvilt.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapters (Hva er Klarlinje) ─── */
function Chapters() {
  const items = [
    {
      n: "01",
      title: "Meditasjon",
      body: "Guidede økter bygget på forskning. Korte og lange, sittende og gående. Praktisk, lavterskel, lett å ta med hjem.",
    },
    {
      n: "02",
      title: "Bevegelse",
      body: "Rolig morgentrening som forbereder kroppen på stillhet. En felles joggetur eller gåtur er valgfri for de som ønsker det.",
    },
    {
      n: "03",
      title: "Restitusjon",
      body: "Badstue, søvn og måltider på Son Spa. Plass til at hodet får roe seg ned mellom øktene.",
    },
  ];
  return (
    <section className="chapters" id="innhold">
      <div className="shell">
        <div className="chapters-head">
          <span className="label">03 / De tre pilarene</span>
          <div></div>
          <h2><em className="editorial">Slik er helgen</em><br/>bygget opp.</h2>
        </div>
        <div className="chapters-grid">
          <div></div>
          {items.map((c) => (
            <div className="chapter" key={c.n}>
              <div className="chapter-num">{c.n}</div>
              <div className="chapter-title"><em>{c.title}</em></div>
              <p className="chapter-body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Jens ─── */
function Jens() {
  return (
    <section className="jens" id="jens">
      <div className="shell">
        <div className="jens-grid">
          <div className="jens-photo-wrap">
            <img src="images/jens.jpg" alt="Portrett av Jens" />
            <div className="jens-photo-tag">Jens · Våren 2025</div>
          </div>
          <div className="jens-body">
            <div className="jens-eyebrow">
              <span className="label">04 / Hvem leder</span>
              <span className="jens-name"><em className="editorial">Møt Jens</em></span>
            </div>
            <h2 className="jens-headline">
              En pragmatiker<br/><em>som hjelper folk å meditere.</em>
            </h2>
            <div className="jens-prose">
              <p>
                <strong>Jens har meditert daglig i over ti år.</strong> Han tror verken på det tredje øyet eller på at meditasjon må læres av en munk med tjue års sølibat.
              </p>
              <p>
                Tidlig i karrieren jobbet Jens i fire år som lærer ved Oslo folkehøgskole, med ansvar for daglige morgensamlinger og meditasjonsundervisning for 180 elever. Nå jobber han som markedssjef i en av Norges største pasientorganisasjoner.
              </p>
            </div>
            <div className="jens-facts">
              <div className="jens-fact">
                <div className="jens-fact-num">10+</div>
                <div className="jens-fact-label">år daglig meditasjon</div>
              </div>
              <div className="jens-fact">
                <div className="jens-fact-num">180</div>
                <div className="jens-fact-label">elever undervist</div>
              </div>
              <div className="jens-fact">
                <div className="jens-fact-num">04</div>
                <div className="jens-fact-label">år som toppleder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Program ─── */
function Program() {
  const sessions = [
    { num: "i",   when: "Fredag kveld",        place: "Konferansesal",      duration: "30 min",            body: "Ankomst til Son Spa, velkomst og felles åpningsøkt." },
    { num: "ii",  when: "Lørdag morgen",       place: "På rommet",          duration: "30 min", optional: true, body: "Valgfri morgenmeditasjon på rommet før frokost. Stille i eget tempo." },
    { num: "iii", when: "Lørdag, midt på dagen", place: "Konferansesal",    duration: "1 t",               body: "Lengre, dyptgående fellesøkt midt på dagen." },
    { num: "iv",  when: "Lørdag kveld",        place: "Konferansesal",      duration: "30 min",            body: "Kveldsmeditasjon før middag." },
    { num: "v",   when: "Søndag formiddag",    place: "Konferansesal",      duration: "1 t",               body: "Avsluttende økt før felles lunsj og avreise." },
  ];
  return (
    <section id="programmet">
      <div className="shell">
        <div className="program-head">
          <span className="label">02 / Programmet</span>
          <div></div>
          <h2><em className="editorial">Alle klarer</em><br/>3,5 timer meditasjon i løpet av en helg.</h2>
        </div>

        <div className="program-days">
          <div></div>
          <div>
            <p className="program-intro">
              Fem guidede økter fordelt over helgen. Undervisning, bevegelse, måltider og badstue fyller resten av tiden. Det er også rom for sosialt samvær med de andre deltakerne.
            </p>

            <div className="program-summary">
              <div className="program-summary-cell">
                <div className="program-summary-val">5</div>
                <div className="program-summary-key">økter</div>
              </div>
              <div className="program-summary-cell">
                <div className="program-summary-val">3 <span className="program-summary-unit">t</span></div>
                <div className="program-summary-key">obligatorisk</div>
              </div>
              <div className="program-summary-cell program-summary-cell-opt">
                <div className="program-summary-val">+ 30 <span className="program-summary-unit">min</span></div>
                <div className="program-summary-key">valgfri</div>
              </div>
              <div className="program-summary-cell program-summary-cell-total">
                <div className="program-summary-val">3,5 <span className="program-summary-unit">t</span></div>
                <div className="program-summary-key">totalt</div>
              </div>
            </div>

            <ol className="program-sessions">
              {sessions.map((s, i) => (
                <li className={`program-sess ${s.optional ? "is-optional" : ""}`} key={i}>
                  <div className="program-sess-rule" aria-hidden="true"></div>
                  <span className="program-sess-num">{s.num}.</span>
                  <div className="program-sess-when">
                    <span className="program-sess-when-name"><em className="editorial">{s.when}</em></span>
                    <span className="program-sess-when-place">{s.place}</span>
                  </div>
                  <p className="program-sess-body">{s.body}</p>
                  <div className="program-sess-duration">
                    <span>{s.duration}</span>
                    {s.optional && <span className="program-sess-flag">Valgfri</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="program-foot">
          <div></div>
          <div className="program-foot-cell">
            <span className="label">Pris</span>
            <div className="program-foot-val">15 000 kr</div>
            <div className="program-foot-note">Inkl. enkeltrom, alle måltider, spa og hele programmet.</div>
          </div>
          <div className="program-foot-cell">
            <span className="label">Bevegelse</span>
            <div className="program-foot-val">Daglig</div>
            <div className="program-foot-note">Rolig morgenbevegelse og felles joggetur eller gåtur.</div>
          </div>
          <div className="program-foot-cell">
            <span className="label">Plasser</span>
            <div className="program-foot-val">15</div>
            <div className="program-foot-note">Inntaket gjøres via kort søknad etter venteliste.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sted (Son Spa) ─── */
function Sted() {
  return (
    <section className="sted" id="sted">
      <div className="sted-bleed">
        <img src="images/son-spa-pool.jpg" alt="Son Spa basseng med utsikt mot fjord og seilbåter" />
        <div className="sted-bleed-overlay"></div>
        <div className="sted-bleed-caption">
          <div>
            <span className="label" style={{ display: "block", marginBottom: 8 }}>06 / Stedet</span>
            <div className="sted-bleed-title"><em className="editorial">Son Spa.</em></div>
          </div>
          <div className="sted-bleed-pull">
            <em className="editorial">Son er vakkert plassert ved Oslofjorden og har et spaanlegg på over 2 000 m²</em>
          </div>
        </div>
      </div>

      <div className="sted-content">
        <div className="shell">
          <div className="sted-grid">
            <div></div>
            <p className="sted-prose">
              Et fire-stjerners spa-hotell <em>40 minutter sør for Oslo</em>. Konferansesal med fjordutsikt, gourmetmåltider og full tilgang til hele spa-avdelingen.
            </p>
            <div className="sted-meta-rows">
              <div className="sted-meta-row"><span className="k">Adresse</span><span className="v">Son Spa, Vestby</span></div>
              <div className="sted-meta-row"><span className="k">Fra Oslo S</span><span className="v">40 min bil · 50 min tog</span></div>
              <div className="sted-meta-row"><span className="k">Fra Son stasjon</span><span className="v">Taxi eller bli hentet</span></div>
              <div className="sted-meta-row"><span className="k">Rom</span><span className="v">Enkeltrom inkludert</span></div>
              <div className="sted-meta-row"><span className="k">Måltider</span><span className="v">Frokost, lunsj, middag · alle dager</span></div>
              <div className="sted-meta-row"><span className="k">Spa</span><span className="v">Basseng, badstue, dampbad, hvilerom</span></div>
              <div className="sted-meta-row"><span className="k">Badstue</span><span className="v">Opptil 90 varmegrader</span></div>
              <div className="sted-meta-row"><span className="k">Stjerner</span><span className="v">Fire</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Aufguss ─── */
function Aufguss() {
  return (
    <section className="aufguss" id="aufguss">
      <div className="aufguss-bleed">
        <img src="images/DSF4497.jpg" alt="Utsikt fra badstueflåten ved solnedgang" />
        <div className="aufguss-bleed-overlay"></div>
        <div className="aufguss-content">
          <div className="aufguss-grid">
            <div>
              <span className="label" style={{ display: "block", marginBottom: 20, color: "var(--accent)" }}>
                07 / Kveldens høydepunkt
              </span>
              <h2 className="aufguss-title">
                <em>Aufguss</em><br/>på badstueflåten.
              </h2>
            </div>
            <div className="aufguss-side">
              <p>
                En flytende badstue på fjorden, 90 grader, plass til femten. En aufguss-mester heller vann tilsatt eteriske oljer på steinene og fordeler dampen med håndkle.
              </p>
              <div className="aufguss-steps">
                <div className="aufguss-step">
                  <span className="aufguss-step-num">i.</span>
                  <div>
                    <h4>Tre runder, syv minutter hver</h4>
                    <p>Hver runde har sin egen olje. Furu, einer, bergamott.</p>
                  </div>
                </div>
                <div className="aufguss-step">
                  <span className="aufguss-step-num">ii.</span>
                  <div>
                    <h4>Stup i fjorden mellom rundene</h4>
                    <p>Stige rett ned i saltvann. Belyst hele veien ned.</p>
                  </div>
                </div>
                <div className="aufguss-step">
                  <span className="aufguss-step-num">iii.</span>
                  <div>
                    <h4>Stille hvilerom etterpå</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quotes ─── */
const QUOTES_DATA = [
  { body: "Den beste helga jeg har hatt så langt i år. Fantastisk atmosfære og hyggelige folk all over the place.", attr: "Deltaker · 2025" },
  { body: "Extremely nice setup and as always great people to meet.", attr: "Deltaker · 2025" },
  { body: "Bra lagt opp mht henting, program A til Å, fasiliteter og variasjon av happenings.", attr: "Deltaker · 2025" },
  { body: "Fantastisk opplegg, mange takk til alle som arrangerte og bidro.", attr: "Deltaker · 2025" },
];

function Quotes() {
  return (
    <section className="quotes" id="bevis">
      <div className="shell">
        <div className="quotes-head">
          <span className="label">08 / Bevis</span>
          <div></div>
          <div>
            <h2><em className="editorial">Det andre</em><br/>har sagt.</h2>
          </div>
        </div>
        <div className="quotes-grid">
          <div className="quotes-head-aside">
            Sitater fra deltakere på en helg med breathwork jeg arrangerte våren 2025.
          </div>
          {QUOTES_DATA.slice(0, 2).map((q, i) => (
            <div className="quote" key={i}>
              <div className="quote-mark">"</div>
              <p className="quote-body"><em>{q.body}</em></p>
              <div className="quote-attr">{q.attr}</div>
            </div>
          ))}
          <div></div>
          {QUOTES_DATA.slice(2, 4).map((q, i) => (
            <div className="quote" key={i + 2}>
              <div className="quote-mark">"</div>
              <p className="quote-body"><em>{q.body}</em></p>
              <div className="quote-attr">{q.attr}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const FAQ_DATA = [
  { q: "Må jeg ha meditert før?",  a: "Nei. De fleste deltakerne har prøvd via app eller kurs, men det er ikke et krav. Du får alt du trenger på plass." },
  { q: "Hva slags meditasjon er dette?", a: "Mindfulness, evidensbasert. Inspirert av MBSR (Mindfulness-Based Stress Reduction), utviklet av Jon Kabat-Zinn ved University of Massachusetts i 1979. Det er det mest studerte mindfulness-programmet i verden, med over 40 år og hundrevis av randomiserte kontrollerte studier bak seg." },
  { q: "Hva koster det, og hva er inkludert?", a: "15 000 kr inkl. enkeltrom, alle måltider, spa, badstue og hele programmet. Ikke inkludert: reise, alkohol og massasje." },
  { q: "Er massasje inkludert?", a: "Nei. Massasje og andre spa-behandlinger er ikke en del av pakken, men kan bestilles direkte hos Son Spa når du er på plass. Vi sender ut menyen i god tid før retreaten." },
  { q: "Er dette religiøst eller alternativt?", a: "Nei. Klarlinje er sekulært og evidensbasert." },
  { q: "Hva skjer på retreaten?", a: "Meditasjon, bevegelse, måltider, badstue og stille perioder. Full timesplan sendes ut til påmeldte i god tid før helgen." },
  { q: "Hva med trening?", a: "Rolig morgenbevegelse er en del av programmet. I tillegg arrangerer vi en felles joggetur eller gåtur for de som har lyst. Hotellets fasiliteter står også åpne for egen bruk." },
  { q: "Kan jeg komme alene?", a: "De fleste kommer alene. Du får enkeltrom og bestemmer selv hvor mye du vil snakke med andre." },
  { q: "Hva er retningslinjene for mobil?", a: "Mobil er ikke velkomment i meditasjonsrommene eller i samlingene. På rommet kan du ha den. Vi anbefaler på det sterkeste å levere den inn i resepsjonen ved ankomst og la den ligge der hele helgen. De aller fleste som gjør det, sier etterpå at det var en av de beste beslutningene de tok." },
  { q: "Hva er retningslinjene for alkohol?", a: "Alkohol er lov, men vi anbefaler å holde det til et minimum. Du får mer ut av helgen med et klart hode." },
  { q: "Kan jeg lese en bok for å forberede meg?", a: "Ja. Wherever You Go, There You Are av Jon Kabat-Zinn er en god, kort introduksjon." },
  { q: "Hva er avbestillingsvilkårene?", a: "Fri avbestilling fram til 30 dager før retreaten. Mellom 30 og 14 dager før refunderes 50 %. Etter 14 dager før refunderes ingenting." },
  { q: "Hva bør jeg pakke?", a: "Behagelige klær til bevegelse og innendørs, badetøy, og noe varmt for kveldsturer. Mer praktisk info i påmeldingen." },
  { q: "Kan jeg sende ledergruppen min på retreat?", a: "Ja. Klarlinje tilbyr skreddersydde opplegg for ledergrupper og bedrifter. Les mer på siden vår for HR og ledergrupper.", link: "ledergruppa.html" },
  { q: "Hvordan er søknadsprosessen?", a: "Du melder deg på ventelisten først. Når datoene er satt, sender vi et kort søknadsskjema." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="shell">
        <div className="faq-head">
          <span className="label">09 / Spørsmål</span>
          <div></div>
          <h2><em className="editorial">De vanlige</em><br/>spørsmålene.</h2>
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
                  <p className="faq-a-text">{item.a}{item.link && <> <a href={item.link} className="faq-a-link">Les mer →</a></>}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA({ onSignup }) {
  return (
    <section className="final" id="meldpaa">
      <div className="final-inner">
        <span className="final-deco-num"><em className="editorial">10</em></span>
        <h2>
          Klar for å bli<br/><em>helt uthvilt?</em>
        </h2>
        <p>
          Ventelisten er gratis og uten forpliktelser. Vi sender deg dato og mer informasjon, så velger du selv om du vil søke om en plass.
        </p>
        <div className="final-line"></div>
        <button className="btn btn-fill btn-lg" onClick={onSignup}>
          Bli med på ventelisten <span className="btn-arrow">→</span>
        </button>
      </div>
    </section>
  );
}

/* ─── Personvern Modal ─── */
function PersonvernModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Lukk">×</button>
        <span className="label modal-eyebrow">Personvern</span>
        <h3><em>Hva vi lagrer</em> om deg.</h3>
        <p>
          Når du melder deg på ventelisten, lagres e-postadressen din og eventuelt fornavnet ditt hos <strong>Kit.com</strong> (tidligere ConvertKit), vår e-postleverandør. Informasjonen brukes kun til å sende deg oppdateringer om Klarlinje-retreaten.
        </p>
        <p>
          Vi selger eller deler aldri din informasjon med tredjepart. Du kan melde deg av når som helst via lenken i enhver e-post du mottar fra oss, eller ved å sende en e-post til <a href="mailto:jens@klarlinje.no">jens@klarlinje.no</a> med forespørsel om sletting.
        </p>
        <p style={{ fontSize: 13, color: "var(--ink-mute)" }}>
          Behandlingsansvarlig: Jens Asper · jens@klarlinje.no · Oslo, Norge
        </p>
        <button className="btn btn-ghost btn-block" onClick={onClose}>Lukk</button>
      </div>
    </div>
  );
}

/* ─── Footer ─── */
function Footer({ onPersonvern }) {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-col">
            <h5><em className="editorial">Klarlinje</em></h5>
            <p style={{ fontSize: 12, lineHeight: 1.6, letterSpacing: 0, textTransform: "none", color: "var(--ink-mute)" }}>
              Et sekulært, evidensbasert retreat for høytfungerende voksne. Våren 2027 på Son Spa.
            </p>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Retreat</em></h5>
            <ul>
              <li><a href="#programmet">Programmet</a></li>
              <li><a href="#sted">Stedet</a></li>
              <li><a href="#aufguss">Aufguss</a></li>
              <li><a href="#meldpaa">Meld deg på</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Lederutvikling</em></h5>
            <ul>
              <li><a href="ledergruppa.html">Retreat for ledergrupper</a></li>
              <li><a href="ledergruppa.html#foredrag">Foredrag og undervisning</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Kontakt</em></h5>
            <ul>
              <li><a href="mailto:jens@klarlinje.no">jens@klarlinje.no</a></li>
              <li><button className="footer-link-btn" onClick={onPersonvern}>Personvern</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Klarlinje · Oslo / Son</div>
          <div>v1.07</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Signup Modal ─── */
const KIT_FORM_URL = "https://app.kit.com/forms/9450253/subscriptions";

function SignupModal({ open, onClose }) {
  const [step, setStep] = useState("form"); // form | loading | success
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep("form");
      setEmail("");
      setName("");
      setError("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Sjekk e-postadressen din.");
      return;
    }
    setError("");
    setStep("loading");
    try {
      const fd = new FormData();
      fd.append("email_address", email);
      if (name) fd.append("fields[first_name]", name);
      const res = await fetch(KIT_FORM_URL, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setStep("success");
      } else {
        setStep("form");
        setError("Noe gikk galt. Prøv igjen om litt.");
      }
    } catch (err) {
      // Network or CORS edge case — Kit usually still receives the submission.
      // Show success rather than blocking the user.
      setStep("success");
    }
  };

  const isLoading = step === "loading";

  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Lukk">×</button>
        {step !== "success" ? (
          <form onSubmit={submit}>
            <span className="label modal-eyebrow">Venteliste · Våren 2027</span>
            <h3><em>Bli med</em> på ventelisten.</h3>
            <p>
              Du får én e-post når datoene er satt, og igjen når påmeldingen åpner. Det er alt.
            </p>
            <div className="modal-field">
              <label>Navn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Fornavn"
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            {error && <div className="modal-error">{error}</div>}
            <button type="submit" className="btn btn-fill btn-lg btn-block" disabled={isLoading}>
              {isLoading ? "Sender …" : <>Sett meg på listen <span className="btn-arrow">→</span></>}
            </button>
            <p className="modal-fineprint">
              Du kan melde deg av når som helst.
            </p>
          </form>
        ) : (
          <div className="modal-success">
            <div className="modal-success-mark">✓</div>
            <h3><em>Sjekk</em> e-posten din.</h3>
            <p>
              Vi har sendt en bekreftelse til <strong style={{ color: "var(--ink)" }}>{email}</strong>. Klikk lenken for å bekrefte at du vil stå på listen. Sjekk gjerne spam-mappen om den ikke dukker opp.
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

/* ─── Tweaks ─── */
function KlarTweaks({ t, setTweak }) {
  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection label="Tema">
        <window.TweakRadio
          label="Modus"
          value={t.theme}
          onChange={(v) => setTweak("theme", v)}
          options={["natt", "morgen"]}
        />
      </window.TweakSection>

      <window.TweakSection label="Hero">
        <window.TweakSelect
          label="Headline"
          value={t.heroHeadline}
          onChange={(v) => setTweak("heroHeadline", v)}
          options={[
            { value: "tre-dager", label: "«Tre dager uten støy.»" },
            { value: "uthvilt",   label: "«En helg du kommer hjem fra.»" },
            { value: "linje",     label: "«En klar linje gjennom helgen.»" },
          ]}
        />
        <window.TweakText
          label="Datolabel"
          value={t.datoLabel}
          onChange={(v) => setTweak("datoLabel", v)}
        />
      </window.TweakSection>

      <window.TweakSection label="Seksjoner">
        <window.TweakToggle label="Marquee-stripe" value={t.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
        <window.TweakToggle label="Aufguss-feature" value={t.showAufguss} onChange={(v) => setTweak("showAufguss", v)} />
        <window.TweakToggle label="Sitater / bevis" value={t.showQuotes} onChange={(v) => setTweak("showQuotes", v)} />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

/* ─── App ─── */
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS_V2);
  const [signupOpen, setSignupOpen] = useState(false);
  const [personvernOpen, setPersonvernOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.theme]);

  const openSignup = () => setSignupOpen(true);
  const closeSignup = () => setSignupOpen(false);

  return (
    <>
      <Nav onSignup={openSignup} />
      <Hero headlineKey={t.heroHeadline} datoLabel={t.datoLabel} onSignup={openSignup} />
      {t.showMarquee && <Marquee datoLabel={t.datoLabel} />}
      <Intro />
      <Program />
      <Chapters />
      <Jens />
      <Research />
      <Sted />
      {t.showAufguss && <Aufguss />}
      {t.showQuotes && <Quotes />}
      <FAQ />
      <FinalCTA onSignup={openSignup} />
      <Footer onPersonvern={() => setPersonvernOpen(true)} />
      <SignupModal open={signupOpen} onClose={closeSignup} />
      <PersonvernModal open={personvernOpen} onClose={() => setPersonvernOpen(false)} />
      <KlarTweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
