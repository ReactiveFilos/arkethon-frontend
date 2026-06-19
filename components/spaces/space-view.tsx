"use client";

import { useQuery } from "@tanstack/react-query";
import { SettingsIcon, Users2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ErrorView } from "@/components/error-view";
import { ThreadsView } from "@/components/threads/threads-view";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import { network } from "@/lib/network";
import { getVisibilityIcon } from "@/lib/utils/visibility/get-visibility-icon";

export function SpaceView() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const {
    data: space,
    isLoading,
    isError,
  } = useQuery({
    ...network.spaces.single.queryOptions({
      id: spaceId,
    }),
  });

  if (isLoading) return null;

  if (isError || !space) {
    return <ErrorView message="An error occurred while loading this space." />;
  }

  const isVisibilityShared = space?.visibility === "shared";

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex w-full flex-col gap-1">
        <Typography color="muted-foreground" variant="body-sm">
          Space
        </Typography>
        <div className="flex w-full gap-4">
          <Typography
            className="flex items-center gap-4 text-left text-foreground/90"
            variant="h2"
          >
            {space.name || "Space"}
            {getVisibilityIcon(space.visibility, "size-6 mt-0.5")}
          </Typography>

          <div className="flex items-center gap-1">
            <Link href={`/s/${spaceId}/settings`}>
              <Button size="icon" variant="outline">
                <ButtonContent>
                  <SettingsIcon className="size-4.5!" />
                </ButtonContent>
              </Button>
            </Link>

            {isVisibilityShared && (
              <Button size="icon" variant="outline">
                <ButtonContent>
                  <Users2Icon />
                </ButtonContent>
              </Button>
            )}
          </div>
        </div>
      </div>

      <ThreadsView />
    </div>
  );
}
