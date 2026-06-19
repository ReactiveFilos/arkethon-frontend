import { CVTextForm } from "@/components/cv/cv-text-form";
import { Typography } from "@/components/typography";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <Typography variant="h3">CV Text</Typography>
      <CVTextForm />
    </div>
  );
}
