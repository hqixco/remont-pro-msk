import { siteContentSeed } from "@/data/site-content";
import type { SiteContent } from "@/types/site-content";

let currentContent: SiteContent = structuredClone(siteContentSeed);

export function getSiteContent(): SiteContent {
  return structuredClone(currentContent);
}

export function setSiteContent(nextContent: SiteContent): SiteContent {
  currentContent = structuredClone(nextContent);
  return getSiteContent();
}

export function resetSiteContent(): SiteContent {
  currentContent = structuredClone(siteContentSeed);
  return getSiteContent();
}
