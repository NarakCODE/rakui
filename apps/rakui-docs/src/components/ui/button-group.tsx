import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  ButtonGroupContext,
  buttonVariants,
  type ButtonVariants,
} from "@/components/ui/button";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!",
      },
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
        outline: "",
        ghost: "",
        danger: "",
        "danger-soft": "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonGroupProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof buttonGroupVariants>,
    Pick<ButtonVariants, "variant" | "size"> {
  isDisabled?: boolean;
}

function ButtonGroup({
  className,
  orientation,
  variant,
  size,
  isDisabled,
  children,
  ...props
}: ButtonGroupProps) {
  const contextValue = React.useMemo(
    () => ({ variant, size, isDisabled, isInButtonGroup: true }),
    [variant, size, isDisabled],
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(
          buttonGroupVariants({ orientation, variant, size }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

interface ButtonGroupTextProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: ButtonGroupTextProps) {
  const Comp = asChild ? Slot.Root : "div";
  const context = React.useContext(ButtonGroupContext);
  const variant = context?.variant ?? "primary";
  const isInButtonGroup = context?.isInButtonGroup ?? false;

  const variantStyles: Record<string, string> = {
    primary:
      "bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30",
    secondary:
      "bg-secondary/50 text-primary border-secondary dark:bg-secondary/30",
    tertiary:
      "bg-muted/40 text-foreground/90 border-muted dark:bg-muted/30 dark:border-muted/60",
    outline: "bg-background text-foreground border-input dark:bg-input/20",
    ghost: "bg-muted/30 text-foreground/80 border-transparent dark:bg-muted/20",
    danger:
      "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:border-destructive/30",
    "danger-soft":
      "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:border-destructive/30",
  };

  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className,
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
export type { ButtonGroupProps, ButtonGroupTextProps };
