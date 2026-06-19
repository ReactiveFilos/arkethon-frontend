"use client";

import {
  EditIcon,
  HardDriveDownloadIcon,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RadarChartDots } from "@/components/radar-chart/radar-chart";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
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
      <SidebarHeader className="gap-0 bg-background px-5 py-4">
        <Link href="/">
          <Typography variant="body-md">Arke Companion</Typography>
        </Link>
        <Typography
          className="font-mono text-gray-600 dark:text-gray-400"
          variant="body-sm"
        >
          Empower your path with a best friend.
        </Typography>
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-background px-0 py-0">
        <div className="flex w-full flex-col gap-2 px-3 py-3.5">
          <Link href="/actions">
            <Button
              className="h-auto w-full justify-start px-2 py-1"
              variant="ghost"
            >
              <ButtonContent>
                <HardDriveDownloadIcon /> Tamagochi
              </ButtonContent>
            </Button>
          </Link>
          <Link href="/cv">
            <Button
              className="h-auto w-full justify-start px-2 py-1"
              variant="ghost"
            >
              <ButtonContent>
                <EditIcon /> CV
              </ButtonContent>
            </Button>
          </Link>
        </div>
        <RadarChartDots />
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
