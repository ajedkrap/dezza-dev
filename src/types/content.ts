/** Content stored in Supabase, already resolved to a single locale. */

export interface Experience {
  key: string;
  company: string;
  techStack: string[];
  pdf?: string;
  period: string;
  title: string;
  location?: string;
  description: string;
  bullets: string[];
}

export interface StoreLinks {
  playStore?: string;
  appStore?: string;
}

export interface Project {
  key: string;
  title: string;
  company: string;
  techStack: string[];
  links?: StoreLinks;
  logo?: string;
  logoBg?: string;
  logoSize?: number;
  description: string;
  details: string[];
  platform?: string;
  /** Home grid card variant */
  featured: boolean;
  shortTitle: string;
  shortCompany: string;
  shortStack: string[];
}
