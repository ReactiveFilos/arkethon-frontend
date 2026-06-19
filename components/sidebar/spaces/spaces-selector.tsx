import { useQuery } from "@tanstack/react-query";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { network } from "@/lib/network";
import { cn } from "@/lib/utils";

export function SpacesSelector() {
  return (
    <div className="flex w-full flex-col gap-2 px-4 py-3.5">
      <Typography className="px-0.5" color="muted-foreground" variant="body-sm">
        Spaces
      </Typography>
      <SpacesList />
    </div>
  );
}

function SpacesList() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const {
    data: spaces,
    isLoading,
    isError,
  } = useQuery({
    ...network.spaces.list.queryOptions(),
  });

  if (isLoading) {
    return (
      <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/30 bg-accent/30 px-3 py-2.5">
        <Button disabled size="square" variant="outline" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/30 bg-accent/30 px-3 py-2.5">
        <Typography color="muted-foreground" variant="body-xs">
          Error loading spaces. Please try again later.
        </Typography>
      </div>
    );
  }

  if (!spaces || spaces.length === 0) {
    return (
      <div className="squircle-4xl flex w-full items-center rounded-xl border border-input/40 bg-accent/35 px-3 py-2.5">
        <HomeButton />
      </div>
    );
  }

  return (
    <div className="squircle-4xl flex w-full flex-wrap items-center gap-2.5 rounded-xl border border-input/40 bg-accent/35 px-3 py-2.5">
      <HomeButton />
      {spaces.map((space) => {
        const initial = space.name.slice(0, 1).toUpperCase();
        return (
          <Tooltip delayDuration={800} key={space.id}>
            <TooltipTrigger asChild>
              <Link href={`/s/${space.id}`}>
                <Button
                  className={cn(
                    spaceId === space.id && "ring-1",
                    "select-none"
                  )}
                  size="square"
                  variant="outline"
                >
                  <ButtonContent>{initial || "S"}</ButtonContent>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="bg-accent px-2 py-0.5"
              classNameArrow="bg-accent fill-accent"
              side="top"
              sideOffset={3}
            >
              <Typography variant="body-sm">{space.name || "Space"}</Typography>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

function HomeButton() {
  const pathname = usePathname();
  return (
    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild>
        <Link href="/">
          <Button
            className={cn(pathname === "/" && "ring-1")}
            size="square"
            variant="outline"
          >
            <HomeIcon />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        className="bg-accent px-2 py-0.5"
        classNameArrow="bg-accent fill-accent"
        side="top"
        sideOffset={3}
      >
        <Typography variant="body-sm">Home</Typography>
      </TooltipContent>
    </Tooltip>
  );
}
