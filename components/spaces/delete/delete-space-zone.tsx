import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Typography } from "@/components/typography";
import { Button, ButtonContent, ButtonLoader } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { network } from "@/lib/network";
import { getQueryClient } from "@/lib/tanstack/client";

export function DeleteSpaceZone() {
  const { spaceId } = useParams<{ spaceId: string }>();

  const router = useRouter();

  const queryClient = getQueryClient();

  const {
    mutateAsync: deleteSpace,
    isPending,
    isSuccess,
  } = useMutation({
    ...network.spaces.delete.mutationOptions(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: network.spaces.list.queryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: network.spaces.single.queryOptions({ id: spaceId }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: network.threads.list.queryOptions({ spaceId }).queryKey,
      });

      router.push("/");
    },
    onError: (error) => {
      console.error("Error deleting space:", error);
    },
  });

  return (
    <div className="flex w-full flex-col">
      <Typography
        className="mb-4 ml-0.5 w-full text-left"
        color="destructive"
        variant="h3"
      >
        Danger zone
      </Typography>
      <div className="squircle-4xl flex w-full items-center justify-between rounded-xl border border-destructive/40 bg-accent/35 px-4.25 py-3.5">
        <div className="flex w-full flex-col gap-1.5 truncate">
          <Typography
            className="w-full truncate font-semibold"
            variant="body-sm"
          >
            Delete space
          </Typography>
          <Typography color="muted-foreground" variant="body-sm">
            Deleting a space also deletes all of its threads and their content.
            This action cannot be undone.
          </Typography>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <ButtonContent>
                <TrashIcon />
                Delete space
              </ButtonContent>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete this space?
            </DialogTitle>
            <DialogDescription>
              This will permanently delete the space, its threads and all of
              their content. This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button
                disabled={isPending || isSuccess}
                loading={isPending || isSuccess}
                onClick={() => deleteSpace({ id: spaceId })}
                variant="destructive"
              >
                <ButtonLoader>Deleting...</ButtonLoader>
                <ButtonContent>
                  <TrashIcon />
                  Delete space
                </ButtonContent>
              </Button>
              <DialogClose asChild>
                <Button disabled={isPending || isSuccess} variant="outline">
                  <ButtonContent>Cancel</ButtonContent>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
