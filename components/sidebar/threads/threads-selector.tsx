import { useQuery } from "@tanstack/react-query";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FileTree,
  FileTreeFile,
  FileTreeFolder,
} from "@/components/ai-elements/file-tree";
import { ElementsSelector } from "@/components/sidebar/elements/elements-selector";
import { Typography } from "@/components/typography";
import { Button, ButtonContent } from "@/components/ui/button";
import { network } from "@/lib/network";

export function ThreadsSelector() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-2 px-3 py-3.5">
        <Typography
          className="px-1.5"
          color="muted-foreground"
          variant="body-sm"
        >
          Threads
        </Typography>
        <NewThreadButton />
      </div>
      <ThreadsList />
    </div>
  );
}

function NewThreadButton() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const canCreateThread = !!spaceId;

  if (!canCreateThread) {
    return (
      <Button
        className="h-auto w-full justify-start px-2 py-1"
        disabled
        variant="ghost"
      >
        <ButtonContent>
          <Edit /> New thread
        </ButtonContent>
      </Button>
    );
  }

  return (
    <Link className="w-full" href={`/s/${spaceId}`}>
      <Button className="h-auto w-full justify-start px-2 py-1" variant="ghost">
        <ButtonContent>
          <Edit /> New thread
        </ButtonContent>
      </Button>
    </Link>
  );
}

function ThreadsList() {
  const { spaceId, threadId, elementId } = useParams<{
    spaceId: string;
    threadId?: string;
    elementId?: string;
  }>();

  const router = useRouter();

  const { data: threads, isError } = useQuery({
    ...network.threads.list.queryOptions({
      spaceId,
    }),
    enabled: !!spaceId,
  });

  const [manualExpanded, setManualExpanded] = useState<Set<string>>(
    new Set(threadId && elementId ? [threadId] : [])
  );

  if (!spaceId) {
    return (
      <Typography
        className="px-4.5 py-3"
        color="muted-foreground"
        variant="body-xs"
      >
        Select a space to create and view threads.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography
        className="px-4.5 py-3"
        color="muted-foreground"
        variant="body-xs"
      >
        Error loading threads. Please try again later.
      </Typography>
    );
  }

  if (!threads || threads.length === 0) return null;

  const handleSelect = (path: string) => {
    if (path === threadId && !manualExpanded.has(path)) {
      return;
    }

    const thread = threads?.find((t) => t.id === path);
    if (thread) {
      router.push(`/s/${thread.space_id}/t/${thread.id}`);
    }
  };

  const selectedPath =
    elementId && manualExpanded.has(threadId ?? "")
      ? elementId
      : (threadId ?? undefined);

  return (
    <nav className="w-full flex-1 overflow-y-auto py-2">
      <FileTree
        expanded={manualExpanded}
        onExpandedChange={setManualExpanded}
        onSelect={handleSelect}
        selectedPath={selectedPath}
      >
        {threads.map((thread) => (
          <FileTreeFolder
            href={`/s/${thread.space_id}/t/${thread.id}`}
            key={thread.id}
            name={thread.title || "Thread"}
            path={thread.id}
          >
            <ElementsSelector threadId={thread.id} />
            <Link
              className="select-none"
              href={`/s/${thread.space_id}/t/${thread.id}`}
            >
              <FileTreeFile
                className="mb-0.5 text-muted-foreground text-xs"
                icon={<Plus className="size-3.5 text-muted-foreground" />}
                key={`new-element-${thread.id}`}
                name="New"
                path={`new-element-${thread.id}`}
              />
            </Link>
          </FileTreeFolder>
        ))}
      </FileTree>
    </nav>
  );
}
