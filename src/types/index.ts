export type SkillCategory = 'DEVELOPMENT' | 'TOOLS' | 'CURRENTLY_LEARNING';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  caseStudy?: {
    overview?: string;
    problem?: string;
    solution?: string;
    implementation?: string;
    results?: string;
  };
  category: string;
  coverImage: string;
  gallery?: string[];
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: string;
  date?: string;
  category: string;
  description: string;
  image: string;
  credentialUrl?: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
  description?: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface JourneyEntry {
  id: string;
  dateOrYear: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ValueDriver {
  title: string;
  description: string;
  icon: string;
}

export interface AboutProfile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  photo: string;
  education: string;
  interests: string;
  currentFocus: string;
  publicLocation: string;
  drives: ValueDriver[];
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  published: boolean;
  order: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sub?: string;
  icon: string;
}

export interface SiteSettings {
  id: string;
  siteTitle: string;
  siteDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroRole: string;
  heroDescription: string;
  contactEmail: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  githubUrl?: string;
  footerText: string;
  stats: StatItem[];
  updatedAt: string;
}
