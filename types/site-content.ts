export type ActionLink = {
  label: string;
  href: string;
};

export type CompanyContent = {
  name: string;
  tagline: string;
};

export type ContactContent = {
  phone: string;
  phoneRaw: string;
  schedule: string;
  whatsappHref: string;
  whatsappLabel: string;
  telegramHref: string;
  telegramLabel: string;
  maxLabel: string;
  email: string;
  office: string;
};

export type HeroMetric = {
  value: string;
  label: string;
};

export type HeroPriceBadge = {
  line1: string;
  line2: string;
  line3: string;
};

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  headerAction: ActionLink;
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
  metrics: HeroMetric[];
  repeatedOffer: string[];
  priceBadge: HeroPriceBadge;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type BenefitsContent = {
  title: string;
  description: string;
  items: BenefitItem[];
};

export type LeadMagnetContent = {
  title: string;
  description: string;
  items: string[];
};

export type QuizQuestion = {
  id: string;
  title: string;
  options: string[];
};

export type QuizFinal = {
  title: string;
  description: string;
  phonePlaceholder: string;
  contactMethods: string[];
};

export type QuizContent = {
  title: string;
  description: string;
  benefits: string[];
  questions: QuizQuestion[];
  final: QuizFinal;
};

export type ProjectItem = {
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  price: string;
  duration: string;
  format: string;
  scope: string;
  result: string;
  about: string;
  workItems: string[];
  ownerLine: string;
  gallery: string[];
};

export type ProjectsContent = {
  title: string;
  description: string;
  cta: ActionLink;
  items: ProjectItem[];
};

export type TestimonialItem = {
  name: string;
  object: string;
  initial: string;
  quote: string;
};

export type TestimonialsContent = {
  title: string;
  description: string;
  cta: ActionLink;
  items: TestimonialItem[];
};

export type ContactsSectionContent = {
  title: string;
  description: string;
  items: string[];
};

export type FooterContent = {
  subtitle: string;
  policyLabel: string;
  policyHref: string;
};

export type SiteContent = {
  company: CompanyContent;
  contact: ContactContent;
  hero: HeroContent;
  benefits: BenefitsContent;
  leadMagnet: LeadMagnetContent;
  quiz: QuizContent;
  projects: ProjectsContent;
  testimonials: TestimonialsContent;
  contacts: ContactsSectionContent;
  footer: FooterContent;
};

export type EditableSectionKey =
  | "hero"
  | "benefits"
  | "leadMagnet"
  | "quiz"
  | "projects"
  | "testimonials"
  | "contacts"
  | "footer";
