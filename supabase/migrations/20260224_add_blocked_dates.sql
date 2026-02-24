-- Migration: create blocked_dates table
create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null unique,
  created_at timestamptz not null default now()
);

-- Allow anonymous reads so the booking page can fetch blocked dates
alter table public.blocked_dates enable row level security;

create policy "Public can read blocked dates"
  on public.blocked_dates
  for select
  using (true);

-- Allow appointment_time to be NULL (admin assigns it after booking)
alter table public.appointments
  alter column appointment_time drop not null;
