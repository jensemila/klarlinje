/* ledergruppe.jsx — Klarlinje for HR og ledergrupper */
const { useState, useEffect } = React;

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

const DAYS = [
  {
    num: "i",
    day: "Fredag kveld",
    title: "Ankomst og åpning",
    body: "Sjekk inn, middag og en kort felles åpningsøkt som setter rammen for helgen.",
  },
  {
    num: "ii",
    day: "Lørdag",
    title: "Meditasjon, undervisning og aufguss",
    body: "Morgenøkt, felles frokost, lengre meditasjon midt på dagen med undervisning, kveldsøkt. Aufguss på badstueflåten om kvelden.",
  },
  {
    num: "iii",
    day: "Søndag",
    title: "Avslutning og hjemreise",
    body: "Siste meditasjonsøkt, felles lunsj og avreise. Deltakerne får med seg konkrete verktøy for å fortsette praksisen hjemme.",
  },
];

function Program() {
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
            <ol className="program-sessions">
              {DAYS.map((d) => (
                <li className="program-sess" key={d.num}>
                  <div className="program-sess-rule" aria-hidden="true"></div>
                  <span className="program-sess-num">{d.num}.</span>
                  <div className="program-sess-when">
                    <span className="program-sess-when-name"><em className="editorial">{d.day}</em></span>
                    <span className="program-sess-when-place">{d.title}</span>
                  </div>
                  <p className="program-sess-body">{d.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

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

function Research() {
  return (
    <section id="forskning" style={{ padding: "100px 0", background: "var(--bg-soft)" }}>
      <div className="shell">
        <div className="research-head">
          <span className="label">Forskning</span>
          <div></div>
          <h2><em className="editorial">Svogerforskning?</em><br/>Nei.</h2>
        </div>
        <div className="program-days" style={{ marginTop: "3rem" }}>
          <div></div>
          <div>
            <p className="research-lead">
              Klarlinje er basert på MBSR (Mindfulness-Based Stress Reduction), utviklet av Jon Kabat-Zinn ved University of Massachusetts i 1979. Det er det mest studerte mindfulness-programmet i verden, med hundrevis av randomiserte kontrollerte studier.
            </p>
            <p style={{ color: "var(--ink-soft)", maxWidth: "64ch", marginTop: "1.5rem", lineHeight: 1.7 }}>
              Tre dager er nok til målbare biologiske endringer. En randomisert studie publisert i <em>Psychoneuroendocrinology</em> viste at et tre-dagers meditasjonsretreat reduserte pro-inflammatoriske cytokiner (IL-6 og IL-8) og økte anti-inflammatorisk IL-10. Kronisk betennelse er koblet til depresjon, utbrenthet og hjertesykdom.
            </p>
            <div className="research-cite" style={{ marginTop: "2.5rem" }}>
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
      </div>
    </section>
  );
}

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
    q: "Hva med deltakere som aldri har meditert?",
    a: "Perfekt utgangspunkt. Vi begynner fra begynnelsen, og ingen forkunnskaper kreves. De fleste deltakere på Klarlinje mediterer for aller første gang.",
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

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <PullQuote />
      <Why />
      <Program />
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
