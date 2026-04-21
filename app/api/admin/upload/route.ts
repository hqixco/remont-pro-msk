import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isAuthenticatedAdmin } from "@/lib/admin-auth";
import { uploadCaseImage } from "@/lib/object-storage";

export const runtime = "nodejs";

async function ensureAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAuthenticatedAdmin(session)) {
    return NextResponse.json({ error: "Требуется авторизация." }, { status: 401 });
  }

  return null;
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const files = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length === 0) {
      return NextResponse.json({ error: "Файлы не переданы." }, { status: 400 });
    }

    const urls = await Promise.all(files.map((file) => uploadCaseImage(file)));

    return NextResponse.json({ urls });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Не удалось загрузить изображения.",
      },
      { status: 500 },
    );
  }
}
