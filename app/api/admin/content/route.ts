import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getSiteContent, resetSiteContent, setSiteContent } from "@/lib/content-store";
import type { SiteContent } from "@/types/site-content";

export const runtime = "nodejs";

async function ensureAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAuthenticatedAdmin(session)) {
    return NextResponse.json({ error: "Требуется авторизация." }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  const payload = (await request.json()) as SiteContent;
  return NextResponse.json(await setSiteContent(payload));
}

export async function DELETE() {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;
  return NextResponse.json(await resetSiteContent());
}
