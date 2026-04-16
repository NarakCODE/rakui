import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Avatar variants
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-background transition-transform hover:z-10 hover:scale-105",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    AvatarVariants {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// AvatarGroup variants
const avatarGroupVariants = cva("flex items-center", {
  variants: {
    orientation: {
      horizontal: "[&>*]:-ml-2 [&>*]:first:ml-0",
      vertical: "flex-col [&>*]:-mt-2 [&>*]:first:mt-0",
    },
    size: {
      xs: "[&>[data-slot='avatar']]:h-6 [&>[data-slot='avatar']]:w-6",
      sm: "[&>[data-slot='avatar']]:h-8 [&>[data-slot='avatar']]:w-8",
      md: "[&>[data-slot='avatar']]:h-10 [&>[data-slot='avatar']]:w-10",
      lg: "[&>[data-slot='avatar']]:h-12 [&>[data-slot='avatar']]:w-12",
      xl: "[&>[data-slot='avatar']]:h-16 [&>[data-slot='avatar']]:w-16",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type AvatarGroupVariants = VariantProps<typeof avatarGroupVariants>;

interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AvatarGroupVariants {
  max?: number;
  renderOverflow?: (count: number) => React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      className,
      max,
      orientation = "horizontal",
      size = "md",
      children,
      renderOverflow,
      ...props
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children);

    const showOverflow = max !== undefined && childrenArray.length > max;
    const visibleChildren = showOverflow
      ? childrenArray.slice(0, max)
      : childrenArray;
    const overflowCount = showOverflow ? childrenArray.length - max : 0;

    const isRTL = typeof document !== "undefined" && document.dir === "rtl";
    const finalOrientation = isRTL && orientation === "horizontal" 
      ? "horizontal" 
      : orientation;

    return (
      <div
        ref={ref}
        data-slot="avatar-group"
        data-orientation={finalOrientation}
        className={cn(avatarGroupVariants({ orientation, size, className }))}
        {...props}
      >
        {visibleChildren}
        {overflowCount > 0 &&
          (renderOverflow ? (
            renderOverflow(overflowCount)
          ) : (
            <div
              className={cn(
                "relative flex shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground",
                size === "xs" && "h-6 w-6 text-[10px]",
                size === "sm" && "h-8 w-8 text-xs",
                size === "md" && "h-10 w-10 text-sm",
                size === "lg" && "h-12 w-12 text-base",
                size === "xl" && "h-16 w-16 text-lg",
              )}
            >
              +{overflowCount}
            </div>
          ))}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants, avatarGroupVariants };
export type { AvatarProps, AvatarGroupProps };
