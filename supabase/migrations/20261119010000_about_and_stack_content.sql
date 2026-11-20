-- About page (education, certificates, skill bars) and home tech-stack badges.
-- Same pattern as 20261119000000: translated labels live in *_translations, 'en' is the fallback.

-- ── Education ─────────────────────────────────────────────────────────────────
create table public.education (
  key          text primary key,
  sort_order   int  not null default 0,
  institution  text not null,
  degree_title text,                            -- e.g. "S.Kom"
  period       text not null,                   -- e.g. "2012 — 2019"
  published    boolean not null default true,
  created_at   timestamptz not null default now()
);

create table public.education_translations (
  education_key text not null references public.education (key) on update cascade on delete cascade,
  locale        text not null check (locale in ('en', 'id', 'ja')),
  degree        text not null,                  -- e.g. "Bachelor Degree"
  field         text,                           -- e.g. "Computer Science"
  primary key (education_key, locale)
);

-- ── Certificates (not translated) ─────────────────────────────────────────────
create table public.certificates (
  id         bigint generated always as identity primary key,
  sort_order int  not null default 0,
  name       text not null,
  issuer     text not null,
  year       text not null,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  unique (name, issuer)
);

-- ── Skills: About page bars ───────────────────────────────────────────────────
create table public.skill_categories (
  key        text primary key,
  sort_order int not null default 0,
  published  boolean not null default true
);

create table public.skill_category_translations (
  category_key text not null references public.skill_categories (key) on update cascade on delete cascade,
  locale       text not null check (locale in ('en', 'id', 'ja')),
  label        text not null,
  primary key (category_key, locale)
);

create table public.skills (
  id           bigint generated always as identity primary key,
  category_key text not null references public.skill_categories (key) on update cascade on delete cascade,
  sort_order   int  not null default 0,
  name         text not null,
  level        int  not null check (level between 0 and 100),
  published    boolean not null default true,
  unique (category_key, name)
);

-- ── Tech stack: home page icon badges ─────────────────────────────────────────
create table public.stack_groups (
  key        text primary key,
  sort_order int not null default 0,
  published  boolean not null default true
);

create table public.stack_group_translations (
  group_key text not null references public.stack_groups (key) on update cascade on delete cascade,
  locale    text not null check (locale in ('en', 'id', 'ja')),
  label     text not null,
  primary key (group_key, locale)
);

create table public.stack_items (
  id         bigint generated always as identity primary key,
  group_key  text not null references public.stack_groups (key) on update cascade on delete cascade,
  sort_order int  not null default 0,
  name       text not null,
  icon       text,                              -- react-icons name, must be listed in TechStackSection's iconMap
  icon_size  int,                               -- px; defaults to 16
  published  boolean not null default true,
  unique (group_key, name)
);

-- ── Access: public read-only ──────────────────────────────────────────────────
alter table public.education                   enable row level security;
alter table public.education_translations      enable row level security;
alter table public.certificates                enable row level security;
alter table public.skill_categories            enable row level security;
alter table public.skill_category_translations enable row level security;
alter table public.skills                      enable row level security;
alter table public.stack_groups                enable row level security;
alter table public.stack_group_translations    enable row level security;
alter table public.stack_items                 enable row level security;

grant select on public.education, public.education_translations, public.certificates,
                public.skill_categories, public.skill_category_translations, public.skills,
                public.stack_groups, public.stack_group_translations, public.stack_items
  to anon, authenticated;

create policy "Published education is public"
  on public.education for select to anon, authenticated using (published);
create policy "Translations of published education are public"
  on public.education_translations for select to anon, authenticated
  using (exists (select 1 from public.education e where e.key = education_key and e.published));

create policy "Published certificates are public"
  on public.certificates for select to anon, authenticated using (published);

create policy "Published skill categories are public"
  on public.skill_categories for select to anon, authenticated using (published);
create policy "Skill category labels are public"
  on public.skill_category_translations for select to anon, authenticated using (true);
create policy "Published skills are public"
  on public.skills for select to anon, authenticated using (published);

create policy "Published stack groups are public"
  on public.stack_groups for select to anon, authenticated using (published);
create policy "Stack group labels are public"
  on public.stack_group_translations for select to anon, authenticated using (true);
create policy "Published stack items are public"
  on public.stack_items for select to anon, authenticated using (published);
