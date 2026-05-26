/* Klarlinje v2 — dark editorial direction */
const { useState, useEffect, useRef } = React;

/* ─── Research ─── */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ResearchChart() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="research-chart-svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Horizontal grid lines */}
      <line x1="60" y1="50"  x2="480" y2="50"  className="chart-grid" />
      <line x1="60" y1="120" x2="480" y2="120" className="chart-grid" />
      <line x1="60" y1="190" x2="480" y2="190" className="chart-grid" />
      <line x1="60" y1="260" x2="480" y2="260" className="chart-grid" />

      {/* Axes */}
      <line x1="60" y1="40" x2="60" y2="260" className="chart-axis" />
      <line x1="60" y1="260" x2="480" y2="260" className="chart-axis" />

      {/* Y labels */}
      <text x="50" y="54" textAnchor="end" className="chart-axis-label">Høy</text>
      <text x="50" y="264" textAnchor="end" className="chart-axis-label">Lav</text>

      {/* X labels */}
      <text x="60"  y="284" textAnchor="middle" className="chart-axis-label">Dag 1</text>
      <text x="270" y="284" textAnchor="middle" className="chart-axis-label">Dag 2</text>
      <text x="480" y="284" textAnchor="middle" className="chart-axis-label">Dag 3</text>

      {/* Subtitle / chart caption */}
      <text x="60" y="22" textAnchor="start" className="chart-title">
        Endring over 3 dager
      </text>
      <text x="480" y="22" textAnchor="end" className="chart-title chart-title-muted">
        Rosenkranz et al. (2021)
      </text>

      {/* IL-10 (ascending) — primary accent, drawn first */}
      <path
        className="chart-line line-il10"
        d="M60,225 L270,140 L480,55"
        stroke="var(--accent)"
        strokeWidth="2"
        pathLength="1"
      />
      <circle cx="60"  cy="225" r="4" fill="var(--accent)" className="chart-dot dot-il10" />
      <circle cx="270" cy="140" r="3" fill="var(--accent)" className="chart-dot dot-il10" />
      <circle cx="480" cy="55"  r="5" fill="var(--accent)" className="chart-dot dot-il10" />
      <text x="490" y="59" className="chart-line-label chart-line-label-accent">IL-10</text>

      {/* IL-6 & IL-8 (descending) — secondary brass */}
      <path
        className="chart-line line-il6"
        d="M60,70 L270,135 L480,210"
        stroke="var(--accent-2)"
        strokeWidth="1.6"
        pathLength="1"
      />
      <circle cx="60"  cy="70"  r="3.5" fill="var(--accent-2)" className="chart-dot dot-il6" />
      <circle cx="270" cy="135" r="3"   fill="var(--accent-2)" className="chart-dot dot-il6" />
      <circle cx="480" cy="210" r="3.5" fill="var(--accent-2)" className="chart-dot dot-il6" />
      <text x="490" y="214" className="chart-line-label">IL-6 & IL-8</text>

      {/* Stress & angst (descending) — muted ink, dashed */}
      <path
        className="chart-line line-stress"
        d="M60,95 L270,160 L480,235"
        stroke="var(--ink-soft)"
        strokeWidth="1.3"
        strokeDasharray="4 4"
        pathLength="1"
      />
      <circle cx="60"  cy="95"  r="3" fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <circle cx="270" cy="160" r="2.5" fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <circle cx="480" cy="235" r="3" fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <text x="490" y="239" className="chart-line-label chart-line-label-muted">Stress</text>
    </svg>
  );
}

function Research() {
  const [chartRef, chartInView] = useInView(0.25);
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
            En randomisert studie viser at <em>tre dager</em> med meditasjon gir målbare biologiske endringer i immunsystemet, ikke bare psykologiske effekter.
          </p>
          <div className="research-chart-wrap">
            <div ref={chartRef} className={`research-chart ${chartInView ? "in" : ""}`}>
              <ResearchChart />
            </div>
          </div>
        </div>

        <div className="research-legend">
          <div className="research-leg">
            <span className="research-leg-swatch swatch-il10">
              <span className="research-leg-dot"></span>
            </span>
            <div className="research-leg-text">
              <div className="research-leg-key"><em className="editorial">IL-10</em> <span className="research-leg-trend">↑</span></div>
              <div className="research-leg-val">Anti-inflammatorisk cytokin økt.</div>
            </div>
          </div>
          <div className="research-leg">
            <span className="research-leg-swatch swatch-il6"></span>
            <div className="research-leg-text">
              <div className="research-leg-key"><em className="editorial">IL-6 &amp; IL-8</em> <span className="research-leg-trend">↓</span></div>
              <div className="research-leg-val">Pro-inflammatoriske cytokiner signifikant redusert.</div>
            </div>
          </div>
          <div className="research-leg">
            <span className="research-leg-swatch swatch-stress"></span>
            <div className="research-leg-text">
              <div className="research-leg-key"><em className="editorial">Stress &amp; angst</em> <span className="research-leg-trend">↓</span></div>
              <div className="research-leg-val">Redusert opplevd stress og økt mindfulness.</div>
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
              Kronisk betennelse er koblet til depresjon, hjertesykdom og aldring. <em>En storbyferie med venner er én ting. En helg med aktiv meditasjon er noe helt annet.</em>
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
  "heroHeadline": "uthvilt-q",
  "showQuotes": true,
  "showAufguss": true,
  "showMarquee": true,
  "datoLabel": "Høsten 2026"
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
        <span className="nav-brand-mark"></span>
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
  "uthvilt-q": { line1: "Klar for å bli",  line2: "helt uthvilt?" },
  "tre-dager": { line1: "Tre dager",      line2: "uten støy." },
  "uthvilt":   { line1: "En helg du",     line2: "kommer hjem fra." },
  "linje":     { line1: "En klar linje",  line2: "gjennom helgen." },
};

function Hero({ headlineKey, datoLabel, onSignup }) {
  const h = HERO_OPTIONS[headlineKey] || HERO_OPTIONS["uthvilt-q"];
  return (
    <section className="hero" id="top">
      <img className="hero-image" src="images/meditation-sunset.jpg" alt="Gruppe som mediterer på klipper ved fjorden i solnedgang" />
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
                Velkommen til et helgeretreat for deg som vil ha en effektiv pause med meditasjon, slik at du kan komme tilbake til hverdag og jobb med overskudd.
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
          <div className="intro-index">01</div>
          <div className="intro-eyebrow">
            <span className="label">Anrop</span>
            <span className="ttl"><em className="editorial">For deg som presterer.</em></span>
          </div>
          <div className="intro-prose">
            <p>
              Livet kan være krevende til tider. <span className="soft">Noen perioder er hodet sjelden stille.</span>
            </p>
            <p>
              Du har kanskje opplevd at meditasjon hjelper, men at det er vanskelig å finne tid til det i en travel hverdag.
            </p>
            <p>
              Noen ganger er alt du trenger <em>en helg ved fjorden fylt med meditasjon og ro.</em>
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
          <span className="label">03 / Innhold</span>
          <div></div>
          <h2><em className="editorial">De tre viktigste</em><br/>elementene i helgen.</h2>
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
            <div className="jens-photo-tag">Jens · Vinteren 2026</div>
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
                Jens har meditert daglig i over ti år. Han tror verken på det tredje øyet eller på at meditasjon må læres av en munk med tjue års sølibat.
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
    { num: "i",   when: "Fredag kveld",          place: "Konferansesal",  duration: "30 min",            body: "Ankomst til Son Spa, velkomst og felles åpningsøkt." },
    { num: "ii",  when: "Lørdag 08:00–10:00",    place: "Restauranten",   duration: "—",    optional: true, body: "Frokost. Spis i ditt eget tempo." },
    { num: "iii", when: "Lørdag morgen",          place: "På rommet",      duration: "30 min", optional: true, body: "Valgfri morgenmeditasjon på rommet. Stille i eget tempo." },
    { num: "iv",  when: "Lørdag, midt på dagen",  place: "Konferansesal",  duration: "1 t",               body: "Lengre, dyptgående fellesøkt midt på dagen." },
    { num: "v",   when: "Lørdag 13:00",           place: "Restauranten",   duration: "—",                 body: "Lunsj." },
    { num: "vi",  when: "Lørdag kveld",           place: "Konferansesal",  duration: "30 min",            body: "Kveldsmeditasjon." },
    { num: "vii", when: "Lørdag 18:00",           place: "Restauranten",   duration: "—",                 body: "Middag." },
    { num: "viii",when: "Søndag formiddag",       place: "Konferansesal",  duration: "1 t",               body: "Avsluttende økt." },
    { num: "ix",  when: "Søndag 13:00",           place: "Restauranten",   duration: "—",                 body: "Lunsj og avreise." },
  ];
  return (
    <section id="programmet">
      <div className="shell">
        <div className="program-head">
          <span className="label">02 / Programmet</span>
          <div></div>
          <h2><em className="editorial">Slik er helgen</em><br/>bygget opp.</h2>
        </div>

        <div className="program-days">
          <div></div>
          <div>
            <p className="program-intro">
              Fem guidede økter fordelt over helgen. Bevegelse, måltider, badstue og stille perioder fyller resten av tiden.
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
            <div className="program-foot-note">Plass tildeles fra ventelisten.</div>
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
        <img src="images/spa-pool-group.jpg" alt="Gruppe ved Son Spa basseng med utsikt mot Oslofjorden" />
        <div className="sted-bleed-overlay"></div>
        <div className="sted-bleed-caption">
          <div>
            <span className="label" style={{ display: "block", marginBottom: 8 }}>06 / Stedet</span>
            <div className="sted-bleed-title"><em className="editorial">Son Spa.</em></div>
          </div>
          <div className="sted-bleed-pull">
            <em className="editorial">«Stedet skaper gode følelser av seg selv.»</em>
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
              <div className="sted-meta-row"><span className="k">Rom</span><span className="v">Enkeltrom inkludert</span></div>
              <div className="sted-meta-row"><span className="k">Måltider</span><span className="v">Frokost, lunsj, middag · alle dager</span></div>
              <div className="sted-meta-row"><span className="k">Spa</span><span className="v">Basseng, badstue, dampbad, hvilerom</span></div>
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
        <img src="images/sauna-meditation.jpg" alt="Folk som mediterer i badstue med utsikt mot marina" />
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
                En flytende badstue på fjorden, 90 grader, plass til femten. Vi har med en dedikert badstuemester som leder hele seansen. Han heller vann tilsatt eteriske oljer på steinene og fordeler den varme dampen rundt i rommet med et stort håndkle.
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
function Quotes() {
  const quotes = [
          { body: "Fantastisk opplegg, mange takk til alle som arrangerte og bidro.", attr: "Deltaker · 2025" },
    { body: "Bra lagt opp mht henting, program A til Å, fasiliteter og variasjon av happenings.", attr: "Deltaker · 2025" },
    { body: "Den beste helga jeg har hatt så langt i år. Fantastisk atmosfære og hyggelige folk all over the place.", attr: "Deltaker · 2025" },
    { body: "Tusen hjertelig takk.", attr: "Deltaker · 2025" },
  ];
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
          {quotes.slice(0, 2).map((q, i) => (
            <div className="quote" key={i}>
              <div className="quote-mark">“</div>
              <p className="quote-body"><em>{q.body}</em></p>
              <div className="quote-attr">{q.attr}</div>
            </div>
          ))}
          <div></div>
          {quotes.slice(2, 4).map((q, i) => (
            <div className="quote" key={i + 2}>
              <div className="quote-mark">“</div>
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
  { q: "Hvilken stilling sitter man i når man mediterer?", a: "Den som passer best for deg. Sittende på stol, knelende, stående eller i lotusstilling på gulvet. Hensikten er ikke positur, men å finne en stilling der kroppen er rolig og våken samtidig. Vi gir veiledning hvis du ønsker det." },
  { q: "Hva koster det, og hva er inkludert?", a: "15 000 kr inkl. enkeltrom, alle måltider, spa, badstue og hele programmet. Ikke inkludert: reise, alkohol og massasje." },
  { q: "Er massasje inkludert?", a: "Nei. Massasje og andre spa-behandlinger er ikke en del av pakken, men kan bestilles direkte hos Son Spa når du er på plass. Vi sender ut menyen i god tid før retreaten." },
  { q: "Er dette religiøst eller alternativt?", a: "Nei. Klarlinje er sekulært og evidensbasert." },
  { q: "Hva skjer på retreaten?", a: "Meditasjon, bevegelse, måltider, badstue og stille perioder. Full timesplan sendes ut til påmeldte i god tid før helgen." },
  { q: "Hvem deltar?", a: "Voksne mellom 28 og 55 år som presterer mye og vil ha mer ro. Mange jobber innen tech, helse, ledelse eller akademia. De fleste kommer alene, men noen drar som team eller med kolleger." },
  { q: "Kan vi booke for et team eller arbeidsgruppe?", a: "Ja. Retreaten egner seg like godt for en gruppe kolleger eller et helt arbeidsfellesskap som vil dele opplevelsen, ikke bare for ledergrupper. Ta kontakt på e-post: jens@klarlinje.no", link: { href: "medarbeidersamling.html", text: "Les mer om Klarlinje som medarbeidersamling →" } },
  { q: "Hva med trening?", a: "Rolig morgenbevegelse er en del av programmet. I tillegg arrangerer vi en felles joggetur eller gåtur for de som har lyst. Hotellets fasiliteter står også åpne for egen bruk." },
  { q: "Kan jeg komme alene?", a: "De fleste kommer alene. Du får enkeltrom og bestemmer selv hvor mye du vil snakke med andre." },
  { q: "Hva er anbefalingen for mobilbruk?", a: "Du får mest ut av helgen om mobilen blir liggende på rommet i flymodus. Ønsker du å forplikte deg helt, kan du levere inn telefonen i resepsjonen. Du bestemmer selv." },
  { q: "Hva er anbefalingen for alkohol?", a: "Du får mest ut av helgen om du holder deg unna alkohol disse dagene. Son Spa er ikke alkoholfritt, men vi anbefaler å la det ligge. Du bestemmer selv." },
  { q: "Kan jeg lese en bok for å forberede meg?", a: "Ja. Wherever You Go, There You Are av Jon Kabat-Zinn er en god, kort introduksjon. Det er ikke et krav å lese den, men de som har lyst på litt kontekst, får mye igjen for den." },
  { q: "Hva er avbestillingsvilkårene?", a: "Fri avbestilling fram til 30 dager før retreaten. Mellom 30 og 14 dager før refunderes 50 %. Etter 14 dager før refunderes ingenting." },
  { q: "Er Son Spa stengt for andre gjester under retreaten?", a: "Nei. Son Spa er åpent for andre gjester i de samme dagene. Våre egne økter foregår i privat konferansesal og på rommene. Du vil møte andre i resepsjonen, ved frokostbufféen og i spa-avdelingen, men programmet vårt er uforstyrret." },
  { q: "Hva bør jeg pakke?", a: "Behagelige klær til bevegelse og innendørs, badetøy, og noe varmt for kveldsturer. Ta gjerne med en treningsmatte eller yogamatte hvis du har. Har du en meditasjonskrakk eller meditasjonspute, er du velkommen til å ta den med — hvis ikke har vi til låns. Mer praktisk info kommer i påmeldingen." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="shell">
        <div className="faq-head">
          <span className="label">12 / Spørsmål</span>
          <div></div>
          <h2><em className="editorial">De vanligste</em><br/>spørsmålene.</h2>
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
                  {item.link && (
                    <a href={item.link.href} className="research-cite-link" style={{ display: "inline-block", marginTop: "0.75rem" }}>
                      {item.link.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Inkludert ─── */
function Inkludert() {
  const items = [
    { num: "01", title: "Overnatting",  body: "Enkeltrom på Son Spa, alle netter. Egen dør, eget vindu, ingen romkamerat." },
    { num: "02", title: "Mat",          body: "Frokost, lunsj og middag alle dager. Variert kjøkken, vegetar tilgjengelig." },
    { num: "03", title: "Spa",          body: "Full tilgang til basseng, badstue, dampbad og hvilerom hele helgen." },
    { num: "04", title: "Meditasjon",   body: "Fem guidede økter av Jens. Veiledning underveis, ingen forkunnskaper kreves." },
    { num: "05", title: "Bevegelse",    body: "Rolig morgenbevegelse, samt felles joggetur eller gåtur i naturen rundt." },
    { num: "06", title: "Materiell",    body: "Velkomstmappe med program, bok-tips og oppfølgings-ressurser å ta med hjem." },
  ];
  return (
    <section className="inkludert" id="inkludert">
      <div className="shell">
        <div className="chapters-head">
          <span className="label">10 / Inkludert</span>
          <div></div>
          <h2><em className="editorial">Alt er med.</em><br/>Ingen ekstra kostnader.</h2>
        </div>

        <div className="incl-grid">
          {items.map((it) => (
            <div className="incl-card" key={it.num}>
              <div className="incl-card-num">{it.num}</div>
              <div className="incl-card-title"><em className="editorial">{it.title}</em></div>
              <p className="incl-card-body">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Passer dette for deg? ─── */
function Passer() {
  const ja = [
    "Du lever et hektisk liv og trenger en pause.",
    "Du er nysgjerig på hva meditasjon kan gjøre.",
    "Du vil ha tre dager helt for deg selv, uten å måtte ta beslutninger.",
    "Du foretrekker et sekulært og evidensbasert format framfor det åndelige.",
    "Du er åpen for korte perioder med stillhet.",
  ];
  const nei = [
    "Du er ute etter en partyhelg eller sosial getaway.",
    "Du leter etter et åndelig eller religiøst retreat.",
    "Du forventer guruopplevelser, energiarbeid eller healing.",
    "Du er midt i en akutt livskrise som krever profesjonell oppfølging.",
    "Du må være tilgjengelig 24/7.",
  ];
  return (
    <section className="passer" id="passer">
      <div className="shell">
        <div className="chapters-head">
          <span className="label">11 / Passer dette for deg?</span>
          <div></div>
          <h2><em className="editorial">Ærlig sortering,</em><br/>før du melder deg på.</h2>
        </div>

        <div className="passer-grid">
          <div className="passer-col passer-col-ja">
            <div className="passer-col-head">
              <span className="passer-col-mark">✓</span>
              <span className="passer-col-title"><em className="editorial">Ja, dette er for deg</em></span>
            </div>
            <ul className="passer-list">
              {ja.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
          <div className="passer-col passer-col-nei">
            <div className="passer-col-head">
              <span className="passer-col-mark">×</span>
              <span className="passer-col-title"><em className="editorial">Nei, ikke denne gangen</em></span>
            </div>
            <ul className="passer-list">
              {nei.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Overgangen (stressed → calm) ─── */
function Overgang() {
  return (
    <section className="overgang" id="overgang">
      <div className="shell">
        <div className="overgang-head">
          <span className="label">Overgangen</span>
          <h2 className="overgang-h">
            <em className="editorial">Før, etter.</em>
          </h2>
          <p className="overgang-sub">
            Du trenger ikke endre deg. Du trenger en helg der kroppen og hodet får komme tilbake til en mer stressfri tilstand.
          </p>
        </div>

        <div className="overgang-stage">
          {/* BEFORE */}
          <div className="overgang-figure overgang-before">
            <div className="overgang-svg-wrap">
              <svg
                viewBox="0 0 160 220"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stress marks around head — each animated independently */}
                <g className="stress-cloud">
                  <line className="stress-line s1" x1="46"  y1="32" x2="52"  y2="26" />
                  <line className="stress-line s2" x1="60"  y1="22" x2="68"  y2="18" />
                  <line className="stress-line s3" x1="92"  y1="20" x2="100" y2="24" />
                  <line className="stress-line s4" x1="108" y1="32" x2="116" y2="30" />
                  <line className="stress-line s5" x1="116" y1="50" x2="124" y2="52" />
                  <line className="stress-line s6" x1="44"  y1="50" x2="36"  y2="52" />
                  <polyline className="stress-line s7" points="70,12 76,20 72,26" />
                  <polyline className="stress-line s8" points="86,14 90,20 86,28" />
                </g>

                {/* Head (slightly forward tilt) */}
                <circle cx="80" cy="56" r="12" />
                {/* Spine — slightly hunched (slight curve) */}
                <path d="M80 68 Q 82 100, 80 140" />
                {/* Shoulders — raised, narrow */}
                <line x1="68" y1="76" x2="92" y2="76" />
                {/* Tense arms straight down to clenched fists */}
                <line x1="68" y1="76" x2="64" y2="124" />
                <line x1="92" y1="76" x2="96" y2="124" />
                {/* Clenched fists — small open circles */}
                <circle cx="64" cy="128" r="3" />
                <circle cx="96" cy="128" r="3" />
                {/* Legs */}
                <line x1="80" y1="140" x2="72" y2="194" />
                <line x1="80" y1="140" x2="88" y2="194" />
                {/* Feet */}
                <line x1="64" y1="194" x2="78" y2="194" />
                <line x1="82" y1="194" x2="96" y2="194" />
                {/* Ground */}
                <line x1="20" y1="204" x2="140" y2="204" opacity="0.4" />
              </svg>
            </div>
            <div className="overgang-label-row">
              <span className="overgang-tag">Før</span>
              <span className="overgang-cap">Spent, distrahert</span>
            </div>
          </div>

          {/* ARROW */}
          <div className="overgang-arrow" aria-hidden="true">
            <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Long thin line that "draws" itself left to right */}
              <line className="arrow-line" x1="0" y1="30" x2="180" y2="30" />
              {/* Arrowhead */}
              <polyline className="arrow-head" points="172,22 184,30 172,38" />
            </svg>
            <div className="overgang-arrow-label">
              <span className="label">3 dager</span>
            </div>
          </div>

          {/* AFTER */}
          <div className="overgang-figure overgang-after">
            <div className="overgang-svg-wrap">
              <svg
                viewBox="0 0 160 220"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Calm rings — expand outward from chest */}
                <g className="calm-rings">
                  <circle className="calm-ring r1" cx="80" cy="100" r="40" />
                  <circle className="calm-ring r2" cx="80" cy="100" r="40" />
                  <circle className="calm-ring r3" cx="80" cy="100" r="40" />
                </g>

                {/* Head (upright) */}
                <circle cx="80" cy="50" r="12" />
                {/* Spine — straight, upright */}
                <line x1="80" y1="62" x2="80" y2="138" />
                {/* Shoulders — wider, lower (relaxed) */}
                <line x1="60" y1="74" x2="100" y2="74" />
                {/* Arms slightly out, palms open */}
                <path d="M60 74 Q 52 104, 50 128" />
                <path d="M100 74 Q 108 104, 110 128" />
                {/* Open palms — small horizontal lines */}
                <line x1="44" y1="130" x2="56" y2="130" />
                <line x1="104" y1="130" x2="116" y2="130" />
                {/* Legs */}
                <line x1="80" y1="138" x2="74" y2="194" />
                <line x1="80" y1="138" x2="86" y2="194" />
                {/* Feet */}
                <line x1="66" y1="194" x2="80" y2="194" />
                <line x1="80" y1="194" x2="94" y2="194" />
                {/* Ground */}
                <line x1="20" y1="204" x2="140" y2="204" opacity="0.4" />
              </svg>
            </div>
            <div className="overgang-label-row">
              <span className="overgang-tag overgang-tag-after">Etter</span>
              <span className="overgang-cap">Rolig, til stede</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stillinger (meditation positions) ─── */
function Stillinger() {
  // Each figure is a thin line drawing on a 140x180 viewBox.
  // Common stroke style is set on the parent <g> so each figure stays clean.

  const figures = [
    {
      label: "Sittende",
      sub: "På stol",
      svg: (
        <g>
          {/* Chair back */}
          <line x1="30" y1="78" x2="30" y2="170" />
          {/* Chair seat */}
          <line x1="30" y1="78" x2="86" y2="78" />
          {/* Chair seat front leg */}
          <line x1="86" y1="78" x2="86" y2="170" />
          {/* Body sitting */}
          <line x1="46" y1="78" x2="46" y2="36" />
          {/* Head */}
          <circle cx="46" cy="24" r="11" />
          {/* Arm forward, hand on knee */}
          <path d="M46 48 Q 60 60, 78 72" fill="none" />
          {/* Thigh forward */}
          <line x1="46" y1="78" x2="86" y2="78" />
          {/* Lower leg down */}
          <line x1="86" y1="78" x2="86" y2="138" />
          {/* Foot */}
          <line x1="86" y1="138" x2="100" y2="138" />
          {/* Ground */}
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Stående",
      sub: "med øynene ut over horisonten",
      svg: (
        <g>
          {/* Head */}
          <circle cx="70" cy="32" r="11" />
          {/* Torso */}
          <line x1="70" y1="44" x2="70" y2="105" />
          {/* Left arm to hands */}
          <path d="M58 60 Q 60 75, 70 90" fill="none" />
          {/* Right arm to hands */}
          <path d="M82 60 Q 80 75, 70 90" fill="none" />
          {/* Hands (small diamond at heart) */}
          <path d="M66 88 L 70 84 L 74 88 L 70 94 Z" fill="none" />
          {/* Left leg */}
          <line x1="70" y1="105" x2="60" y2="160" />
          {/* Right leg */}
          <line x1="70" y1="105" x2="80" y2="160" />
          {/* Feet */}
          <line x1="52" y1="160" x2="68" y2="160" />
          <line x1="72" y1="160" x2="88" y2="160" />
          {/* Ground */}
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Knelende",
      sub: "På puter",
      svg: (
        <g>
          {/* Head */}
          <circle cx="48" cy="34" r="11" />
          {/* Torso */}
          <line x1="48" y1="46" x2="48" y2="100" />
          {/* Arms resting on thighs */}
          <path d="M48 65 Q 64 80, 82 96" fill="none" />
          {/* Thigh forward, slightly down */}
          <line x1="48" y1="100" x2="92" y2="105" />
          {/* Folded lower leg back under (curve) */}
          <path d="M92 105 Q 88 130, 48 130" fill="none" />
          {/* Cushion (subtle) */}
          <path d="M40 138 Q 60 142, 96 138 Q 100 145, 96 148 Q 60 152, 40 148 Q 36 145, 40 138 Z" fill="none" opacity="0.4" />
          {/* Ground */}
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Lotus",
      sub: "Korslagte ben",
      svg: (
        <g>
          {/* Head */}
          <circle cx="70" cy="38" r="11" />
          {/* Torso */}
          <line x1="70" y1="50" x2="70" y2="108" />
          {/* Arms folded into lap */}
          <path d="M58 65 Q 56 90, 68 105" fill="none" />
          <path d="M82 65 Q 84 90, 72 105" fill="none" />
          {/* Hands in lap (small horizontal line) */}
          <line x1="62" y1="108" x2="78" y2="108" />
          {/* Crossed legs — left thigh going right then down */}
          <path d="M70 108 Q 96 120, 102 145" fill="none" />
          {/* Right thigh going left then down */}
          <path d="M70 108 Q 44 120, 38 145" fill="none" />
          {/* Crossed feet base */}
          <path d="M38 145 Q 70 158, 102 145" fill="none" />
          {/* Ground */}
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
  ];

  return (
    <section className="stillinger" id="stillinger">
      <div className="shell">
        <div className="stillinger-head">
          <span className="label">Stillinger</span>
          <h2 className="stillinger-h">
            <em className="editorial">Sitt slik</em> du vil.
          </h2>
          <p className="stillinger-sub">
            Stol, knele, stå eller lotus. Posituren er ikke poenget. Vi finner det som lar kroppen være rolig og våken samtidig.
          </p>
        </div>

        <div className="stillinger-row">
          {figures.map((f, i) => (
            <div className="stilling" key={i} style={{ animationDelay: `${i * 0.45}s` }}>
              <div className="stilling-svg-wrap">
                <svg
                  className="stilling-svg"
                  viewBox="0 0 140 180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.svg}
                </svg>
              </div>
              <div className="stilling-num">{`0${i + 1}`}</div>
              <div className="stilling-label"><em className="editorial">{f.label}</em></div>
              <div className="stilling-sub">{f.sub}</div>
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
        <span className="final-deco-num"><em className="editorial">13</em></span>
        <h2>
          Klar for <em>3 dager</em><br/>med ro?
        </h2>
        <p>
          Ventelisten er gratis. Ingen forpliktelse. Vi sender deg dato og mer informasjon, og du bestemmer selv om du vil reservere en plass.
        </p>
        <div className="final-line"></div>
        <button className="btn btn-fill btn-lg" onClick={onSignup}>
          Bli med på ventelisten <span className="btn-arrow">→</span>
        </button>
        <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--ink-soft)", letterSpacing: "0.04em" }}>
          Spørsmål? Skriv til <a href="mailto:jens@klarlinje.no" style={{ color: "var(--accent)", textDecoration: "none" }}>jens@klarlinje.no</a>
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-col">
            <h5><em className="editorial">Klarlinje</em></h5>
            <p style={{ fontSize: 12, lineHeight: 1.6, letterSpacing: 0, textTransform: "none", color: "var(--ink-mute)" }}>
              Et sekulært, evidensbasert retreat for høytfungerende voksne. Høsten 2026 på Son Spa.
            </p>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Retreat</em></h5>
            <ul>
              <li><a href="#programmet">Programmet</a></li>
              <li><a href="#sted">Stedet</a></li>
              <li><a href="#aufguss">Aufguss</a></li>
              <li><a href="#meldpaa">Meld deg på</a></li>
              <li><a href="medarbeidersamling.html">Medarbeidersamling</a></li>
              <li><a href="ledergruppe.html">For ledergrupper</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Kontakt</em></h5>
            <ul>
              <li><a href="mailto:jens@klarlinje.no">jens@klarlinje.no</a></li>
              <li><a href="#">Personvern</a></li>
              <li><a href="#">Vilkår</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Klarlinje · Oslo / Son</div>
          <div>Versjon 2 · Editorial</div>
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
      // Network or CORS edge case. Kit usually still receives the submission.
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
            <span className="label modal-eyebrow">Venteliste · Høsten 2026</span>
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
            { value: "uthvilt-q", label: "«Klar for å bli helt uthvilt?»" },
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
      <Overgang />
      <Program />
      <Chapters />
      <Jens />
      <Research />
      <Sted />
      {t.showAufguss && <Aufguss />}
      {t.showQuotes && <Quotes />}
      <Inkludert />
      <Passer />
      <Stillinger />
      <FAQ />
      <FinalCTA onSignup={openSignup} />
      <Footer />
      <SignupModal open={signupOpen} onClose={closeSignup} />
      <KlarTweaks t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
