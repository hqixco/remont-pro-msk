import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  isValidAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    login?: string;
    password?: string;
  };

  if (!isValidAdminCredentials(payload.login ?? "", payload.password ?? "")) {
    return NextResponse.json(
      { error: "Неверный логин или пароль." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
