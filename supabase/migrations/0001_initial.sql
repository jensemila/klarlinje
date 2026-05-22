create table waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  source text,
  created_at timestamptz default now(),
  confirmed_at timestamptz,
  confirmation_token text,
  unsubscribed_at timestamptz,
  unsubscribe_token text not null default gen_random_uuid()::text
);

create table email_campaigns (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body_markdown text not null,
  sent_at timestamptz default now(),
  recipient_count int not null default 0,
  sent_by uuid references auth.users(id)
);

create table email_sends (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references email_campaigns(id) on delete cascade,
  signup_id uuid references waitlist_signups(id) on delete cascade,
  sent_at timestamptz default now(),
  resend_message_id text
);

create index on waitlist_signups (created_at desc);
create index on waitlist_signups (confirmed_at);

-- Row Level Security
alter table waitlist_signups enable row level security;
alter table email_campaigns enable row level security;
alter table email_sends enable row level security;

-- Authenticated admin users can do everything
create policy "admin_all_waitlist" on waitlist_signups
  for all to authenticated using (true) with check (true);

create policy "admin_all_campaigns" on email_campaigns
  for all to authenticated using (true) with check (true);

create policy "admin_all_sends" on email_sends
  for all to authenticated using (true) with check (true);

-- Public API routes use the service role key which bypasses RLS entirely,
-- so no anon insert policy is needed.
