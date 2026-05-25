/* velkommen.jsx — bekreftelsesside etter e-postbekreftelse */
const { useEffect, useState } = React;

function Nav() {
  return (
    <nav className="nav scrolled">
      <a href="index.html" className="nav-brand">
        <span className="nav-brand-mark"></span>
        <span><em className="editorial">Klarlinje</em></span>
      </a>
    </nav>
  );
}

function Velkommen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="final"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <div className="final-inner" style={{ width: "100%" }}>

        {/* Check mark */}
        <div style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 36px",
          color: "var(--accent)",
          fontSize: 22,
        }}>
          ✓
        </div>

        <span className="label" style={{ color: "var(--accent)", display: "block", marginBottom: 28 }}>
          Venteliste · Bekreftet
        </span>

        <h1 style={{
          fontFamily: '"Newsreader", serif',
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(52px, 8vw, 130px)",
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          fontVariationSettings: '"opsz" 144',
          color: "var(--ink)",
          margin: "0 auto 48px",
          maxWidth: "14ch",
        }}>
          Du er med.
        </h1>

        <div className="final-line"></div>

        <p>
          Du får én e-post når datoene for Høsten 2026 er satt, og én til når påmeldingen åpner. Det er alt — ingen støy i mellomtiden.
        </p>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          marginTop: "2.5rem",
        }}>
          <a href="index.html" className="btn btn-fill btn-lg">
            Tilbake til Klarlinje <span className="btn-arrow">→</span>
          </a>

          <p style={{
            fontSize: "0.82rem",
            color: "var(--ink-mute)",
            letterSpacing: "0.04em",
            marginTop: "1rem",
            marginBottom: 0,
          }}>
            Spørsmål? Skriv til{" "}
            <a href="mailto:jens@klarlinje.no" style={{ color: "var(--accent)", textDecoration: "none" }}>
              jens@klarlinje.no
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-bottom" style={{ borderTop: "none", paddingTop: 0 }}>
          <div>© 2026 Klarlinje · Oslo / Son</div>
          <div>
            <a href="index.html" style={{ color: "var(--ink-mute)", textDecoration: "none" }}>
              ← Tilbake til hovedsiden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Nav />
      <Velkommen />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
