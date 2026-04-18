import { LandingPage } from "@/components/landing-page";
import { getSiteContent } from "@/lib/content-store";

export default function HomePage() {
  return <LandingPage content={getSiteContent()} />;
}
