-- Portfolio content (experience + projects) with per-locale translations.
-- Language-neutral fields live on the parent table; translated text lives in *_translations,
-- one row per (item, locale). The app falls back to 'en' when a locale row is missing.

-- ── Experience ────────────────────────────────────────────────────────────────
create table public.experiences (
  key         text primary key,
  sort_order  int  not null default 0,          -- ascending; newest job first
  company     text not null,
  platforms   text[] not null default '{}',     -- e.g. {android,iOS}
  framework   text,
  team_size   int,
  tech_stack  text[] not null default '{}',
  pdf_path    text,                             -- path inside the "assets" storage bucket
  published   boolean not null default true,    -- false = draft, hidden from the site
  created_at  timestamptz not null default now()
);

create table public.experience_translations (
  experience_key text not null references public.experiences (key) on update cascade on delete cascade,
  locale         text not null check (locale in ('en', 'id', 'ja')),
  period         text not null,                 -- e.g. "Nov 2023 — Present"
  title          text not null,
  location       text,
  description    text not null,
  bullets        text[] not null default '{}',
  primary key (experience_key, locale)
);

-- ── Projects ──────────────────────────────────────────────────────────────────
create table public.projects (
  key            text primary key,
  sort_order     int  not null default 0,
  title          text not null,
  short_title    text,                          -- home grid card; falls back to title
  company        text not null,
  short_company  text,                          -- home grid card; falls back to company
  tech_stack     text[] not null default '{}',  -- full list on /projects
  short_stack    text[] not null default '{}',  -- the few badges on the home grid
  play_store_url text,
  app_store_url  text,
  logo_path      text,                          -- path inside the "assets" storage bucket
  logo_bg        text,
  logo_size      int,
  featured       boolean not null default true, -- shown on the home grid
  published      boolean not null default true,
  created_at     timestamptz not null default now()
);

create table public.project_translations (
  project_key text not null references public.projects (key) on update cascade on delete cascade,
  locale      text not null check (locale in ('en', 'id', 'ja')),
  description text not null,
  details     text[] not null default '{}',
  platform    text,                             -- e.g. "Android & iOS"
  primary key (project_key, locale)
);

-- ── Access: public read-only; writes only via dashboard / service role ───────
alter table public.experiences            enable row level security;
alter table public.experience_translations enable row level security;
alter table public.projects               enable row level security;
alter table public.project_translations   enable row level security;

grant select on public.experiences, public.experience_translations,
                public.projects, public.project_translations
  to anon, authenticated;

create policy "Published experiences are public"
  on public.experiences for select to anon, authenticated
  using (published);

create policy "Translations of published experiences are public"
  on public.experience_translations for select to anon, authenticated
  using (exists (select 1 from public.experiences e where e.key = experience_key and e.published));

create policy "Published projects are public"
  on public.projects for select to anon, authenticated
  using (published);

create policy "Translations of published projects are public"
  on public.project_translations for select to anon, authenticated
  using (exists (select 1 from public.projects p where p.key = project_key and p.published));
