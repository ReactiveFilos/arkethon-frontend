"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, Users2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ErrorView } from "@/components/error-view";
import { DeleteSpaceZone } from "@/components/spaces/delete/delete-space-zone";
import { EditSpaceForm } from "@/components/spaces/edit/edit-space-form";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import { network } from "@/lib/network";
import { getVisibilityIcon } from "@/lib/utils/visibility/get-visibility-icon";

export function SpaceSettingsView() {
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
    <>
      <Link className="group self-start" href={`/s/${spaceId}`}>
        <Button
          className="text-muted-foreground hover:text-foreground"
          size="fit"
          variant="transparent"
        >
          <ArrowLeftIcon />
          <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-xs group-hover:opacity-100">
            Space
          </span>
        </Button>
      </Link>
      <div className="mt-6 flex w-full flex-col gap-1">
        <Typography color="muted-foreground" variant="body-sm">
          Settings
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

      <div className="my-12 flex flex-col">
        <Typography
          className="mb-4 ml-0.5 w-full text-left text-foreground/90"
          variant="h3"
        >
          Edit <span className="text-foreground">space</span>
        </Typography>
        <EditSpaceForm />
      </div>
      <DeleteSpaceZone />
    </>
  );
}
