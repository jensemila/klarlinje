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

function Bekreftelse() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
        padding: "120px 24px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>

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
          fontSize: "clamp(52px, 8vw, 120px)",
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          fontVariationSettings: '"opsz" 144',
          color: "var(--ink)",
          margin: "0 auto 48px",
        }}>
          Du er med.
        </h1>

        <div style={{
          width: 40,
          height: 1,
          background: "var(--accent)",
          margin: "0 auto 40px",
          opacity: 0.5,
        }} />

        <p style={{
          color: "var(--ink-soft)",
          fontSize: "1rem",
          lineHeight: 1.7,
          maxWidth: "38ch",
          margin: "0 auto 40px",
        }}>
          Du får én e-post når datoene for høsten 2026 er satt, og én til når påmeldingen åpner. Ingen støy i mellomtiden.
        </p>

      </div>
    </section>
  );
}

function VideoSection() {
  const videos = [
    { id: "0ZkJc8Ht8d0", label: "Fra retreaten" },
    { id: "5RniE0dOZdw", label: "Stemning" },
  ];

  return (
    <section style={{
      padding: "0 24px 120px",
      maxWidth: 900,
      margin: "0 auto",
    }}>
      <p className="label" style={{
        textAlign: "center",
        marginBottom: 48,
        color: "var(--ink-mute)",
        letterSpacing: "0.1em",
      }}>
        Se hva som venter
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 24,
        justifyContent: "center",
      }}>
        {videos.map((v) => (
          <div key={v.id} style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>
            <div style={{
              position: "relative",
              width: "100%",
              paddingBottom: "177.78%", /* 9:16 */
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.label}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 72,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}>
        <a href="index.html" className="btn btn-fill btn-lg">
          Tilbake til Klarlinje <span className="btn-arrow">→</span>
        </a>
        <p style={{
          fontSize: "0.82rem",
          color: "var(--ink-mute)",
          letterSpacing: "0.04em",
          marginTop: "0.5rem",
          marginBottom: 0,
        }}>
          Spørsmål? Skriv til{" "}
          <a href="mailto:jens@klarlinje.no" style={{ color: "var(--accent)", textDecoration: "none" }}>
            jens@klarlinje.no
          </a>
        </p>
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
      <Bekreftelse />
      <VideoSection />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
