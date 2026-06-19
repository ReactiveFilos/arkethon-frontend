import { cva, type VariantProps } from "class-variance-authority";
import type { JSX, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const typographyVariants = cva("transition-colors", {
  variants: {
    variant: {
      h1: "text-5xl",
      h2: "text-4xl",
      h3: "text-2xl",
      "body-xl": "text-xl",
      "body-lg": "text-lg",
      "body-md": "text-base",
      "body-sm": "text-sm",
      "body-xs": "text-xs",
    },
    color: {
      default: "text-foreground",
      primary: "text-primary",
      "primary-foreground": "text-primary-foreground",
      destructive: "text-destructive",
      "destructive-foreground": "text-destructive-foreground",
      secondary: "text-secondary",
      "secondary-foreground": "text-secondary-foreground",
      accent: "text-accent",
      "accent-foreground": "text-accent-foreground",
      muted: "text-muted",
      "muted-foreground": "text-muted-foreground",
      link: "text-blue-500 underline hover:text-blue-700",
    },
    shadow: {
      true: "text-shadow-2xs",
    },
  },
  defaultVariants: {
    variant: "body-md",
    color: "default",
  },
});

const defaultTags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "body-xl": "p",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "body-xs": "p",
} as const;

export type TypographyColors = VariantProps<typeof typographyVariants>["color"];

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function Typography({
  variant = "body-md",
  color = "default",
  shadow = false,
  children,
  as,
  className,
}: TypographyProps) {
  const Tag = as || (variant && defaultTags[variant]) || "p";

  return (
    <Tag
      className={cn(typographyVariants({ variant, color, shadow }), className)}
    >
      {children}
    </Tag>
  );
}
