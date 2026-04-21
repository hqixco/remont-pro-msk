import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import {
  ADMIN_SESSION_COOKIE,
  isAuthenticatedAdmin,
} from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (isAuthenticatedAdmin(session)) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#111111] px-6 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <AdminLoginForm />
      </div>
    </main>
  );
}
