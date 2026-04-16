"use client";

import * as ComboboxPrimitive from "@diceui/combobox";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

function Combobox({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxRoot>) {
  return (
    <ComboboxPrimitive.ComboboxRoot
      data-slot="combobox"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxLabel>) {
  return (
    <ComboboxPrimitive.ComboboxLabel
      data-slot="combobox-label"
      className={cn(
        "text-sm leading-none font-medium text-zinc-950 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxAnchor({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxAnchor>) {
  return (
    <ComboboxPrimitive.ComboboxAnchor
      data-slot="combobox-anchor"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 shadow-xs transition-colors data-focused:ring-1 data-focused:ring-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:data-focused:ring-zinc-300",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxInput({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxInput>) {
  return (
    <ComboboxPrimitive.ComboboxInput
      data-slot="combobox-input"
      className={cn(
        "flex h-9 w-full rounded-md bg-transparent text-base text-zinc-900 placeholder:text-zinc-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-zinc-50 dark:placeholder:text-zinc-400",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxTrigger>) {
  return (
    <ComboboxPrimitive.ComboboxTrigger
      data-slot="combobox-trigger"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-r-md bg-transparent text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-50",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDown className="h-4 w-4" />}
    </ComboboxPrimitive.ComboboxTrigger>
  );
}

function ComboboxContent({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxContent>) {
  return (
    <ComboboxPrimitive.ComboboxContent
      data-slot="combobox-content"
      className={cn(
        "relative z-50 min-w-[var(--dice-anchor-width)] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxEmpty({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxEmpty>) {
  return (
    <ComboboxPrimitive.ComboboxEmpty
      data-slot="combobox-empty"
      className={cn(
        "py-6 text-center text-sm text-zinc-500 dark:text-zinc-400",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>) {
  return (
    <ComboboxPrimitive.ComboboxItem
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ComboboxPrimitive.ComboboxItemIndicator>
          <Check className="h-4 w-4" />
        </ComboboxPrimitive.ComboboxItemIndicator>
      </span>
      {children}
    </ComboboxPrimitive.ComboboxItem>
  );
}

function ComboboxItemText({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItemText>) {
  return (
    <ComboboxPrimitive.ComboboxItemText
      data-slot="combobox-item-text"
      className={cn("truncate", className)}
      {...props}
    />
  );
}

const ComboboxPortal = ComboboxPrimitive.ComboboxPortal;

export {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxTrigger,
};
