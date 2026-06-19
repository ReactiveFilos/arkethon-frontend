import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="fixed top-0 z-10 flex max-h-14 min-h-14 w-full flex-1 items-center gap-5 bg-transparent px-3">
          <SidebarTrigger />
        </div>
        <div className="mx-auto mt-14 max-w-7xl flex-1 px-6 pb-4 lg:px-24 xl:px-32 2xl:px-40">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
