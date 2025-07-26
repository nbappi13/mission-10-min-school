// src/types/ieltsCourse.ts

export interface Medium {
  id: number;
  url: string;
  type: string;
  thumbnail_url: string;
}

export interface Checklist {
  id: number;
  title: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string;
}

export interface CtaText {
  title: string;
  subtitle: string;
  button_text: string;
}

// common section item types
export interface InstructorItem {
  name: string;
  title: string;
  image: string;
}

export interface FeatureItem {
  title: string;
  description?: string;
}

export interface PointerItem {
  point: string;
}


export type SectionItem = InstructorItem | FeatureItem | PointerItem | Record<string, unknown>;

export interface Section {
  id: number;
  type: string;
  title: string;
  description?: string;
  items?: SectionItem[];
}

export interface Data {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: Medium[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}
