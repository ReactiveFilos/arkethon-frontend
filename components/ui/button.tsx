import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon, type LucideProps } from "lucide-react";
import * as React from "react";
import {
  Typography,
  type TypographyColors,
  type TypographyProps,
} from "@/components/typography";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "squircle-3xl inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 dark:hover:bg-destructive/55",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-300",
        transparent: "bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "squircle-3xl h-8 gap-1.5 rounded-lg px-3 has-[>svg]:px-2.5",
        lg: "squircle-3xl h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        fit: "",
        square: "aspect-square h-10 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonVariantToTypographyColor: Record<
  NonNullable<VariantProps<typeof buttonVariants>["variant"]>,
  TypographyColors
> = {
  default: "primary-foreground",
  destructive: "destructive-foreground",
  outline: "primary",
  secondary: "secondary-foreground",
  ghost: "accent-foreground",
  link: "primary",
  blue: "primary-foreground",
  transparent: "accent-foreground",
};

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const ButtonContext = React.createContext<{
  loading?: boolean;
  typographyColor: TypographyColors;
} | null>(null);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const typographyColor = buttonVariantToTypographyColor[variant ?? "default"];

  return (
    <ButtonContext.Provider value={{ typographyColor, loading }}>
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        data-slot="button"
        {...props}
      />
    </ButtonContext.Provider>
  );
}

function useButton() {
  const context = React.useContext(ButtonContext);
  if (!context) {
    throw new Error("ButtonText must be used within a Button component.");
  }

  return context;
}

interface ButtonLoaderProps extends Omit<TypographyProps, "as" | "children"> {
  children?: React.ReactNode;
  LoaderIcon?: LucideIcon;
  iconClassName?: LucideProps["className"];
}

const ButtonLoader = ({
  children,
  LoaderIcon = Loader2,
  iconClassName,
  ...typographyProps
}: ButtonLoaderProps) => {
  const { loading, typographyColor } = useButton();

  if (!loading) return null;

  return (
    <Typography
      as="span"
      className={cn("flex items-center gap-2", typographyProps.className)}
      color={typographyProps.color || typographyColor}
      variant={typographyProps.variant || "body-sm"}
      {...typographyProps}
    >
      <LoaderIcon className={cn("animate-spin", iconClassName)} />
      {children}
    </Typography>
  );
};

const ButtonContent = ({
  children,
  ...typographyProps
}: Omit<TypographyProps, "as">) => {
  const { loading, typographyColor } = useButton();

  if (loading) return null;

  return (
    <Typography
      as="span"
      className={cn("flex items-center gap-2", typographyProps.className)}
      color={typographyProps.color || typographyColor}
      variant={typographyProps.variant || "body-sm"}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export { buttonVariants, Button, ButtonLoader, ButtonContent };
