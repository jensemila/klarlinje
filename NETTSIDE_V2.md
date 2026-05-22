# Klarlinje — Nettside v2: Plan og struktur

> Dette dokumentet er brifen for neste versjon av nettsiden. Målet er én ting: få folk til å melde seg på ventelisten. Alt annet er støy.

---

## Hva nettsiden må gjøre

En retreat til 15 000 kr selges ikke med informasjon. Den selges med tillit, identitet og bevis.

Besøkende stiller tre ubevisste spørsmål:
1. **Er dette for meg?** (identitet)
2. **Kan jeg stole på dette?** (tillit)
3. **Vil jeg angre hvis jeg ikke gjør det?** (sosial bekreftelse)

Hvert element på siden skal svare på ett av disse.

---

## Målgruppe

**Primær:** Høytfungerende nordmenn, 28–45 år, Oslo-nære. Har prøvd meditasjon via app. Skeptisk til alternativt. Trener, les bøker, podcaster. Kjenner på at "noe mangler" — men vil ikke kalle det åndelig.

**Sekundær (B2B):** HR-ledere og teamledere i norske bedrifter, 30–50 år. Kjøper lederutvikling. Ser etter noe mer substansielt enn teambuilding med laser-tag.

---

## Url-struktur

```
/                  → Landing (eneste siden som teller)
/om                → Om Jens + filosofi
/retreat           → Detaljside for retreaten (program, praktisk, pris)
/bedrift           → B2B-side (lederutvikling, gruppepriser, søknadsskjema)
/bekreft           → Opt-in bekreftelse (teknisk)
/avmeld            → Avmelding (teknisk)
/personvern        → GDPR (teknisk)
/takk              → Etter signup (teknisk)
```

---

## Landingssiden: seksjon for seksjon

### 0. Navigasjon (sticky, minimal)

```
Klarlinje          [Om]  [Retreaten]  [Bedrift]  [Bli med på ventelisten →]
```

- Ingen dropdown, ingen hamburgermeny på desktop
- CTA-knappen i navigasjonen er alltid synlig
- På mobil: logo + hamburger med tre lenker + CTA

---

### 1. Hero

**Mål:** Gjør det umiddelbart klart hvem dette er for og hva det er.

**Struktur:**
- Liten label øverst: `Son Spa · Høsten 2026 · 15 plasser`
- H1 (stor, rolig, ikke selgende):
  > «To dager uten støy.»
  eller
  > «En helg du faktisk kommer hjem fra uthvilt.»
- Underoverskrift (2 setninger):
  > For deg som allerede vet at du trenger mer ro — men som aldri har funnet et format som faktisk funker. Klarlinje er et sekulært, evidensbasert retreat for høytfungerende voksne.
- CTA: `Meld deg på ventelisten` (ikke "kjøp", ikke "book")
- Liten tekst under knappen: `Gratis å melde seg på. Ingen spam. Du velger selv om du vil delta.`

**Bilde/visuelt:**
- Stort hero-bilde: natur (vann, skog, morgen) — ikke folk i sirkel med lukkede øyne
- Alternativ: kort stillhetsvideo (ingen lyd, ingen tekst) som bakgrunn

---

### 2. Problemet (uten å kalle det et problem)

**Mål:** Gjenkjennelse. Besøkende skal tenke "dette er meg."

**Format:** 3–4 korte setninger med mye luft mellom seg.

> Du presterer. Du leverer. Du er ikke utbrent — men du er heller ikke helt til stede.
>
> Du har prøvd meditasjon. Det funker, litt, noen dager. Men du finner aldri roen som varer.
>
> En helg hjelper ikke, tenker du. Kanskje. Men ikke en vanlig helg.

**Ingen bilder her. Kun tekst og luft.**

---

### 3. Hva Klarlinje er

**Mål:** Konkret beskrivelse. Ikke mystisk, ikke selgende.

**Format:** 3 kolonner (desktop) / 3 kort (mobil)

```
◎ Meditasjon          ◈ Bevegelse           ◇ Restitusjon
──────────────        ──────────────        ──────────────
Guidede økter         Rolig trening og      Badstue, søvn,
basert på             bevegelse som         måltider. Ikke
forskning, ikke       forbereder kroppen    aktiviteter for
tradisjon.            på stillhet.          aktivitetenes skyld.
```

Under: én setning om Son Spa og hva stedet tilbyr.

---

### 4. Troverdighet — Hvem er Jens?

**Mål:** Tillit. Besøkende må vite hvem som leder dette.

**Format:** Bilde av Jens (ikke profesjonelt headshot — naturlig, i bevegelse eller stillhet) + tekst

**Tekst:**
> Jeg har meditert i over ti år og undervist på folkehøgskole i fire. Jeg er ikke guru. Jeg er ikke munk. Jeg er en person som har funnet ut hva som faktisk virker — og vil dele det i et format uten svada.
>
> Jeg tar en master i [fagfelt] og skriver bok om evidensbasert ro og prestasjon. Klarlinje er stedet der teori møter praksis.

**Under bildet:** 3 faktabokser
```
10+ år         4 år            0
meditasjon     folkehøgskole   chakra
```

---

### 5. Programoversikt

**Mål:** Konkretiser opplevelsen. Fjern usikkerhet.

**Format:** Enkel dag-for-dag oversikt (ikke timesplan, det er for tidlig)

```
Fredag kveld
Ankomst til Son Spa. Første felles økt. Middag.

Lørdag
Meditasjon morgen og kveld. Bevegelse. Måltider. Badstue.
Stille perioder. Ingen telefon mellom øktene.

Søndag formiddag
Avsluttende økt. Felles lunsj. Avreise.
```

**Under:** `Full program sendes til påmeldte. Pris: 15 000 kr inkl. overnatting og mat.`

---

### 6. Stedet — Son Spa

**Mål:** Selg omgivelsene. Luksus uten å skrike luksus.

**Format:** Stort bilde (Son Spa-foto) + 3–4 setninger

> Son Spa er et 4-stjerners spa-hotell 40 minutter sør for Oslo. Konferansesal med fjordutsikt. Gourmetmåltider inkludert. Badstue og spa som en del av opplevelsen — ikke som et tillegg.
>
> Vi er her fordi stedet gjør halvparten av jobben.

**Eventuelt:** Kart / avstandsinfo

---

### 7. Bevis — hva deltakere sier

**Mål:** Sosial bekreftelse.

**Format (for første retreat):** Sitat fra folk som har deltatt på noe du har ledet tidligere (FHS, kurs, workshops) — eller folk i nettverket som har lest konseptet og reagert.

> «Første gangen på to år jeg faktisk slappet av en hel dag.»
> — Deltaker, Oslo FHS retreat 2024

> «Jeg forventet noe New Age-aktig. Det var det motsatte — konkret, stille, og merkelig effektivt.»
> — Beta-deltaker

**Alternativ hvis ingen sitater ennå:** Legg til et "hvorfor dette funker"-avsnitt med forskning (kortfattet, ikke akademisk).

---

### 8. Videoer

**Mål:** La folk bli kjent med Jens før de melder seg på.

**Format:** 2–3 YouTube-innbygginger

- En lang video (5–15 min): "Hva Klarlinje er og ikke er"
- En kort video (60–90 sek): intro til konseptet
- En kort video: "Hva skjer på en Klarlinje-helg?"

**Label over seksjonen:** `Se det med egne øyne`

---

### 9. FAQ

**Mål:** Fjern de siste hindringene.

**11 spørsmål (prioritert rekkefølge):**

1. Må jeg ha meditert før?
2. Hva koster det, og hva er inkludert?
3. Er dette religiøst eller alternativt?
4. Hva skjer på retreaten? (Kan jeg se programmet?)
5. Hvem deltar? (Passer dette for meg?)
6. Hva med trening?
7. Kan jeg komme alene?
8. Er det Wi-Fi og telefon?
9. Hva er avbestillingsvilkårene?
10. Hva bør jeg pakke?
11. Hvordan er søknadsprosessen?

---

### 10. Siste CTA

**Format:** Mørk bakgrunn (forest-grønn), enkel og rolig

> **Du trenger ikke bestemme deg nå.**
>
> Ventelisten er gratis. Ingen forpliktelse. Vi sender deg mer informasjon og dato — du velger selv om du vil søke om en plass.

`[Meld deg på ventelisten]`

---

## Detaljside: /retreat

For dem som vil vite mer før de melder seg på.

**Innhold:**
- Fullt program (dag for dag, time for time)
- Hva er inkludert (overnatting, mat, spa, aktiviteter)
- Hva er ikke inkludert (reise, alkohol, massasje)
- Pris og betalingsvilkår
- Avbestillingspolicy
- Søknadsprosess (hvorfor søknad og ikke direktekjøp)
- Son Spa: beliggenhet, bilder, kart
- FAQ (utdypet versjon)
- CTA: Meld deg på ventelisten / Søk om plass

---

## B2B-side: /bedrift

**Mål:** Konvertere HR-ledere og teamledere til å booke et grupperetreat.

**Struktur:**

**H1:** `Lederutvikling som faktisk virker.`

**Underoverskrift:**
> En helg på Son Spa for laget ditt. Ikke teambuilding. Ikke foredrag. Et retreat som gir folk tilbake til seg selv — og til hverandre.

**Seksjon 1: Hva bedrifter får**
- Forbedret konsentrasjon og beslutningstaking
- Redusert reaktivitet i stressede situasjoner
- Felles referanseramme for ro og prestasjon
- Noe å snakke om i månedene etterpå

**Seksjon 2: Format**
- 20–40 deltakere
- Fredag kveld til søndag lunsj
- Son Spa (konferansesal + spa + overnatting + mat)
- Tilpasset program på forespørsel

**Seksjon 3: Pris**
> Fra 20 000 kr per person, alt inkludert.
> Budsjetteres som lederutvikling / kompetanseheving.

**Seksjon 4: Om Jens**
(kortversjon, lenke til /om)

**Seksjon 5: Referanser / case**
(legges til etter første B2B-retreat)

**CTA:** Kontaktskjema — ikke venteliste. Navn, bedrift, antall deltakere, ønsket tidspunkt, melding.

---

## Designprinsipper for v2

### Tonalitet
- Rolig, ikke klinisk
- Selvsikker, ikke skrytende
- Konkret, ikke mystisk
- Norsk, ikke oversatt fra engelsk

### Visuelt
- Mye luft. Liten tekst per seksjon.
- Naturbilder: vann, lys, skog — ikke mennesker i yogastillinger
- Portrettbilde av Jens: naturlig, ikke studioshot
- Fargeskala: sand, skoggrønt, terrakotta — ikke hvit-og-blå SaaS

### Typografi
- Overskrifter: rolig og distinkt (nåværende: Syne)
- Brødtekst: leselig og varm (nåværende: Outfit)
- Ingen caps-lock-titler bortsett fra etiketter

### Det som IKKE skal være med
- Ingen chakra, aura, energi, healing
- Ingen stockbilder av noen som mediterer på en strand
- Ingen "transformasjon" eller "reise" som metafor
- Ingen tellerklokke eller kunstig knapphet
- Ingen popup som kommer etter 3 sekunder

---

## Hva som mangler nå (og må lages)

| Element | Status | Kommentar |
|---|---|---|
| Profesjonelt foto av Jens | Mangler | Naturlig setting, ikke studio |
| Son Spa-bilder (med tillatelse) | Mangler | Kontakt Son Spa direkte |
| Deltakersitater | Mangler | Hent fra FHS-deltakere eller betanettverk |
| YouTube-video: "Hva Klarlinje er" | Mangler | Prioritet 1 for innhold |
| Fullt program (skrevet) | Mangler | Kreves for /retreat |
| B2B-referanse | Mangler | Etter første bedriftsretreater |

---

## Prioritert rekkefølge

1. **Skriv copy til landingssiden** (hero, problem, troverdighet, FAQ)
2. **Ta et godt bilde av deg selv** — dette er det viktigste manglende elementet
3. **Lag én YouTube-video** som forklarer konseptet (5–10 min)
4. **Bygg /retreat-siden** — trenger fullt program
5. **Bygg /bedrift-siden** — trenger én B2B-referanse
6. **Hent inn 1–3 sitater** fra folk du har undervist

---

## Oppsummering

> Nettsiden selger ikke retreaten — den selger tilliten til Jens og klarhet i hva dette er. Alt annet følger av det.

---

*Klarlinje · Mai 2026 · Intern arbeidsplan for nettside v2*
