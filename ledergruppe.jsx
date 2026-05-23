/* ledergruppe.jsx — Klarlinje for HR og ledergrupper */
const { useState, useEffect, useRef } = React;

/* ─── useInView hook ─── */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setInView(true); }); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── ResearchChart SVG ─── */
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
      <line x1="60" y1="50"  x2="480" y2="50"  className="chart-grid" />
      <line x1="60" y1="120" x2="480" y2="120" className="chart-grid" />
      <line x1="60" y1="190" x2="480" y2="190" className="chart-grid" />
      <line x1="60" y1="260" x2="480" y2="260" className="chart-grid" />
      <line x1="60" y1="40" x2="60" y2="260" className="chart-axis" />
      <line x1="60" y1="260" x2="480" y2="260" className="chart-axis" />
      <text x="50" y="54" textAnchor="end" className="chart-axis-label">Høy</text>
      <text x="50" y="264" textAnchor="end" className="chart-axis-label">Lav</text>
      <text x="60"  y="284" textAnchor="middle" className="chart-axis-label">Dag 1</text>
      <text x="270" y="284" textAnchor="middle" className="chart-axis-label">Dag 2</text>
      <text x="480" y="284" textAnchor="middle" className="chart-axis-label">Dag 3</text>
      <text x="60" y="22" textAnchor="start" className="chart-title">Endring over 3 dager</text>
      <text x="480" y="22" textAnchor="end" className="chart-title chart-title-muted">Rosenkranz et al. (2021)</text>
      <polyline className="chart-line line-il10" points="60,225 270,140 480,55" stroke="var(--accent)" strokeWidth="2" pathLength="1" />
      <circle cx="60"  cy="225" r="4" fill="var(--accent)" className="chart-dot dot-il10" />
      <circle cx="270" cy="140" r="3" fill="var(--accent)" className="chart-dot dot-il10" />
      <circle cx="480" cy="55"  r="5" fill="var(--accent)" className="chart-dot dot-il10" />
      <text x="490" y="59" className="chart-line-label chart-line-label-accent">IL-10</text>
      <polyline className="chart-line line-il6" points="60,70 270,135 480,210" stroke="var(--accent-2)" strokeWidth="1.6" pathLength="1" />
      <circle cx="60"  cy="70"  r="3.5" fill="var(--accent-2)" className="chart-dot dot-il6" />
      <circle cx="270" cy="135" r="3"   fill="var(--accent-2)" className="chart-dot dot-il6" />
      <circle cx="480" cy="210" r="3.5" fill="var(--accent-2)" className="chart-dot dot-il6" />
      <text x="490" y="214" className="chart-line-label">IL-6 &amp; IL-8</text>
      <polyline className="chart-line line-stress" points="60,95 270,160 480,235" stroke="var(--ink-soft)" strokeWidth="1.3" strokeDasharray="4 4" pathLength="1" />
      <circle cx="60"  cy="95"  r="3"   fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <circle cx="270" cy="160" r="2.5" fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <circle cx="480" cy="235" r="3"   fill="var(--ink-soft)" className="chart-dot dot-stress" />
      <text x="490" y="239" className="chart-line-label chart-line-label-muted">Stress</text>
    </svg>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="index.html" className="nav-brand">
        <span className="nav-brand-mark"></span>
        <span><em className="editorial">Klarlinje</em></span>
      </a>
      <div className="nav-links">
        <a href="#hvorfor" className="nav-link-text">Hvorfor</a>
        <a href="#program" className="nav-link-text">Program</a>
        <a href="#forskning" className="nav-link-text">Forskning</a>
        <a href="#faq" className="nav-link-text">Spørsmål</a>
        <a href="mailto:jens@klarlinje.no" className="btn">
          Ta kontakt <span className="btn-arrow">→</span>
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-image" src="images/son-spa-pool.jpg" alt="Son Spa basseng med utsikt mot Oslofjorden" />
      <div className="hero-tint"></div>
      <div className="hero-grain"></div>
      <div className="hero-content">
        <div className="hero-top">
          <div></div>
          <div className="hero-meta-block">
            <span className="label">For HR og ledergrupper</span>
            <div className="meta-val" style={{ marginTop: 12 }}>Son Spa, Vestby</div>
            <span className="label" style={{ marginTop: 18 }}>Gruppestørrelse</span>
            <div className="meta-val">Opptil 15 deltakere</div>
          </div>
        </div>
        <div>
          <h1 className="hero-headline">
            Meditasjon<br/><em>er lederutvikling.</em>
          </h1>
          <div className="hero-bottom">
            <div>
              <p className="hero-sub">
                Et evidensbasert mindfulness-retreat for ledergrupper. Tre dager med meditasjon, undervisning og hvile ved Oslofjorden som gir lederne dine verktøy de bruker resten av karrieren.
              </p>
              <div className="hero-cta-row">
                <a href="mailto:jens@klarlinje.no" className="btn btn-fill btn-lg">
                  Ta kontakt <span className="btn-arrow">→</span>
                </a>
                <a href="#program" className="btn btn-lg btn-ghost">
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

/* ─── Pull Quote ─── */
function PullQuote() {
  return (
    <section style={{ padding: "80px 0", background: "var(--bg-soft)" }}>
      <div className="shell">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem", alignItems: "center" }}>
          <div></div>
          <blockquote style={{ margin: 0, borderLeft: "2px solid var(--accent)", paddingLeft: "2rem" }}>
            <p style={{
              fontFamily: '"Newsreader", serif',
              fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--ink)",
              lineHeight: 1.35,
              margin: "0 0 1.5rem"
            }}>
              «De fleste lederutviklingsprogrammer gir mer input til et alt for sprengt hode. En retreat gjør det motsatte.»
            </p>
            <footer style={{ fontSize: "0.78rem", letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--accent)" }}>
              Jens Asp, retreatleder
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ─── Why ─── */
const WHY_ITEMS = [
  {
    num: "01",
    title: "Redusert stressnivå",
    body: "Forskning viser målbare biologiske endringer etter bare tre dager med meditasjon. Lavere kortisol, lavere betennelse og bedre søvn.",
  },
  {
    num: "02",
    title: "Bedre beslutninger",
    body: "Mindfulness reduserer reaktivitet og kognitiv bias. Ledere som mediterer tar mer gjennomtenkte beslutninger under press.",
  },
  {
    num: "03",
    title: "Sterkere ledergruppe",
    body: "Å samles i retreatform gjør noe unikt med en ledergruppe. Son Spa er kanskje kjent for de fleste, men å meditere i 3,5 timer er ikke det. Dette kan styrke tillit og åpenhet i gruppen på en måte andre møter ikke gjør.",
  },
  {
    num: "04",
    title: "Verktøy de faktisk bruker",
    body: "Tre dager er nok til å etablere en meditasjonspraksis som holder etter at helgen er over.",
  },
];

function Why() {
  return (
    <section id="hvorfor" style={{ padding: "100px 0" }}>
      <div className="shell">
        <div className="chapters-head">
          <span className="label">Hvorfor dette virker</span>
          <div></div>
          <h2>
            <em className="editorial">Det lederne dine trenger</em><br/>er ikke mer informasjon.
          </h2>
        </div>
        <div className="program-days" style={{ marginTop: "1rem" }}>
          <div></div>
          <div>
            <p style={{ color: "var(--ink-soft)", marginTop: 0, marginBottom: "3rem", maxWidth: "60ch" }}>
              Tre dager uten støy gir lederne kapasitet til å tenke klarere, reagere roligere og lede bedre når de er tilbake.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2.5rem"
            }}>
              {WHY_ITEMS.map((item) => (
                <div key={item.num}>
                  <div className="chapter-num">{item.num}</div>
                  <div className="chapter-title" style={{ marginBottom: "0.75rem" }}><em>{item.title}</em></div>
                  <p className="chapter-body" style={{ marginTop: 0 }}>{item.body}</p>
                </div>
              ))}
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
    { num: "i",    when: "Fredag kveld",          place: "Konferansesal",  duration: "30 min",             body: "Ankomst til Son Spa, velkomst og felles åpningsøkt." },
    { num: "ii",   when: "Lørdag 08:00–10:00",    place: "Restauranten",   duration: "—",    optional: true, body: "Frokost. Spis i ditt eget tempo." },
    { num: "iii",  when: "Lørdag morgen",          place: "Konferansesal",  duration: "30 min", optional: true, body: "Valgfri morgenmeditasjon. Stille i eget tempo." },
    { num: "iv",   when: "Lørdag, midt på dagen",  place: "Konferansesal",  duration: "1 t",                body: "Lengre fellesøkt med meditasjon og undervisning i stressmestring." },
    { num: "v",    when: "Lørdag 13:00",           place: "Restauranten",   duration: "—",                  body: "Lunsj." },
    { num: "vi",   when: "Lørdag kveld",           place: "Konferansesal",  duration: "30 min",             body: "Kveldsmeditasjon." },
    { num: "vii",  when: "Lørdag 18:00",           place: "Restauranten",   duration: "—",                  body: "Middag." },
    { num: "viii", when: "Søndag formiddag",       place: "Konferansesal",  duration: "1 t",                body: "Avsluttende økt. Deltakerne får med seg konkrete verktøy." },
    { num: "ix",   when: "Søndag 13:00",           place: "Restauranten",   duration: "—",                  body: "Lunsj og avreise." },
  ];
  return (
    <section id="program" style={{ padding: "100px 0", background: "var(--bg-soft)" }}>
      <div className="shell">
        <div className="program-head">
          <span className="label">Programmet</span>
          <div></div>
          <h2><em className="editorial">Hva som skjer.</em></h2>
        </div>
        <div className="program-days">
          <div></div>
          <div>
            <p className="program-intro">
              Fem guidede meditasjonsøkter på til sammen 3,5 timer. Undervisning i stressmestring og fokus. Bevegelse, badstue og måltider fyller resten. Det er rom for sosialt samvær. Det er ikke lov å ha møtevirksomhet under helgen.
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
      </div>
    </section>
  );
}

/* ─── Overgang (stressed → calm) ─── */
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
            Ledere trenger ikke mer informasjon. De trenger en helg der kroppen og hodet får komme tilbake til en mer stressfri tilstand.
          </p>
        </div>

        <div className="overgang-stage">
          {/* BEFORE */}
          <div className="overgang-figure overgang-before">
            <div className="overgang-svg-wrap">
              <svg viewBox="0 0 160 220" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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
                <circle cx="80" cy="56" r="12" />
                <path d="M80 68 Q 82 100, 80 140" />
                <line x1="68" y1="76" x2="92" y2="76" />
                <line x1="68" y1="76" x2="64" y2="124" />
                <line x1="92" y1="76" x2="96" y2="124" />
                <circle cx="64" cy="128" r="3" />
                <circle cx="96" cy="128" r="3" />
                <line x1="80" y1="140" x2="72" y2="194" />
                <line x1="80" y1="140" x2="88" y2="194" />
                <line x1="64" y1="194" x2="78" y2="194" />
                <line x1="82" y1="194" x2="96" y2="194" />
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
              <line className="arrow-line" x1="0" y1="30" x2="180" y2="30" />
              <polyline className="arrow-head" points="172,22 184,30 172,38" />
            </svg>
            <div className="overgang-arrow-label">
              <span className="label">3 dager</span>
            </div>
          </div>

          {/* AFTER */}
          <div className="overgang-figure overgang-after">
            <div className="overgang-svg-wrap">
              <svg viewBox="0 0 160 220" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <g className="calm-rings">
                  <circle className="calm-ring r1" cx="80" cy="100" r="40" />
                  <circle className="calm-ring r2" cx="80" cy="100" r="40" />
                  <circle className="calm-ring r3" cx="80" cy="100" r="40" />
                </g>
                <circle cx="80" cy="50" r="12" />
                <line x1="80" y1="62" x2="80" y2="138" />
                <line x1="60" y1="74" x2="100" y2="74" />
                <path d="M60 74 Q 52 104, 50 128" />
                <path d="M100 74 Q 108 104, 110 128" />
                <line x1="44" y1="130" x2="56" y2="130" />
                <line x1="104" y1="130" x2="116" y2="130" />
                <line x1="80" y1="138" x2="74" y2="194" />
                <line x1="80" y1="138" x2="86" y2="194" />
                <line x1="66" y1="194" x2="80" y2="194" />
                <line x1="80" y1="194" x2="94" y2="194" />
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
  const figures = [
    {
      label: "Sittende",
      sub: "På stol",
      svg: (
        <g>
          <line x1="30" y1="78" x2="30" y2="170" />
          <line x1="30" y1="78" x2="86" y2="78" />
          <line x1="86" y1="78" x2="86" y2="170" />
          <line x1="46" y1="78" x2="46" y2="36" />
          <circle cx="46" cy="24" r="11" />
          <path d="M46 48 Q 60 60, 78 72" fill="none" />
          <line x1="46" y1="78" x2="86" y2="78" />
          <line x1="86" y1="78" x2="86" y2="138" />
          <line x1="86" y1="138" x2="100" y2="138" />
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Stående",
      sub: "med øynene ut over horisonten",
      svg: (
        <g>
          <circle cx="70" cy="32" r="11" />
          <line x1="70" y1="44" x2="70" y2="105" />
          <path d="M58 60 Q 60 75, 70 90" fill="none" />
          <path d="M82 60 Q 80 75, 70 90" fill="none" />
          <path d="M66 88 L 70 84 L 74 88 L 70 94 Z" fill="none" />
          <line x1="70" y1="105" x2="60" y2="160" />
          <line x1="70" y1="105" x2="80" y2="160" />
          <line x1="52" y1="160" x2="68" y2="160" />
          <line x1="72" y1="160" x2="88" y2="160" />
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Knelende",
      sub: "På puter",
      svg: (
        <g>
          <circle cx="48" cy="34" r="11" />
          <line x1="48" y1="46" x2="48" y2="100" />
          <path d="M48 65 Q 64 80, 82 96" fill="none" />
          <line x1="48" y1="100" x2="92" y2="105" />
          <path d="M92 105 Q 88 130, 48 130" fill="none" />
          <path d="M40 138 Q 60 142, 96 138 Q 100 145, 96 148 Q 60 152, 40 148 Q 36 145, 40 138 Z" fill="none" opacity="0.4" />
          <line x1="20" y1="170" x2="120" y2="170" opacity="0.5" />
        </g>
      ),
    },
    {
      label: "Lotus",
      sub: "Korslagte ben",
      svg: (
        <g>
          <circle cx="70" cy="38" r="11" />
          <line x1="70" y1="50" x2="70" y2="108" />
          <path d="M58 65 Q 56 90, 68 105" fill="none" />
          <path d="M82 65 Q 84 90, 72 105" fill="none" />
          <line x1="62" y1="108" x2="78" y2="108" />
          <path d="M70 108 Q 96 120, 102 145" fill="none" />
          <path d="M70 108 Q 44 120, 38 145" fill="none" />
          <path d="M38 145 Q 70 158, 102 145" fill="none" />
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

/* ─── Practical ─── */
function Practical() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="shell">
        <div className="chapters-head">
          <span className="label">Praktisk</span>
          <div></div>
          <h2><em className="editorial">Alt dere trenger</em><br/>er inkludert.</h2>
        </div>
        <div className="program-days">
          <div></div>
          <div>
            <div className="program-summary" style={{ marginBottom: "3rem" }}>
              <div className="program-summary-cell">
                <div className="program-summary-val">15 000</div>
                <div className="program-summary-key">kr per person</div>
              </div>
              <div className="program-summary-cell">
                <div className="program-summary-val">15</div>
                <div className="program-summary-key">maks deltakere</div>
              </div>
              <div className="program-summary-cell">
                <div className="program-summary-val">3</div>
                <div className="program-summary-key">dager</div>
              </div>
              <div className="program-summary-cell">
                <div className="program-summary-val">40 <span className="program-summary-unit">min</span></div>
                <div className="program-summary-key">fra Oslo</div>
              </div>
            </div>

            <div className="sted-meta-rows">
              <div className="sted-meta-row">
                <span className="k">Inkludert</span>
                <span className="v">Enkeltrom, alle måltider fra fredag middag til søndag lunsj, spa og hele programmet</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Stedet</span>
                <span className="v">Son Spa, Vestby — 40 min bil · 50 min tog til Son stasjon</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Tidspunkt</span>
                <span className="v">Fredag til søndag, eller midt i uka etter avtale</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Privat booking</span>
                <span className="v">Kun din gruppe — ingen andre deltakere på retreaten</span>
              </div>
              <div className="sted-meta-row">
                <span className="k">Faktura</span>
                <span className="v">Til selskapet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Research ─── */
function Research() {
  const [chartRef, chartInView] = useInView(0.25);
  return (
    <section id="forskning" style={{ padding: "100px 0", background: "var(--bg-soft)" }}>
      <div className="shell">
        <div className="research-head">
          <span className="label">Forskning</span>
          <div></div>
          <h2><em className="editorial">Svogerforskning?</em><br/>Nei.</h2>
        </div>

        <div className="research-grid">
          <div></div>
          <p className="research-lead">
            En randomisert studie viser at <em>tre dager</em> med meditasjon gir målbare biologiske endringer i immunsystemet — ikke bare psykologiske effekter.
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
              Klarlinje er basert på MBSR (Mindfulness-Based Stress Reduction), utviklet av Jon Kabat-Zinn ved University of Massachusetts i 1979. Det er det mest studerte mindfulness-programmet i verden, med hundrevis av randomiserte kontrollerte studier.
            </p>
            <p>
              Kronisk betennelse er koblet til depresjon, utbrenthet og hjertesykdom. De fleste lederutviklingsprogrammer gir mer informasjon til et allerede overbelastet system. Klarlinje gjør det motsatte.
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

/* ─── Jens ─── */
function Jens() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="shell">
        <div className="jens-grid">
          <div className="jens-photo-wrap">
            <img src="images/jens.jpg" alt="Portrett av Jens Asp" />
            <div className="jens-photo-tag">Jens Asp · Retreatleder</div>
          </div>
          <div className="jens-body">
            <div className="jens-eyebrow">
              <span className="label">Hvem leder</span>
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

/* ─── FAQ ─── */
const FAQ_DATA = [
  {
    q: "Kan vi booke Klarlinje kun for vår ledergruppe?",
    a: "Ja. Klarlinje kan bookes som et dedikert opplegg for kun din gruppe — ingen andre deltakere på retreaten. Ta kontakt på e-post, så setter vi opp en prat om hva som passer for dere.",
  },
  {
    q: "Hva er minimumsantall deltakere?",
    a: "Vi anbefaler mellom 6 og 15 deltakere for å sikre god gruppedynamikk. Under 5 er for lite for formatet; over 15 er for mange.",
  },
  {
    q: "Er dette religiøst eller alternativt?",
    a: "Nei. Klarlinje er sekulært og evidensbasert. Ingen åndelighet, ingen ritualer, ingen religion. Bare praktiske teknikker med dokumentert effekt.",
  },
  {
    q: "Hva slags meditasjon er dette?",
    a: "Mindfulness, evidensbasert. Inspirert av MBSR (Mindfulness-Based Stress Reduction), utviklet av Jon Kabat-Zinn ved University of Massachusetts i 1979. Det er det mest studerte mindfulness-programmet i verden, med over 40 år og hundrevis av randomiserte kontrollerte studier bak seg.",
  },
  {
    q: "Hva med deltakere som aldri har meditert?",
    a: "Perfekt utgangspunkt. Vi begynner fra begynnelsen, og ingen forkunnskaper kreves. De fleste deltakere på Klarlinje mediterer for aller første gang.",
  },
  {
    q: "Hvilken stilling sitter man i når man mediterer?",
    a: "Den som passer best for den enkelte. Sittende på stol, knelende, stående eller i lotusstilling på gulvet. Hensikten er ikke positur, men å finne en stilling der kroppen er rolig og våken samtidig. Vi gir veiledning underveis.",
  },
  {
    q: "Hva skiller dette fra andre lederutviklingsprogrammer?",
    a: "De fleste programmer legger mer informasjon inn i et allerede sprengt hode. Klarlinje gjør det motsatte: vi skaper rom for stillhet og refleksjon. Lederne går ikke hjem med et bøttekort av innsikter — de går hjem med en fungerende praksis.",
  },
  {
    q: "Hva er ROI for bedriften?",
    a: "Forskning viser redusert stressnivå, bedre kognitiv funksjon og lavere turnover blant ledere som mediterer. Det er vanskelig å tallfeste, men kostnaden av utbrenthet i toppledergruppa er veldig lett å tallfeste.",
  },
  {
    q: "Kan vi kombinere retreaten med en strategisamling?",
    a: "Nei. Det er nøyaktig det vi ikke gjør. Ingen møter, ingen agendaer og ingen beslutningstaking under helgen. Det er det som gjør det til et retreat — og det er det som gjør det effektivt.",
  },
  {
    q: "Hva med trening?",
    a: "Rolig morgenbevegelse er en del av programmet. I tillegg arrangerer vi en felles joggetur eller gåtur for de som har lyst. Hotellets fasiliteter står også åpne for egen bruk.",
  },
  {
    q: "Hva er anbefalingen for mobilbruk?",
    a: "Deltakerne får mest ut av helgen om mobilen blir liggende på rommet i flymodus. Det er ingen krav, men en anbefaling. Ønsker noen å forplikte seg helt, kan de levere inn telefonen i resepsjonen.",
  },
  {
    q: "Hva er anbefalingen for alkohol?",
    a: "Deltakerne får mest ut av helgen om de holder seg unna alkohol disse dagene. Son Spa er ikke alkoholfritt, men vi anbefaler å la det ligge. Alle bestemmer selv.",
  },
  {
    q: "Er Son Spa stengt for andre gjester under retreaten?",
    a: "Nei. Son Spa er åpent for andre gjester i de samme dagene. Ledergruppens økter foregår i privat konferansesal. Deltakerne vil møte andre i resepsjonen og frokostbufféen, men programmet er uforstyrret.",
  },
  {
    q: "Hva bør deltakerne pakke?",
    a: "Behagelige klær til bevegelse og innendørs, badetøy, og noe varmt for kveldsturer. Ta gjerne med en treningsmatte eller yogamatte. Har noen en meditasjonskrakk eller meditasjonspute, er de velkommen til å ta den med — hvis ikke har vi til låns.",
  },
  {
    q: "Kan vi få faktura til selskapet?",
    a: "Ja, vi fakturerer bedriften direkte. Ta kontakt for EHF-faktura eller andre fakturadetaljer.",
  },
  {
    q: "Hva er avbestillingsvilkårene?",
    a: "Fri avbestilling frem til 30 dager før retreaten. Mellom 30 og 14 dager refunderes 50 %. Etter 14 dager refunderes ingenting.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq" style={{ background: "var(--bg-soft)" }}>
      <div className="shell">
        <div className="faq-head">
          <span className="label">Spørsmål</span>
          <div></div>
          <h2><em className="editorial">Spørsmål som</em><br/>kommer igjen og igjen.</h2>
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

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="final" id="kontakt">
      <div className="final-inner">
        <span className="final-deco-num"><em className="editorial">→</em></span>
        <h2>
          Klar for å gjøre<br/><em>ledergruppen uthvilt?</em>
        </h2>
        <p>
          Send en e-post, så tar Jens kontakt for en kort prat om hva som passer for akkurat deres gruppe.
        </p>
        <div className="final-line"></div>
        <a href="mailto:jens@klarlinje.no" className="btn btn-fill btn-lg">
          Send e-post til Jens <span className="btn-arrow">→</span>
        </a>
        <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--ink-soft)", letterSpacing: "0.04em" }}>
          <a href="mailto:jens@klarlinje.no" style={{ color: "var(--accent)", textDecoration: "none" }}>jens@klarlinje.no</a>
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
              Et sekulært, evidensbasert retreat for høytfungerende voksne og ledergrupper. Son Spa, Vestby.
            </p>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Sider</em></h5>
            <ul>
              <li><a href="index.html">For enkeltpersoner</a></li>
              <li><a href="arbeidsgruppe.html">For arbeidsgrupper</a></li>
              <li><a href="ledergruppe.html">For ledergrupper</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5><em className="editorial">Kontakt</em></h5>
            <ul>
              <li><a href="mailto:jens@klarlinje.no">jens@klarlinje.no</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Klarlinje · Oslo / Son</div>
          <div><a href="index.html" style={{ color: "var(--ink-mute)", textDecoration: "none" }}>← Tilbake til hovedsiden</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <PullQuote />
      <Why />
      <Program />
      <Overgang />
      <Stillinger />
      <Practical />
      <Research />
      <Jens />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
