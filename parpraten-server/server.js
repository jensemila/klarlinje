// Parpraten - server. Holder Claude-nøkkelen, chattene og gratisgrensen.
// Nøkkelen leses fra ANTHROPIC_API_KEY. Den ligger aldri i koden.

import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn("\n  ADVARSEL: ANTHROPIC_API_KEY er ikke satt.\n");
}

const client = new Anthropic();
const MODEL = process.env.PARPRATEN_MODEL || "claude-opus-5";
const DATA_DIR = process.env.PARPRATEN_DATA || "/var/lib/parpraten/sessions";
const KEEP_DAYS = Number(process.env.PARPRATEN_KEEP_DAYS || 90);
const FREE_LIMIT = Number(process.env.PARPRATEN_FREE || 5);
const BASE_URL = process.env.PARPRATEN_BASE_URL || "https://parpraten.no";
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PRICE = process.env.STRIPE_PRICE_ID || "";
const STRIPE_WH = process.env.STRIPE_WEBHOOK_SECRET || "";
let stripe = null;
if (STRIPE_KEY) {
  const Stripe = (await import("stripe")).default;
  stripe = new Stripe(STRIPE_KEY);
  console.log("Stripe er koblet til.");
} else {
  console.warn("Stripe er ikke satt opp (STRIPE_SECRET_KEY mangler). Betaling er av.");
}
fs.mkdirSync(DATA_DIR, { recursive: true });

// --- koder ------------------------------------------------------------------
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_RE = /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;
function makeCode() {
  const blk = () => Array.from({ length: 4 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join("");
  return blk() + "-" + blk() + "-" + blk();
}
const fileFor = (c) => path.join(DATA_DIR, c + ".json");
function readSession(code) {
  try { return JSON.parse(fs.readFileSync(fileFor(code), "utf8")); } catch (e) { return null; }
}
function writeSession(code, s) {
  s.updated = new Date().toISOString();
  fs.writeFileSync(fileFor(code), JSON.stringify(s), { mode: 0o600 });
}

// Bremse mot gjetting.
const tries = new Map();
function tooManyTries(ip) {
  const now = Date.now();
  const rec = tries.get(ip) || { n: 0, t: now };
  if (now - rec.t > 10 * 60 * 1000) { rec.n = 0; rec.t = now; }
  rec.n += 1; tries.set(ip, rec);
  return rec.n > 15;
}
const ipOf = (req) => String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?").split(",")[0].trim();

function sweep() {
  const cutoff = Date.now() - KEEP_DAYS * 86400000;
  try {
    for (const f of fs.readdirSync(DATA_DIR)) {
      const p = path.join(DATA_DIR, f);
      try { if (fs.statSync(p).mtimeMs < cutoff) fs.unlinkSync(p); } catch (e) {}
    }
  } catch (e) {}
}
sweep();
setInterval(sweep, 12 * 3600 * 1000);

// --- betalingsstatus --------------------------------------------------------
// paid = true og paidUntil i framtida gir ubegrenset chat.
function isPaid(s) {
  if (!s || !s.paid) return false;
  if (!s.paidUntil) return true;
  return new Date(s.paidUntil).getTime() > Date.now();
}
function repliesLeft(s) {
  if (isPaid(s)) return Infinity;
  return Math.max(0, FREE_LIMIT - (s.used || 0));
}

// --- prompt -----------------------------------------------------------------
const QS = {
  par: ["Hvor lenge har dere vært sammen?", "Hva plager dere mest om dagen?", "Hvordan kjennes det mellom dere denne uka?"],
  alene: ["Hva fyller deg mest akkurat nå?", "Har du sagt dette høyt til noen?", "Hva trenger du mest i kveld?"]
};

function buildSystem(s) {
  const qs = QS[s.mode === "alene" ? "alene" : "par"];
  const a = Array.isArray(s.answers) ? s.answers : [];
  const ctx = qs.map((q, i) => "- " + q + " " + (a[i] || "")).join("\n");

  const common =
    "Du er en varm, klok samtalepartner om parforhold i appen Parpraten. " +
    "Du er ikke terapeut, og sier det rolig hvis noen tror du er det. " +
    "Du bygger på forskning om parforhold, blant annet John Gottman og Emily Nagoski, men snakker enkelt og på norsk, som til et klokt menneske du er glad i.\n\n" +
    "Svar alltid på norsk bokmål. Begynn svaret rett på sak, uten engelske ord og uten innledende fyllord som \"That\", \"Så\" eller \"Vel\".\n\n" +
    "Stil: varm, ærlig, konkret. Korte avsnitt. Ikke bruk tankestrek. Ikke bruk kolon i overskrifter. Skriv \"du\". Unngå klisjeer og terapisjargong. Gi ett eller to konkrete råd om gangen, ikke lange lister. Still gjerne ett oppfølgingsspørsmål tilbake.\n\n" +
    "Sikkerhet: Hvis personen nevner vold, frykt for partneren, overgrep eller tanker om å skade seg selv, slutt å gi vanlige råd. Si rolig at dette er større enn det du kan hjelpe med her, og vis til Mental Helse på 116 123 og nødnummer 112.\n\n" +
    "Hvis en melding er tull eller uforståelig, si rett ut at du ikke skjønte, slik et menneske ville.\n\n";

  const who = s.mode === "alene"
    ? ("Personen chatter alene og vil ventilere. Navn: " + (s.you || "ukjent") + ". Skriv til én person, ikke et par. Hjelp med å sortere følelser, og skift fokus fra hva den andre gjør feil til hva personen selv føler og trenger.\n")
    : ("Personen sitter sammen med partneren sin. Navn: " + (s.you || "ukjent") + " og " + (s.partner || "partneren") + ". Rådene skal se begges side.\n");

  return common + who + "\nSvar fra oppstarten:\n" + ctx + "\n\nSvar varmt og kort på personens neste melding.";
}

function openerInstruction(s) {
  return s.mode === "alene"
    ? "Skriv en kort, varm åpningshilsen til " + s.you + ". Ønsk personen velkommen og inviter til å fortelle hva som ligger på hjertet. To til tre setninger."
    : "Skriv en kort, varm åpningshilsen til " + s.you + " og " + s.partner + ". Ønsk dem velkommen og inviter dem til å fortelle om noe som er vanskelig mellom dem akkurat nå. To til tre setninger.";
}

// --- app --------------------------------------------------------------------
const app = express();
app.set("trust proxy", 1);
// Stripe-webhook må ha rå body for signaturkontroll, derfor før JSON-parseren.
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), (req, res) => {
  if (!stripe || !STRIPE_WH) return res.status(503).end();
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], STRIPE_WH);
  } catch (e) {
    console.error("webhook-signatur avvist:", e && e.message);
    return res.status(400).send("bad signature");
  }

  try {
    const o = event.data.object;
    const code = String((o.metadata && o.metadata.code) || o.client_reference_id || "").toUpperCase();

    if (event.type === "checkout.session.completed" && CODE_RE.test(code)) {
      const s2 = readSession(code);
      if (s2) {
        s2.paid = true;
        s2.stripeCustomer = o.customer || null;
        s2.stripeSubscription = o.subscription || null;
        if (o.customer_details && o.customer_details.email) s2.email = o.customer_details.email;
        writeSession(code, s2);
        console.log("betaling registrert for", code);
      }
    }

    if ((event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") && CODE_RE.test(code)) {
      const s2 = readSession(code);
      if (s2) {
        const aktiv = o.status === "active" || o.status === "trialing";
        s2.paid = aktiv;
        s2.paidUntil = o.current_period_end ? new Date(o.current_period_end * 1000).toISOString() : null;
        writeSession(code, s2);
        console.log("abonnement", o.status, "for", code);
      }
    }
  } catch (e) {
    console.error("webhook-feil:", e && e.message);
  }
  res.json({ received: true });
});

app.use(express.json({ limit: "256kb" }));
app.use(express.static(path.join(__dirname, "public")));

const safeView = (code, s) => ({
  code,
  mode: s.mode, you: s.you, partner: s.partner, answers: s.answers,
  paid: isPaid(s),
  free: isPaid(s) ? null : repliesLeft(s),
  freeLimit: FREE_LIMIT,
  // den skjulte instruksjons-turen sendes aldri til nettleseren
  turns: (s.turns || []).slice(1)
});

// Start en ny chat.
app.post("/api/session/start", (req, res) => {
  const b = req.body || {};
  const s = {
    mode: b.mode === "alene" ? "alene" : "par",
    you: String(b.you || "").slice(0, 60) || "Du",
    partner: String(b.partner || "").slice(0, 60) || "partneren din",
    answers: (Array.isArray(b.answers) ? b.answers : []).slice(0, 10).map((a) => String(a).slice(0, 1000)),
    used: 0, paid: false, turns: [], created: new Date().toISOString()
  };
  s.turns.push({ role: "user", content: openerInstruction(s) });
  const code = makeCode();
  writeSession(code, s);
  res.json({ code, freeLimit: FREE_LIMIT });
});

// Hente en tidligere chat.
app.get("/api/session/:code", (req, res) => {
  if (tooManyTries(ipOf(req))) return res.status(429).json({ error: "too_many" });
  const code = String(req.params.code || "").toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  const s = readSession(code);
  if (!s) return res.status(404).json({ error: "not_found" });
  res.json(safeView(code, s));
});

// Chat. Serveren eier historikken og telleren.
app.post("/api/chat", async (req, res) => {
  const b = req.body || {};
  const code = String(b.code || "").toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  const s = readSession(code);
  if (!s) return res.status(404).json({ error: "not_found" });

  const opening = b.opening === true;
  const message = String(b.message || "").slice(0, 4000).trim();
  if (!opening && !message) return res.status(400).json({ error: "empty" });

  // Betalingsmur. Åpningshilsenen er gratis.
  if (!opening && repliesLeft(s) <= 0) {
    return res.status(402).json({ error: "payment_required", freeLimit: FREE_LIMIT });
  }

  if (!opening) s.turns.push({ role: "user", content: message });

  try {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Accel-Buffering", "no");
    // Måleren skal komme fra serveren, ikke fra nettleserens eget regnestykke.
    const left = isPaid(s) ? -1 : Math.max(0, repliesLeft(s) - (opening ? 0 : 1));
    res.setHeader("X-Free-Left", String(left));
    res.setHeader("Access-Control-Expose-Headers", "X-Free-Left");

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: buildSystem(s),
      thinking: { type: "adaptive" },
      output_config: { effort: "low" },
      messages: s.turns.slice(-40)
    });

    let full = "";
    stream.on("text", (d) => { full += d; res.write(d); });
    await stream.finalMessage();

    if (full) {
      s.turns.push({ role: "assistant", content: full });
      if (!opening) s.used = (s.used || 0) + 1;
      writeSession(code, s);
    }
    res.end();
  } catch (e) {
    console.error("chat-feil:", e && e.message);
    if (!res.headersSent) res.status(500).json({ error: "model_error" });
    else res.end();
  }
});

// Sende koden på e-post. Krever SMTP i env.
app.post("/api/session/:code/email", async (req, res) => {
  const code = String(req.params.code || "").toUpperCase();
  const to = String((req.body || {}).email || "").trim();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to) || to.length > 200) return res.status(400).json({ error: "bad_email" });
  const s = readSession(code);
  if (!s) return res.status(404).json({ error: "not_found" });
  if (!process.env.PARPRATEN_SMTP_HOST) return res.status(503).json({ error: "no_mail" });
  try {
    const nodemailer = (await import("nodemailer")).default;
    const tx = nodemailer.createTransport({
      host: process.env.PARPRATEN_SMTP_HOST,
      port: Number(process.env.PARPRATEN_SMTP_PORT || 587),
      secure: String(process.env.PARPRATEN_SMTP_SECURE || "") === "true",
      auth: process.env.PARPRATEN_SMTP_USER
        ? { user: process.env.PARPRATEN_SMTP_USER, pass: process.env.PARPRATEN_SMTP_PASS } : undefined
    });
    await tx.sendMail({
      from: process.env.PARPRATEN_SMTP_FROM || "Parpraten <ikke-svar@parpraten.no>",
      to,
      subject: "Koden til chatten din",
      text: "Hei.\n\nHer er koden du bruker for å fortsette chatten på parpraten.no:\n\n    " + code +
            "\n\nGå inn på https://parpraten.no, velg \"Jeg har en kode\" og skriv den inn.\n\n" +
            "Ta vare på denne e-posten. Koden er den eneste veien tilbake til chatten.\n\nParpraten\n"
    });
    s.email = to; writeSession(code, s);
    res.json({ ok: true });
  } catch (e) {
    console.error("e-post-feil:", e && e.message);
    res.status(500).json({ error: "send_failed" });
  }
});

// Start et abonnement.
app.post("/api/checkout", async (req, res) => {
  if (!stripe || !STRIPE_PRICE) return res.status(503).json({ error: "no_payment" });
  const code = String((req.body || {}).code || "").toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  const s2 = readSession(code);
  if (!s2) return res.status(404).json({ error: "not_found" });
  if (isPaid(s2)) return res.json({ already: true });

  try {
    const cs = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE, quantity: 1 }],
      client_reference_id: code,
      metadata: { code },
      subscription_data: { metadata: { code } },
      customer_email: s2.email || undefined,
      locale: "nb",
      success_url: BASE_URL + "/?betalt=" + code,
      cancel_url: BASE_URL + "/?avbrutt=1"
    });
    res.json({ url: cs.url });
  } catch (e) {
    console.error("checkout-feil:", e && e.message);
    res.status(500).json({ error: "checkout_failed" });
  }
});

// La brukeren si opp eller bytte kort.
app.post("/api/portal", async (req, res) => {
  if (!stripe) return res.status(503).json({ error: "no_payment" });
  const code = String((req.body || {}).code || "").toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  const s2 = readSession(code);
  if (!s2 || !s2.stripeCustomer) return res.status(404).json({ error: "not_found" });
  try {
    const p = await stripe.billingPortal.sessions.create({
      customer: s2.stripeCustomer,
      return_url: BASE_URL + "/?betalt=" + code
    });
    res.json({ url: p.url });
  } catch (e) {
    console.error("portal-feil:", e && e.message);
    res.status(500).json({ error: "portal_failed" });
  }
});

// Slett alle data for en kode.
app.delete("/api/session/:code", (req, res) => {
  const code = String(req.params.code || "").toUpperCase();
  if (!CODE_RE.test(code)) return res.status(400).json({ error: "bad_code" });
  const s = readSession(code);
  if (!s) return res.status(404).json({ error: "not_found" });
  try { fs.unlinkSync(fileFor(code)); } catch (e) {}
  console.log("slettet sesjon", code);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Parpraten kjører på http://localhost:" + PORT + "  (modell: " + MODEL + ", gratis: " + FREE_LIMIT + ")");
});
