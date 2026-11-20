import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { routing } from "../../i18n/routing";
import { getStorageUrl } from "@/lib/supabase";
import type {
  AboutContent,
  Experience,
  Project,
  StackGroup,
} from "@/types/content";

/** Cache tag for everything read from Supabase; flushed by /api/revalidate. */
export const CONTENT_TAG = "portfolio-content";

/** Safety net in case a revalidate webhook is missed. */
const REVALIDATE_SECONDS = 60 * 60;

const FALLBACK_LOCALE = routing.defaultLocale;

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Picks the row for `locale`, falling back to the default locale. */
function pickLocale<T extends { locale: string }>(rows: T[], locale: string): T | undefined {
  return rows.find((r) => r.locale === locale) ?? rows.find((r) => r.locale === FALLBACK_LOCALE);
}

interface ExperienceRow {
  key: string;
  company: string;
  tech_stack: string[];
  pdf_path: string | null;
  experience_translations: {
    locale: string;
    period: string;
    title: string;
    location: string | null;
    description: string;
    bullets: string[];
  }[];
}

interface ProjectRow {
  key: string;
  title: string;
  short_title: string | null;
  company: string;
  short_company: string | null;
  tech_stack: string[];
  short_stack: string[];
  play_store_url: string | null;
  app_store_url: string | null;
  logo_path: string | null;
  logo_bg: string | null;
  logo_size: number | null;
  featured: boolean;
  project_translations: {
    locale: string;
    description: string;
    details: string[];
    platform: string | null;
  }[];
}

export const getExperiences = unstable_cache(
  async (locale: string): Promise<Experience[]> => {
    const { data, error } = await getClient()
      .from("experiences")
      .select(
        "key, company, tech_stack, pdf_path, experience_translations(locale, period, title, location, description, bullets)",
      )
      .in("experience_translations.locale", [locale, FALLBACK_LOCALE])
      .order("sort_order")
      .returns<ExperienceRow[]>();
    if (error) throw new Error(`Failed to load experiences: ${error.message}`);

    return data.flatMap((row) => {
      const t = pickLocale(row.experience_translations, locale);
      if (!t) return []; // no usable translation yet: treat as draft
      return [
        {
          key: row.key,
          company: row.company,
          techStack: row.tech_stack,
          pdf: row.pdf_path ? getStorageUrl(row.pdf_path) : undefined,
          period: t.period,
          title: t.title,
          location: t.location ?? undefined,
          description: t.description,
          bullets: t.bullets,
        },
      ];
    });
  },
  ["experiences"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getProjects = unstable_cache(
  async (locale: string): Promise<Project[]> => {
    const { data, error } = await getClient()
      .from("projects")
      .select(
        "key, title, short_title, company, short_company, tech_stack, short_stack, play_store_url, app_store_url, logo_path, logo_bg, logo_size, featured, project_translations(locale, description, details, platform)",
      )
      .in("project_translations.locale", [locale, FALLBACK_LOCALE])
      .order("sort_order")
      .returns<ProjectRow[]>();
    if (error) throw new Error(`Failed to load projects: ${error.message}`);

    return data.flatMap((row) => {
      const t = pickLocale(row.project_translations, locale);
      if (!t) return [];
      const links =
        row.play_store_url || row.app_store_url
          ? {
              playStore: row.play_store_url ?? undefined,
              appStore: row.app_store_url ?? undefined,
            }
          : undefined;
      return [
        {
          key: row.key,
          title: row.title,
          company: row.company,
          techStack: row.tech_stack,
          links,
          logo: row.logo_path ? getStorageUrl(row.logo_path) : undefined,
          logoBg: row.logo_bg ?? undefined,
          logoSize: row.logo_size ?? undefined,
          description: t.description,
          details: t.details,
          platform: t.platform ?? undefined,
          featured: row.featured,
          shortTitle: row.short_title ?? row.title,
          shortCompany: row.short_company ?? row.company,
          shortStack: row.short_stack,
        },
      ];
    });
  },
  ["projects"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

interface LabelRow {
  locale: string;
  label: string;
}

interface EducationRow {
  key: string;
  institution: string;
  degree_title: string | null;
  period: string;
  education_translations: { locale: string; degree: string; field: string | null }[];
}

interface SkillCategoryRow {
  key: string;
  skill_category_translations: LabelRow[];
  skills: { name: string; level: number }[];
}

interface StackGroupRow {
  key: string;
  stack_group_translations: LabelRow[];
  stack_items: { name: string; icon: string | null; icon_size: number | null }[];
}

export const getAboutContent = unstable_cache(
  async (locale: string): Promise<AboutContent> => {
    const db = getClient();
    const locales = [locale, FALLBACK_LOCALE];

    const [edu, certs, skills] = await Promise.all([
      db
        .from("education")
        .select("key, institution, degree_title, period, education_translations(locale, degree, field)")
        .in("education_translations.locale", locales)
        .order("sort_order")
        .returns<EducationRow[]>(),
      db
        .from("certificates")
        .select("name, issuer, year")
        .order("sort_order")
        .returns<{ name: string; issuer: string; year: string }[]>(),
      db
        .from("skill_categories")
        .select("key, skill_category_translations(locale, label), skills(name, level, sort_order)")
        .in("skill_category_translations.locale", locales)
        .order("sort_order")
        .order("sort_order", { referencedTable: "skills" })
        .returns<SkillCategoryRow[]>(),
    ]);
    for (const [name, res] of [["education", edu], ["certificates", certs], ["skills", skills]] as const) {
      if (res.error) throw new Error(`Failed to load ${name}: ${res.error.message}`);
    }

    return {
      education: edu.data!.flatMap((row) => {
        const t = pickLocale(row.education_translations, locale);
        if (!t) return [];
        return [
          {
            key: row.key,
            institution: row.institution,
            degreeTitle: row.degree_title ?? undefined,
            period: row.period,
            degree: t.degree,
            field: t.field ?? undefined,
          },
        ];
      }),
      certificates: certs.data!,
      skills: skills.data!.map((row) => ({
        key: row.key,
        label: pickLocale(row.skill_category_translations, locale)?.label ?? row.key,
        skills: row.skills.map(({ name, level }) => ({ name, level })),
      })),
    };
  },
  ["about"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getTechStack = unstable_cache(
  async (locale: string): Promise<StackGroup[]> => {
    const { data, error } = await getClient()
      .from("stack_groups")
      .select("key, stack_group_translations(locale, label), stack_items(name, icon, icon_size, sort_order)")
      .in("stack_group_translations.locale", [locale, FALLBACK_LOCALE])
      .order("sort_order")
      .order("sort_order", { referencedTable: "stack_items" })
      .returns<StackGroupRow[]>();
    if (error) throw new Error(`Failed to load tech stack: ${error.message}`);

    return data.map((row) => ({
      key: row.key,
      label: pickLocale(row.stack_group_translations, locale)?.label ?? row.key,
      items: row.stack_items.map((it) => ({
        name: it.name,
        icon: it.icon ?? undefined,
        iconSize: it.icon_size ?? undefined,
      })),
    }));
  },
  ["tech-stack"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);
