import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/admin-editor";
import { ADMIN_SESSION_COOKIE, isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getSiteContent, isPersistentContentStoreEnabled } from "@/lib/content-store";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAuthenticatedAdmin(session)) {
    redirect("/admin/login");
  }

  return (
    <AdminEditor
      initialContent={await getSiteContent()}
      hasPersistentStorage={isPersistentContentStoreEnabled()}
    />
  );
}
