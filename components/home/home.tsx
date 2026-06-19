import { RadarChartDots } from "@/components/radar-chart/radar-chart";
import { Typography } from "@/components/typography";

export function Home() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <Typography variant="body-md">Arke Companion</Typography>
      <RadarChartDots />
    </div>
  );
}
