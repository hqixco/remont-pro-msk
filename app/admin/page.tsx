import { AdminEditor } from "@/components/admin/admin-editor";
import { getSiteContent } from "@/lib/content-store";

export default function AdminPage() {
  return <AdminEditor initialContent={getSiteContent()} />;
}
