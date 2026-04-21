import type { SiteContent } from "@/types/site-content";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { ContactsSection } from "@/components/sections/contacts-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadMagnetSection } from "@/components/sections/lead-magnet-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { QuizSection } from "@/components/sections/quiz-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { YouTubeSection } from "@/components/sections/youtube-section";
import { QuickEstimateWidget } from "@/components/widgets/quick-estimate-widget";

export function LandingPage({ content }: { content: SiteContent }) {
  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(171,132,83,0.18),_transparent_34%),linear-gradient(180deg,_#fcfaf7_0%,_#f3ece3_56%,_#ede4d8_100%)]">
      <HeroSection priceBadge={content.hero.priceBadge} />
      <BenefitsSection />
      <LeadMagnetSection />
      <QuizSection content={content.quiz} />
      <ProjectsSection content={content.projects} />
      <TestimonialsSection />
      <YouTubeSection />
      <ContactsSection />
      <FooterSection />
      <QuickEstimateWidget />
    </main>
  );
}
