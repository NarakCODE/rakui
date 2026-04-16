import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export const ButtonGroupContext = React.createContext<any>(null);

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[pressed]:translate-y-px data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 data-[pressed]:bg-primary/90",
        secondary:
          "bg-secondary text-primary hover:bg-secondary/80 data-[pressed]:bg-secondary/80",
        tertiary:
          "bg-muted/40 text-foreground/90 hover:bg-muted/70 hover:text-foreground border border-transparent dark:bg-muted/30 dark:hover:bg-muted/50",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 data-[pressed]:bg-destructive/90",
        "danger-soft":
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 gap-2 px-4 py-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2.5 px-8 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "h-10 w-10 gap-0 p-0 justify-center [&_svg:not([class*='size-'])]:size-4",
      },
      isIconOnly: {
        true: "px-0 aspect-square justify-center",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      { isIconOnly: true, size: "sm", className: "w-8" },
      { isIconOnly: true, size: "md", className: "w-10" },
      { isIconOnly: true, size: "lg", className: "w-12" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      isIconOnly: false,
      fullWidth: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonRootProps extends ButtonPrimitiveProps, ButtonVariants {}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  (
    {
      children,
      className,
      fullWidth,
      isDisabled,
      isIconOnly,
      size,
      style,
      variant,
      ...rest
    },
    ref,
  ) => {
    const buttonGroupContext = React.useContext(ButtonGroupContext);
    const shouldUseContext = buttonGroupContext?.isInButtonGroup === true;

    const finalSize =
      size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
    const finalVariant =
      variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
    const finalIsDisabled =
      isDisabled ??
      (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
    const finalFullWidth =
      fullWidth ??
      (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        isDisabled={finalIsDisabled}
        style={style}
        className={(values) =>
          cn(
            buttonVariants({
              fullWidth: finalFullWidth,
              isIconOnly,
              size: finalSize,
              variant: finalVariant,
            }),
            typeof className === "function" ? className(values) : className,
          )
        }
        {...rest}
      >
        {(renderProps) =>
          typeof children === "function" ? children(renderProps) : children
        }
      </ButtonPrimitive>
    );
  },
);

ButtonRoot.displayName = "ButtonRoot";

export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export type Button = {
  Props: React.ComponentProps<typeof ButtonRoot>;
  RootProps: React.ComponentProps<typeof ButtonRoot>;
};

export { ButtonRoot, buttonVariants };
export type { ButtonRootProps, ButtonRootProps as ButtonProps };
