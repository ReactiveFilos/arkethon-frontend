import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  Icon,
  ...props
}: React.ComponentProps<"input"> & { Icon?: LucideIcon }) {
  if (Icon) {
    return (
      <div className="relative">
        <Icon className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
        <input
          className={cn(
            "squircle-3xl h-9 w-full min-w-0 rounded-md border border-input bg-input/5 px-3 py-1 pl-9 text-base outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            className
          )}
          data-slot="input"
          type={type}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      className={cn(
        "squircle-3xl h-9 w-full min-w-0 rounded-md border border-input bg-input/5 px-3 py-1 text-base outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
