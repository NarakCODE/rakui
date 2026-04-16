"use client";

import * as MentionPrimitive from "@diceui/mention";
import * as React from "react";
import { cn } from "@/lib/utils";

function MentionRoot({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.MentionRoot>) {
  return (
    <MentionPrimitive.MentionRoot
      data-slot="mention-root"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}

function MentionLabel({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.MentionLabel>) {
  return (
    <MentionPrimitive.MentionLabel
      data-slot="mention-label"
      className={cn(
        "text-sm font-medium leading-none text-zinc-950 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

function MentionInput({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.MentionInput>) {
  return (
    <MentionPrimitive.MentionInput
      data-slot="mention-input"
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-zinc-500 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
        className,
      )}
      {...props}
    />
  );
}

function MentionContent({
  className,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.MentionContent>) {
  return (
    <MentionPrimitive.MentionContent
      data-slot="mention-content"
      className={cn(
        "relative z-50 min-w-[var(--dice-anchor-width)] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}

function MentionItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MentionPrimitive.MentionItem>) {
  return (
    <MentionPrimitive.MentionItem
      data-slot="mention-item"
      className={cn(
        "relative flex w-full cursor-default select-none flex-col rounded-sm px-2 py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50",
        className,
      )}
      {...props}
    >
      {children}
    </MentionPrimitive.MentionItem>
  );
}

const MentionPortal = MentionPrimitive.MentionPortal;

export {
  MentionRoot,
  MentionLabel,
  MentionInput,
  MentionPortal,
  MentionContent,
  MentionItem,
};
