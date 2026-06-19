"use client";

import { LogOutIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SpacesSelector } from "@/components/sidebar/spaces/spaces-selector";
import { ThreadsSelector } from "@/components/sidebar/threads/threads-selector";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-0 bg-background px-0 py-0">
        <SpacesSelector />
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-background px-0 py-0">
        <ThreadsSelector />
      </SidebarContent>
      <SidebarFooter className="flex max-h-14 min-h-14 flex-row items-center justify-between gap-2 bg-background px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild id="profile-menu-trigger">
            <Button
              id="profile-menu-trigger-button"
              size="icon"
              variant="ghost"
            >
              <User2Icon />
              <span className="sr-only">Profile</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.push("/logout")}>
              <LogOutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
