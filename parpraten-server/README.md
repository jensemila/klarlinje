# Parpraten

Samtale-KI for par. Nettleseren snakker med denne serveren, serveren snakker med Claude med nøkkelen din. Brukerne trenger ingen egen Claude.

```
Nettleser  ->  nginx (443)  ->  node server.js (127.0.0.1:3001)  ->  Claude
                                    ^ nøkkelen leses fra /etc/parpraten/env
```

## Oppsett

Samme mønster som robothjelp. Bygg lokalt, send ferdig pakke med rsync, kjør som systemd-tjeneste, hemmeligheter kun i env-fil på serveren.

| | |
|---|---|
| Kode på serveren | `/srv/parpraten` |
| Hemmeligheter | `/etc/parpraten/env` (chmod 600) |
| Tjeneste | `parpraten.service` |
| Port | `127.0.0.1:3001` (robothjelp har 3000) |
| Web | nginx + Let's Encrypt |

## Førstegangs oppsett på serveren

Kjøres én gang, av deg, direkte på serveren. Nøkkelen går aldri gjennom agenten eller git.

```bash
ssh -i ~/.ssh/mediemonitor_hetzner root@167.233.142.138

useradd --system --no-create-home --shell /usr/sbin/nologin parpraten
mkdir -p /srv/parpraten /etc/parpraten

printf 'ANTHROPIC_API_KEY=sk-ant-din-nokkel\n' > /etc/parpraten/env
chmod 600 /etc/parpraten/env

systemctl enable parpraten   # kjør etter første deploy
```

Pek `parpraten.no` og `www.parpraten.no` på `167.233.142.138` før du henter sertifikat.

## Utrulling

Fra din Mac, fra rota av prosjektet:

```bash
./deploy/deploy.sh
```

Den gjør fire ting i rekkefølge: bygger pakken lokalt, rsyncer appen til `/srv/parpraten`, synkroniserer nginx-konfigen og reloader nginx, restarter systemd-tjenesten.

## TLS, én gang

Etter første utrulling:

```bash
certbot --nginx -d parpraten.no -d www.parpraten.no
```

Certbot skriver TLS-blokka inn i nginx-konfigen **på serveren**. Hent den endrede fila tilbake til repoet, ellers overskriver neste utrulling den:

```bash
scp -i ~/.ssh/mediemonitor_hetzner \
  root@167.233.142.138:/etc/nginx/sites-available/parpraten.conf \
  deploy/nginx/parpraten.conf
```

## Betaling med Stripe

Abonnement, 99 kr/mnd. Gratisgrensen telles **på serveren**, per kode, så den kan ikke omgås fra nettleseren.

### Det du må gjøre i Stripe

1. Opprett konto på stripe.com og fullfør bedriftsverifiseringen.
2. Lag et produkt: **Produkter → Legg til produkt**. Navn «Parpraten», tilbakevendende pris **99 NOK per måned**. Kopier pris-ID-en, den ser ut som `price_1AbC...`.
3. Hent API-nøkkelen under **Utviklere → API-nøkler**. Bruk `sk_test_...` mens du tester, `sk_live_...` når du er klar.
4. Sett opp webhook under **Utviklere → Webhooks → Legg til endepunkt**:
   - URL: `https://parpraten.no/api/stripe/webhook`
   - Hendelser: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Kopier signeringshemmeligheten, `whsec_...`

### Det du legger i `/etc/parpraten/env`

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
PARPRATEN_BASE_URL=https://parpraten.no
```

Så `systemctl restart parpraten`. Uten disse er betaling bare skrudd av, og appen svarer pent at det ikke er tilgjengelig ennå.

### Slik henger det sammen

```
Bruker bruker opp 5 gratis svar
   -> /api/chat svarer 402
   -> betalingsveggen -> /api/checkout -> Stripe si betalingsside
   -> Stripe kaller /api/stripe/webhook   (signatur verifiseres)
   -> paid = true lagres på koden
   -> bruker sendes til /?betalt=KODEN og chatter videre
```

Abonnementet knyttes til **koden**, ikke til en innlogging. Sier noen opp i Stripe, kommer `customer.subscription.deleted`, og tilgangen faller tilbake ved periodens slutt via `paidUntil`. Brukeren kan si opp selv gjennom Stripes kundeportal, som `/api/portal` åpner.

### Test før du går live

Bruk testnøkkelen og kortet `4242 4242 4242 4242`, hvilken som helst framtidig utløpsdato og CVC. Sjekk i loggen at det står `betaling registrert for KODE`:

```bash
journalctl -u parpraten -f
```

## Om nginx-konfigen (viktig)

`go.sh` skriver **aldri** over `/etc/nginx/sites-available/parpraten.conf` hvis den allerede inneholder `ssl_certificate`. Grunnen er en feil som traff i praksis: en tidligere versjon skrev alltid en HTTP-only-konfig, som slettet TLS-blokka certbot hadde lagt inn. Uten HTTPS-blokk for parpraten.no faller nginx tilbake til standardsiden, og domenet viste plutselig et annet nettsted.

Blir TLS borte likevel, hentes den tilbake med:

```bash
certbot --nginx -d parpraten.no -d www.parpraten.no    # velg 1, reinstall
```

## Drift

```bash
journalctl -u parpraten -f        # logg
systemctl restart parpraten       # start på nytt
```

## Lagrede chatter og koder

Etter første svar får brukeren en kode, som `ABCD-EFGH-JKLM`. Den vises over chatten, kan kopieres, og kan sendes på e-post. Neste gang velger man «Jeg har en kode fra før» på forsiden og fortsetter der man slapp.

- Chattene ligger i `/var/lib/parpraten/sessions`, **utenfor** appmappa, så en utrulling aldri sletter dem.
- Koden er tolv tegn fra et alfabet uten I, O, 0 og 1, altså 60 bits. Den er ikke mulig å gjette i praksis, og serveren bremser etter 15 forsøk på ti minutter.
- Chatter slettes automatisk etter 90 dager. Endre med `PARPRATEN_KEEP_DAYS` i env-fila.
- **Koden er den eneste nøkkelen til chatten.** Den som har koden, kan lese alt. Det er en bevisst avveining for å slippe innlogging, men si det tydelig til brukerne.

## E-post (valgfritt)

Uten SMTP satt opp svarer serveren at e-post ikke er tilgjengelig, og brukeren får beskjed om å skrive ned koden. Alt annet virker som før. Vil du skru det på, legg dette i `/etc/parpraten/env`:

```
PARPRATEN_SMTP_HOST=smtp.domeneshop.no
PARPRATEN_SMTP_PORT=587
PARPRATEN_SMTP_USER=brukernavn
PARPRATEN_SMTP_PASS=passord
PARPRATEN_SMTP_FROM=Parpraten <ikke-svar@parpraten.no>
```

Så `systemctl restart parpraten`.

## Verdt å vite

- **node_modules sendes ferdig fra Mac-en.** Serveren trenger bare Node-runtime, ingen byggverktøy. Både `express` og `@anthropic-ai/sdk` er ren JavaScript, så det går fint på tvers av macOS og Linux. Legger du senere til en pakke med native binærfiler, må den bygges på Linux i stedet.
- **`proxy_buffering off` i nginx er ikke pynt.** Svarene strømmes ord for ord. Uten den kommer hele svaret i ett jafs til slutt.
- **Modell.** Standard er `claude-opus-5`. Vil du ha raskere og billigere svar, sett `PARPRATEN_MODEL=claude-sonnet-5` i `/etc/parpraten/env`.

## Før ekte brukere slipper til

- **Gratisgrensen er bare et skall.** De fem gratis svarene telles i nettleseren og kan omgås. Ekte betaling trenger innlogging og telling på serveren, og Stripe eller Vipps.
- **Personvern.** Folk deler det aller mest sårbare her. Personvernerklæring, samtykke og sletterutine må på plass.
- **Sikkerhet.** Modellen er instruert til å vise til Mental Helse 116 123 og nødnummer ved vold og selvmordstanker. Test at det faktisk skjer.
