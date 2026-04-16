"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ActionBarContext = React.createContext<{
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}>({
  open: false,
});

const useActionBar = () => {
  const context = React.useContext(ActionBarContext);
  if (!context) {
    throw new Error("useActionBar must be used within an ActionBar");
  }
  return context;
};

// Action Bar Root
interface ActionBarProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function ActionBar({
  open,
  onOpenChange,
  children,
  className,
}: ActionBarProps) {
  return (
    <ActionBarContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div
          role="toolbar"
          aria-orientation="horizontal"
          className={cn(
            "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-lg border bg-popover p-2 shadow-lg animate-in slide-in-from-bottom-4 fade-in-0 zoom-in-95 duration-200",
            className,
          )}
        >
          {children}
        </div>
      )}
    </ActionBarContext.Provider>
  );
}

// Selection Info
interface ActionBarSelectionProps {
  children: React.ReactNode;
  className?: string;
}

function ActionBarSelection({ children, className }: ActionBarSelectionProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 px-2 text-sm font-medium text-popover-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Separator
interface ActionBarSeparatorProps {
  className?: string;
}

function ActionBarSeparator({ className }: ActionBarSeparatorProps) {
  return (
    <span
      className={cn("h-4 w-px bg-border shrink-0", className)}
      aria-hidden="true"
    />
  );
}

// Group
interface ActionBarGroupProps {
  children: React.ReactNode;
  className?: string;
}

function ActionBarGroup({ children, className }: ActionBarGroupProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="group">
      {children}
    </div>
  );
}

// Item Variants
const actionBarItemVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        destructive: "text-destructive hover:bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Item
interface ActionBarItemProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionBarItemVariants> {
  children: React.ReactNode;
  onSelect?: () => void;
  asChild?: boolean;
}

function ActionBarItem({
  children,
  variant,
  className,
  onSelect,
  asChild = false,
  ...props
}: ActionBarItemProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      type="button"
      className={cn(actionBarItemVariants({ variant }), className)}
      onClick={onSelect}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Close Button
interface ActionBarCloseProps {
  children: React.ReactNode;
  className?: string;
}

function ActionBarClose({ children, className }: ActionBarCloseProps) {
  const { onOpenChange } = useActionBar();

  return (
    <button
      type="button"
      onClick={() => onOpenChange?.(false)}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="Close"
    >
      {children}
    </button>
  );
}

export {
  ActionBar,
  ActionBarSelection,
  ActionBarSeparator,
  ActionBarGroup,
  ActionBarItem,
  ActionBarClose,
  actionBarItemVariants,
};

export type {
  ActionBarProps,
  ActionBarSelectionProps,
  ActionBarSeparatorProps,
  ActionBarGroupProps,
  ActionBarItemProps,
  ActionBarCloseProps,
};
