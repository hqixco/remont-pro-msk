import { NextResponse } from "next/server";
import { getSiteContent, resetSiteContent, setSiteContent } from "@/lib/content-store";
import type { SiteContent } from "@/types/site-content";

export async function GET() {
  return NextResponse.json(getSiteContent());
}

export async function PUT(request: Request) {
  const payload = (await request.json()) as SiteContent;
  return NextResponse.json(setSiteContent(payload));
}

export async function DELETE() {
  return NextResponse.json(resetSiteContent());
}
