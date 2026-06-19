"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with dots";

const chartData = [
  { month: "TypeScript", desktop: 92 },
  { month: "React", desktop: 88 },
  { month: "Node.js", desktop: 75 },
  { month: "CSS", desktop: 80 },
  { month: "Testing", desktop: 65 },
  { month: "DevOps", desktop: 58 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RadarChartDots() {
  return (
    <Card className="border-none px-2 shadow-none">
      <CardContent className="px-2 pb-0">
        <ChartContainer
          className="aspect-square max-h-72 w-full"
          config={chartConfig}
        >
          <RadarChart data={chartData}>
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
