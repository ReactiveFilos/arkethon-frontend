import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { authPermission } from "@/lib/auth";

export async function AppSidebarServer() {
  const { isAuthenticated } = await authPermission("sidebar");

  if (!isAuthenticated) return null;

  return <AppSidebar />;
}
