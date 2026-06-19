import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <span
      className={cn("animate-pulse rounded-md bg-accent/20", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
