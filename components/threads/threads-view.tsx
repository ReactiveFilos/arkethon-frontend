"use client";

import { useQuery } from "@tanstack/react-query";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ErrorView } from "@/components/error-view";
import { CreateThreadForm } from "@/components/threads/create/create-thread-form";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import { network } from "@/lib/network";
import { getVisibilityIcon } from "@/lib/utils/visibility/get-visibility-icon";
import { getVisibilityLabel } from "@/lib/utils/visibility/get-visibility-label";

export function ThreadsView() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const { data: space } = useQuery({
    ...network.spaces.single.queryOptions({
      id: spaceId,
    }),
  });

  const {
    data: threads,
    isLoading,
    isError,
  } = useQuery({
    ...network.threads.list.queryOptions({
      spaceId,
    }),
  });

  if (isLoading) return null;

  if (isError) {
    return (
      <ErrorView message="An error occurred while loading this space's threads." />
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <Typography
          className="mb-4 ml-0.5 w-full text-left text-foreground/90"
          variant="h3"
        >
          Create your first{" "}
          <span className="font-semibold text-foreground">thread</span>
        </Typography>
        <CreateThreadForm />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <Typography
        className="mb-4 ml-0.5 w-full text-left text-foreground/90"
        variant="h3"
      >
        Threads
      </Typography>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {threads.map((thread) => {
          const visibilityLabel = getVisibilityLabel(thread?.visibility);

          const VisibilityIcon = getVisibilityIcon(
            thread.visibility === "inherit"
              ? space?.visibility
              : thread?.visibility
          );

          return (
            <Link
              className="w-full cursor-pointer"
              href={`/s/${thread.space_id}/t/${thread.id}`}
              key={thread.id}
            >
              <div className="squircle-4xl flex w-full items-center gap-4 rounded-xl border border-input/40 bg-accent/35 px-3.5 py-3 hover:border-input/60 hover:bg-accent/50">
                <Button
                  className="border-0 hover:bg-background dark:hover:bg-input/30"
                  size="square"
                  variant="outline"
                >
                  <ButtonContent>
                    <FolderIcon className="size-4 text-blue-500" />
                  </ButtonContent>
                </Button>
                <div className="flex w-full flex-col gap-1 truncate">
                  <Typography
                    className="w-full truncate font-semibold"
                    variant="body-sm"
                  >
                    {thread.title || "Thread"}
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
        className="mt-12 mb-4 ml-0.5 w-full text-left text-foreground/90"
        variant="h3"
      >
        Create a <span className="text-foreground">thread</span>
      </Typography>
      <CreateThreadForm />
    </div>
  );
}
