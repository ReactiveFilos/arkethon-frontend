"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const defaultClassNames: NonNullable<
  Partial<React.ComponentProps<typeof DayPicker>["classNames"]>
> = {
  day_button:
    "relative flex size-full outline outline-background outline-6 outline-offset-[-4px] cursor-pointer items-center justify-center whitespace-nowrap p-0 transition-200 hover:not-in-data-selected:bg-accent hover:not-in-data-selected:text-accent-foreground focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50 group-data-selected:group-data-outside:text-primary-foreground group-data-disabled:pointer-events-none group-data-selected:bg-primary group-data-disabled:text-foreground/30 group-data-outside:text-foreground/30 group-data-selected:text-primary-foreground",
  day: "group size-14 text-base shrink-0 min-w-14",
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "w-full",
        month_caption:
          "relative mx-10 mb-6 flex h-8 items-center justify-center z-20",
        caption_label: "text-xl font-medium",
        nav: "absolute top-0 flex w-full justify-between z-10 px-2",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "p-0 text-muted-foreground/80 hover:text-foreground"
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "p-0 text-muted-foreground/80 hover:text-foreground"
        ),
        weekday: "size-8 p-0 text-sm font-medium text-muted-foreground/80",
        day_button: cn(defaultClassNames.day_button, classNames?.day_button),
        day: cn(defaultClassNames.day, classNames?.day),
        range_start: "range-start",
        range_end: "range-end",
        range_middle: "range-middle",
        today:
          "*:after:pointer-events-none *:after:absolute *:after:bottom-3 *:after:start-1/2 *:after:z-10 *:after:size-[4px] *:after:-translate-x-1/2 rtl:*:after:translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
        outside:
          "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
        hidden: "invisible",
        week_number: "size-8 p-0 text-xs font-medium text-muted-foreground/80",
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 rtl:rotate-180" />;
          }
          return <ChevronRight className="h-4 w-4 rtl:rotate-180" />;
        },
      }}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      {...props}
    />
  );
}

export { Calendar };
