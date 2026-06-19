"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ErrorView } from "@/components/error-view";
import { CreateSpaceForm } from "@/components/spaces/create/create-space-form";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import { network } from "@/lib/network";
import type { Profile } from "@/lib/types/types";
import { getVisibilityIcon } from "@/lib/utils/visibility/get-visibility-icon";
import { getVisibilityLabel } from "@/lib/utils/visibility/get-visibility-label";

export function SpacesView() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    ...network.auth.get_profile.queryOptions(),
  });

  const {
    data: spaces,
    isLoading,
    isError,
  } = useQuery({
    ...network.spaces.list.queryOptions(),
  });

  if (isLoading || isProfileLoading) return null;

  // TODO: handle profile error
  if (isError || isProfileError) {
    return <ErrorView message="An error occurred while loading your spaces." />;
  }

  if (!spaces || spaces.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <Typography
          className="mb-4 ml-0.5 w-full text-left text-foreground/90"
          variant="h3"
        >
          Create your first{" "}
          <span className="font-semibold text-foreground">space</span>
        </Typography>
        <CreateSpaceForm showTemplate />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 flex w-full flex-col gap-1">
        <Typography color="muted-foreground" variant="body-sm">
          Home
        </Typography>
        <div className="flex w-full gap-4">
          <Typography
            className="mb-4 w-full text-left text-foreground/90"
            variant="h2"
          >
            <Header fullname={profile?.full_name} />{" "}
            <span className="text-foreground">spaces</span>
          </Typography>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {spaces.map((space) => {
          const initial = space.name.slice(0, 1).toUpperCase();

          const visibilityLabel = getVisibilityLabel(space?.visibility);
          const VisibilityIcon = getVisibilityIcon(space?.visibility);

          return (
            <Link
              className="w-full cursor-pointer"
              href={`/s/${space.id}`}
              key={space.id}
            >
              <div className="squircle-4xl flex w-full items-center gap-4 rounded-xl border border-input/40 bg-accent/35 px-3.5 py-3 hover:border-input/60 hover:bg-accent/50">
                <Button
                  className="hover:bg-background dark:hover:bg-input/30"
                  size="square"
                  variant="outline"
                >
                  <ButtonContent>{initial || "S"}</ButtonContent>
                </Button>
                <div className="flex w-full flex-col gap-1 truncate">
                  <Typography
                    className="w-full truncate font-semibold"
                    variant="body-sm"
                  >
                    {space.name || "Space"}
                  </Typography>
                  <span className="flex items-center gap-2">
                    {VisibilityIcon && VisibilityIcon}
                    <Typography
                      className="mt-0.5"
                      color="muted-foreground"
                      variant="body-xs"
                    >
                      {visibilityLabel}
                    </Typography>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Typography
        className="mt-10 mb-4 ml-0.5 w-full text-left text-foreground/90"
        variant="h3"
      >
        Create a <span className="text-foreground">space</span>
      </Typography>
      <CreateSpaceForm />
    </div>
  );
}

function Header({
  fullname,
}: {
  fullname: Profile["full_name"] | null | undefined;
}) {
  if (!fullname) return "Your";
  return `${fullname.split(" ")[0]}'s`;
}
