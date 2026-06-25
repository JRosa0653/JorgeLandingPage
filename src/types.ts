export interface Project {
  id: string;
  name: string;
  category: string;
  url: string;
  description: string;
  image?: string;
  results?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  feedback: string;
  image: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Matches a Lucide icon string
  features: string[];
  priceRange: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  type: "contact" | "newsletter" | "schedule";
  status: "new" | "contacted" | "archived";
  date: string;
  extraDetails?: string; // E.g., chosen package, sitemap URL, or appointment slot
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  structuredData: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address?: string;
}

export interface LanguageContent {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    activeClients: string;
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraph1: string;
    bioParagraph2: string;
    experienceYears: string;
    projectsCompleted: string;
    clientSatisfaction: string;
  };
  services: {
    title: string;
    subtitle: string;
    priceLabel: string;
    ctaLabel: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    livePreview: string;
    resultsLabel: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    challengeTitle: string;
    solutionTitle: string;
    outcomeTitle: string;
    ctaText: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    writtenBy: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    getInTouch: string;
    directContact: string;
  };
}
