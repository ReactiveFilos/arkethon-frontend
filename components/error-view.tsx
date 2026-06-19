import { Typography } from "@/components/typography";

export function ErrorView({
  title = "Oops!",
  message = "An error occurred while loading this page.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 pr-14">
      <Typography
        className="mb-4 font-bold"
        color="muted-foreground"
        variant="h1"
      >
        {title}
      </Typography>
      <Typography color="muted-foreground">{message}</Typography>
      <Typography color="muted-foreground">Please try again later.</Typography>
    </div>
  );
}
