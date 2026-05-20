# Klarlinje

Marketing website with built-in CRM and email sending for the Klarlinje meditation retreat brand.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase · Resend

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values (see below for where to get each).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### 3a. Create a project

Go to [supabase.com](https://supabase.com) → New project. Choose an EU region for GDPR compliance.

### 3b. Get your API keys

Project Settings → API:
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — service_role key (keep this secret — never expose to the browser)

### 3c. Run the migration

Option A — Supabase CLI:
```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

Option B — Supabase dashboard → SQL editor: paste the contents of `supabase/migrations/0001_initial.sql` and run.

### 3d. Create the admin user

Supabase dashboard → Authentication → Users → Add user. Set email + password. This is the only account that can log into `/admin`.

---

## Resend Setup

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your domain (e.g. `klarlinje.no`) — follow their DNS instructions.
3. Create an API key → set as `RESEND_API_KEY`.
4. Set `EMAIL_FROM` to a sender address on your verified domain, e.g. `Klarlinje <hei@klarlinje.no>`.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import on [vercel.com](https://vercel.com).
3. Add all environment variables from `.env.local.example` in Vercel project settings.
4. Set `APP_URL` to your production URL, e.g. `https://klarlinje.no`.
5. Deploy.

---

## Architecture

| Path | What it does |
|---|---|
| `/` | Landing page with waitlist form |
| `/takk` | Thank-you after signup (check email) |
| `/bekreft?token=` | Double opt-in confirmation |
| `/avmeld?token=` | One-click unsubscribe |
| `/om` | About page |
| `/personvern` | GDPR privacy policy |
| `/admin/login` | Admin login (Supabase Auth) |
| `/admin` | Dashboard: signup stats + list + CSV export |
| `/admin/send` | Email composer + campaign sender |

### Data ownership

All data lives in your Supabase Postgres database. No third-party CRM. Emails sent via Resend but the list is yours.

### Email flow

1. User fills in form → `POST /api/signup` → row inserted with `confirmation_token`
2. Confirmation email sent via Resend
3. User clicks link → `GET /api/bekreft?token=` → `confirmed_at` set
4. Only confirmed, non-unsubscribed addresses receive campaigns
5. Every campaign email contains `/avmeld?token={unsubscribe_token}` footer link

---

## Development Notes

- `lib/supabase/admin.ts` uses the service role key — **only use server-side**, never in Client Components.
- `lib/supabase/server.ts` uses the anon key with session cookies — for authenticated server reads.
- `middleware.ts` protects all `/admin/*` routes and refreshes Supabase session cookies.
- `{{name}}` in campaign bodies is replaced per recipient; falls back to `"du"` if no name.
