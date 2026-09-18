export interface Project {
  id?: string;
  title_es: string;
  title_en: string;
  title_et: string;
  description_short_es: string;
  description_short_en: string;
  description_short_et: string;
  description_long_es: string;
  description_long_en: string;
  description_long_et: string;
  image_url: string;
  github_url: string;
  live_url: string;
  stack: string[] | string;
  category: string;
  created_at?: string;
}

export interface Skill {
  id?: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  order: number;
}

export interface ExperienceItem {
  id?: string;
  company: string;
  company_logo?: string;
  role_es: string;
  role_en: string;
  role_et: string;
  description_es: string;
  description_en: string;
  description_et: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string;
  employment_type?: string;
  work_mode?: string;
  stack?: string[] | string;
}

export interface EducationItem {
  id?: string;
  institution: string;
  institution_logo?: string;
  degree_es: string;
  degree_en: string;
  degree_et: string;
  field_of_study?: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  credential_id?: string;
  credential_url?: string;
  description_es?: string;
  description_en?: string;
  description_et?: string;
  stack?: string[] | string;
}

export interface PageContent {
  id?: string;
  key: string;
  content_es: string;
  content_en: string;
  content_et: string;
}

export interface CVFile {
  id?: string;
  lang: string;
  file_url: string;
  updated_at: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}
