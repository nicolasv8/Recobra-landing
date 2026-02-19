-- Referral codes + checkout attribution schema for Recobra

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.normalize_referral_code()
returns trigger
language plpgsql
as $$
begin
  new.code = upper(trim(new.code));
  return new;
end;
$$;

create table if not exists public.referral_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists referral_codes_code_normalized_uidx
  on public.referral_codes ((upper(trim(code))));

create trigger referral_codes_normalize_code
before insert or update on public.referral_codes
for each row
execute function public.normalize_referral_code();

create trigger referral_codes_set_updated_at
before update on public.referral_codes
for each row
execute function public.set_updated_at();

update public.referral_codes
set code = upper(trim(code))
where code <> upper(trim(code));

create table if not exists public.checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  wompi_reference text not null unique,
  cta_source text not null,
  checkout_variant text not null check (checkout_variant in ('standard', 'referral')),
  referral_code_id uuid references public.referral_codes(id),
  referral_code_snapshot text,
  status text not null default 'created' check (status in ('created', 'approved', 'declined', 'voided', 'error')),
  wompi_transaction_id text,
  created_at timestamptz not null default timezone('utc', now()),
  approved_at timestamptz,
  arrived_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists checkout_sessions_referral_code_id_idx
  on public.checkout_sessions (referral_code_id);

create index if not exists checkout_sessions_status_idx
  on public.checkout_sessions (status);

create index if not exists checkout_sessions_created_at_idx
  on public.checkout_sessions (created_at desc);

create trigger checkout_sessions_set_updated_at
before update on public.checkout_sessions
for each row
execute function public.set_updated_at();

create table if not exists public.wompi_webhook_events (
  event_id text primary key,
  event_type text not null,
  signature_valid boolean not null,
  payload jsonb not null,
  received_at timestamptz not null default timezone('utc', now())
);

create index if not exists wompi_webhook_events_received_at_idx
  on public.wompi_webhook_events (received_at desc);

create or replace view public.referral_code_metrics as
select
  rc.id,
  upper(trim(rc.code)) as code,
  rc.is_active,
  count(cs.id) filter (where cs.checkout_variant = 'referral') as valid_attempts,
  count(cs.id) filter (where cs.checkout_variant = 'referral' and cs.status = 'approved') as approved_purchases
from public.referral_codes rc
left join public.checkout_sessions cs
  on cs.referral_code_id = rc.id
group by rc.id, rc.code, rc.is_active;

alter table public.referral_codes enable row level security;
alter table public.checkout_sessions enable row level security;
alter table public.wompi_webhook_events enable row level security;

revoke all on table public.referral_codes from anon, authenticated;
revoke all on table public.checkout_sessions from anon, authenticated;
revoke all on table public.wompi_webhook_events from anon, authenticated;
revoke all on table public.referral_code_metrics from anon, authenticated;
