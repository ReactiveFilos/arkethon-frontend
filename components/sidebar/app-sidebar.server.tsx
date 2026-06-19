import { getServerSession } from "next-auth";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { authOptions } from "@/lib/arke/auth";

export async function AppSidebarServer() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return <AppSidebar />;
}
