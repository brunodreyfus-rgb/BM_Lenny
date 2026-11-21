-- Run in Supabase SQL Editor. Does not alter existing project tables.
create table if not exists public.lenny_families (
 id text primary key, name text not null, formula text not null check(formula in ('FULL','SOIREE','OFFICES')),
 message text not null default '', flags jsonb not null default '{}'::jsonb
);
create table if not exists public.lenny_guests (
 id bigint generated always as identity primary key, family_id text not null references public.lenny_families(id) on delete cascade,
 first_name text not null, last_name text not null, first_norm text not null, last_norm text not null,
 unique(family_id,first_norm,last_norm)
);
create index if not exists lenny_guest_lookup on public.lenny_guests(first_norm,last_norm);
create table if not exists public.lenny_rsvps (
 family_id text not null references public.lenny_families(id) on delete cascade,
 guest_id bigint not null references public.lenny_guests(id) on delete cascade,
 event text not null check(event in ('thursday_morning','thursday_party','friday_dinner','saturday_afternoon')),
 status text not null default 'pending' check(status in ('yes','no','pending')),
 updated_at timestamptz not null default now(),primary key(guest_id,event)
);
alter table public.lenny_families enable row level security;
alter table public.lenny_guests enable row level security;
alter table public.lenny_rsvps enable row level security;
-- No anon/authenticated policies. All data access goes through verified server routes using service role.
