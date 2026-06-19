import { useQuery } from "@tanstack/react-query";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import { FileTreeFile } from "@/components/ai-elements/file-tree";
import { Typography } from "@/components/typography";
import { network } from "@/lib/network";

export function ElementsSelector({ threadId }: { threadId: string }) {
  const { data: elements, isError } = useQuery({
    ...network.elements.list.queryOptions({
      threadId,
    }),
    enabled: !!threadId,
  });

  if (isError) {
    return (
      <Typography className="px-1.5" color="muted-foreground" variant="body-xs">
        Error loading the thread. Please try again later.
      </Typography>
    );
  }

  if (!elements || elements.length === 0) return null;

  return elements.map((element) => (
    <Link
      className="w-full select-none"
      href={`/s/${element.space_id}/t/${element.thread_id}/e/${element.id}`}
      key={element.id}
    >
      <FileTreeFile
        icon={<FileIcon className="size-4 text-muted-foreground" />}
        name={element.title ?? "Thread element"}
        path={element.id}
      />
    </Link>
  ));
}
