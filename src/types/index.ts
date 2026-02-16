// Blog post types
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  coverOg: string;
  tags: string[];
  videos?: string[];
  content: string;
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  tags: string[];
  readingTime: number;
}

// Gallery types
export interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryVideo {
  mp4: string;
  webm?: string;
  poster: string;
  alt: string;
}

export interface BookProject {
  id: string;
  titleKey: string; // Translation key
  images: GalleryImage[];
  videos?: GalleryVideo[];
  decorImages?: string[];
}

// Service types
export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  nameKey: string;
  companyKey: string;
  textKey: string;
  avatar?: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// i18n types
export type Locale = 'en' | 'sk' | 'ru' | 'ua';
