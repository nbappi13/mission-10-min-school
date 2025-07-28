export interface InstructorData {
  description: string
  has_instructor_page: boolean
  image: string
  name: string
  short_description: string
  slug: string
}

export interface InstructorsSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: InstructorData[]
}

export interface FeatureItem {
  icon: string
  id: string
  subtitle: string
  title: string
}

export interface FeaturesSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: FeatureItem[]
}

export interface PointerItem {
  color: string
  icon: string
  id: string
  text: string
}

export interface PointersSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: PointerItem[]
}

export interface FeatureExplanationItem {
  checklist: string[]
  file_type: string
  file_url: string
  id: string
  title: string
  video_thumbnail: string
}

export interface FeatureExplanationsSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: FeatureExplanationItem[]
}

export interface AboutItem {
  description: string
  icon: string
  id: string
  title: string
}

export interface AboutSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: AboutItem[]
}

export type Section = InstructorsSection | FeaturesSection | PointersSection | FeatureExplanationsSection | AboutSection

export interface ChecklistItem {
  id: string
  icon: string
  text: string
}

export interface CtaText {
  name: string
  value: string
}

export interface MediaItem {
  name: string
  resource_type: string
  resource_value: string
  thumbnail_url?: string
}

export interface ProductData {
  title: string
  description: string
  sections: Section[]
  checklist: ChecklistItem[]
  cta_text: CtaText
  media: MediaItem[]
}

export interface SectionNavItem {
  id: string
  name: string
  type: string
}

// localization types
export type Locale = "en" | "bn"

export interface LocaleConfig {
  code: Locale
  name: string
  flag: string
}

export interface LocalizationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

// component prop interfaces
export interface InstructorsProps {
  instructorsSection: InstructorsSection
}

export interface FeaturesProps {
  featuresSection: FeaturesSection
}

export interface PointersProps {
  pointersSection: PointersSection
}

export interface FeatureExplanationsProps {
  featureExplanationsSection: FeatureExplanationsSection
}

export interface AboutProps {
  aboutSection: AboutSection
}

export interface SectionNavigationProps {
  sections: SectionNavItem[]
}

export interface MediaGalleryProps {
  media: MediaItem[]
}

// skill landing types
export interface TrailerVideo {
  name: string
  resource_type: string
  resource_value: string
  thumbnail_url?: string
}

export interface SkillLandingChecklistItem {
  color: string
  icon: string
  id: string
  list_page_visibility: boolean
  text: string
}

export interface SkillLandingProps {
  title: string
  description: string
  trailerVideo?: TrailerVideo
  ctaText: CtaText
  checklist: SkillLandingChecklistItem[]
}

// legacy types for backward compatibility
export interface Medium {
  id: number
  url: string
  type: string
  thumbnail_url: string
}

export interface Checklist {
  id: number
  title: string
}

export interface Seo {
  title: string
  description: string
  keywords: string
}

export interface Data {
  slug: string
  id: number
  title: string
  description: string
  media: Medium[]
  checklist: Checklist[]
  seo: Seo
  cta_text: CtaText
  sections: Section[]
  name: string
  price: number
  image: string | null
}
