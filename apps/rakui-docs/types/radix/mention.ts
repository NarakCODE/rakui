import type * as React from "react";
import type { PropDef } from "@/components/props-table";

export type RootProps = React.ComponentProps<"div"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type LabelProps = React.ComponentProps<"label"> & {
  asChild?: boolean;
};

export type InputProps = React.ComponentProps<"input"> & {
  asChild?: boolean;
  placeholder?: string;
};

export type PortalProps = {
  children?: React.ReactNode;
  container?: Element | DocumentFragment | null;
};

export type ContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: Event) => void;
  onFocusOutside?: (event: Event) => void;
  onInteractOutside?: (event: Event) => void;
  forceMount?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null | Array<Element | null>;
  collisionPadding?: number | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
};

export type ItemProps = React.ComponentProps<"div"> & {
  value: string;
  asChild?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

export const typeInfo: Record<string, PropDef[]> = {
  RootProps: [
    {
      name: "value",
      type: "string",
      description: "Controlled value of the input.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Default value of the input when uncontrolled.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Callback when the input value changes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the mention input is disabled.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state of the popup.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "false",
      description: "Default open state of the popup when uncontrolled.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Callback when the popup open state changes.",
    },
  ],
  LabelProps: [
    {
      name: "asChild",
      type: "boolean",
      description: "Merge props onto the child element.",
    },
  ],
  InputProps: [
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text for the input.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merge props onto the child element.",
    },
  ],
  PortalProps: [
    {
      name: "container",
      type: "Element | DocumentFragment | null",
      description: "The container element to render the portal into.",
    },
  ],
  ContentProps: [
    {
      name: "asChild",
      type: "boolean",
      description: "Merge props onto the child element.",
    },
    {
      name: "onEscapeKeyDown",
      type: "(event: KeyboardEvent) => void",
      description: "Callback when the escape key is pressed.",
    },
    {
      name: "onPointerDownOutside",
      type: "(event: PointerDownOutsideEvent) => void",
      description: "Callback when a pointer event occurs outside the content.",
    },
    {
      name: "onFocusOutside",
      type: "(event: FocusOutsideEvent) => void",
      description: "Callback when focus moves outside the content.",
    },
    {
      name: "onInteractOutside",
      type: "(event: InteractOutsideEvent) => void",
      description: "Callback when an interaction occurs outside the content.",
    },
    {
      name: "forceMount",
      type: "boolean",
      description: "Force the content to always render.",
    },
    {
      name: "side",
      type: '"top" | "right" | "bottom" | "left"',
      default: '"bottom"',
      description: "The preferred side of the trigger to render against.",
    },
    {
      name: "sideOffset",
      type: "number",
      default: "0",
      description: "The distance in pixels from the trigger.",
    },
    {
      name: "align",
      type: '"start" | "center" | "end"',
      default: '"center"',
      description: "The preferred alignment against the trigger.",
    },
    {
      name: "alignOffset",
      type: "number",
      default: "0",
      description: "An offset in pixels from the alignment.",
    },
    {
      name: "avoidCollisions",
      type: "boolean",
      default: "true",
      description: "Whether to avoid collisions with the viewport.",
    },
  ],
  ItemProps: [
    {
      name: "value",
      type: "string",
      required: true,
      description: "The unique value of the mention item.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merge props onto the child element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the item is disabled.",
    },
    {
      name: "onSelect",
      type: "(value: string) => void",
      description: "Callback when the item is selected.",
    },
  ],
};
