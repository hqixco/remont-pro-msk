import { LandingPage } from "@/components/landing-page";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return <LandingPage content={await getSiteContent()} />;
}
