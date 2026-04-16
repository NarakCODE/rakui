import type * as React from "react";
import type { DndContextProps, UniqueIdentifier } from "@dnd-kit/core";
import type { SortableContextProps } from "@dnd-kit/sortable";

import type { PropDef } from "@/components/props-table";

export type SortableProps<T = unknown> = {
  value: T[];
  onValueChange?: (items: T[]) => void;
  onMove?: (
    event: { activeIndex: number; overIndex: number } & Record<string, unknown>
  ) => void;
  getItemValue?: (item: T) => UniqueIdentifier;
  strategy?: SortableContextProps["strategy"];
  orientation?: "vertical" | "horizontal" | "mixed";
  flatCursor?: boolean;
  id?: string;
  accessibility?: DndContextProps["accessibility"];
  autoScroll?: DndContextProps["autoScroll"];
  cancelDrop?: DndContextProps["cancelDrop"];
  children?: React.ReactNode;
  collisionDetection?: DndContextProps["collisionDetection"];
  measuring?: DndContextProps["measuring"];
  modifiers?: DndContextProps["modifiers"];
  sensors?: DndContextProps["sensors"];
  onDragStart?: DndContextProps["onDragStart"];
  onDragMove?: DndContextProps["onDragMove"];
  onDragOver?: DndContextProps["onDragOver"];
  onDragEnd?: DndContextProps["onDragEnd"];
  onDragCancel?: DndContextProps["onDragCancel"];
};

export type SortableContentProps = React.ComponentProps<"div"> & {
  strategy?: SortableContextProps["strategy"];
  children?: React.ReactNode;
  asChild?: boolean;
  withoutSlot?: boolean;
};

export type SortableItemProps = React.ComponentProps<"div"> & {
  value: UniqueIdentifier;
  asHandle?: boolean;
  asChild?: boolean;
  disabled?: boolean;
};

export type SortableItemHandleProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
};

export type SortableOverlayProps = {
  container?: Element | DocumentFragment | null;
  children?:
    | React.ReactNode
    | ((params: { value: UniqueIdentifier }) => React.ReactNode);
  adjustScale?: boolean;
  dropAnimation?: unknown;
  modifiers?: unknown;
  transition?: unknown;
  wrapperElement?: keyof React.JSX.IntrinsicElements;
  zIndex?: number;
} & Omit<React.ComponentProps<"div">, "children">;

export const typeInfo: Record<string, PropDef[]> = {
  SortableProps: [
    {
      name: "value",
      type: "T[]",
      description: "Ordered list of sortable items.",
    },
    {
      name: "onValueChange",
      type: "(items: T[]) => void",
      description: "Called with the reordered list after a successful drop.",
    },
    {
      name: "getItemValue",
      type: "(item: T) => UniqueIdentifier",
      description:
        "Required for object arrays so the component can derive a stable sortable id.",
    },
    {
      name: "onMove",
      type: "(event: { activeIndex: number; overIndex: number }) => void",
      description:
        "Intercepts reordering with both source and target indexes when you want custom move handling.",
    },
    {
      name: "strategy",
      type: "SortableContextProps['strategy']",
      description: "Overrides the sorting strategy used by the content area.",
    },
    {
      name: "orientation",
      type: '"vertical" | "horizontal" | "mixed"',
      default: '"vertical"',
      description:
        "Applies axis restrictions and default collision detection for the sortable area.",
    },
    {
      name: "flatCursor",
      type: "boolean",
      default: "false",
      description: "Disables grab cursor styling on draggable elements.",
    },
    {
      name: "modifiers",
      type: "DndContextProps['modifiers']",
      description: "Custom dnd-kit modifiers for drag movement.",
    },
    {
      name: "sensors",
      type: "DndContextProps['sensors']",
      description:
        "Overrides the default mouse, touch, and keyboard sensors used by the component.",
    },
    {
      name: "collisionDetection",
      type: "DndContextProps['collisionDetection']",
      description: "Overrides the default collision detection algorithm.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description:
        "Expected children are SortableContent and an optional SortableOverlay.",
    },
  ],
  SortableContentProps: [
    {
      name: "strategy",
      type: "SortableContextProps['strategy']",
      description: "Overrides the sorting strategy for this content wrapper.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merges props into a custom wrapper element.",
    },
    {
      name: "withoutSlot",
      type: "boolean",
      default: "false",
      description:
        "Skips rendering the wrapper element and returns the children directly.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the content wrapper.",
    },
  ],
  SortableItemProps: [
    {
      name: "value",
      type: "UniqueIdentifier",
      description: "Unique identifier for the sortable item.",
    },
    {
      name: "asHandle",
      type: "boolean",
      default: "false",
      description:
        "Turns the entire item into the drag activator instead of using a separate handle.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merges item props into a custom element.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables dragging for the item.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the item wrapper.",
    },
  ],
  SortableItemHandleProps: [
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merges handle props into a custom button element.",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Disables the handle and prevents drag activation.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes for the handle element.",
    },
  ],
  SortableOverlayProps: [
    {
      name: "container",
      type: "Element | DocumentFragment | null",
      description:
        "Optional portal container for the drag overlay. Defaults to document.body after mount.",
    },
    {
      name: "children",
      type: "React.ReactNode | ((params: { value: UniqueIdentifier }) => React.ReactNode)",
      description:
        "Overlay content or a render function that receives the currently active item id.",
    },
    {
      name: "dropAnimation",
      type: "DropAnimation",
      description: "Overrides the default overlay drop animation.",
    },
    {
      name: "zIndex",
      type: "number",
      description: "Controls the overlay stacking order.",
    },
  ],
};
