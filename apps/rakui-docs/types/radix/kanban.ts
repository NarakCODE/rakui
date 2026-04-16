import type * as React from "react";
import type { PropDef } from "@/components/props-table";
import type { DndContextProps, UniqueIdentifier } from "@dnd-kit/core";
import type { SortableContextProps } from "@dnd-kit/sortable";

export type KanbanProps<T = unknown> = {
  value: Record<UniqueIdentifier, T[]>;
  onValueChange?: (columns: Record<UniqueIdentifier, T[]>) => void;
  onMove?: (
    event: { activeIndex: number; overIndex: number } & Record<string, unknown>
  ) => void;
  getItemValue?: (item: T) => UniqueIdentifier;
  modifiers?: DndContextProps["modifiers"];
  strategy?: SortableContextProps["strategy"];
  orientation?: "horizontal" | "vertical";
  flatCursor?: boolean;
  id?: string;
  accessibility?: DndContextProps["accessibility"];
  autoScroll?: DndContextProps["autoScroll"];
  cancelDrop?: DndContextProps["cancelDrop"];
  children?: React.ReactNode;
  collisionDetection?: DndContextProps["collisionDetection"];
  measuring?: DndContextProps["measuring"];
  onDragStart?: DndContextProps["onDragStart"];
  onDragMove?: DndContextProps["onDragMove"];
  onDragOver?: DndContextProps["onDragOver"];
  onDragEnd?: DndContextProps["onDragEnd"];
  onDragCancel?: DndContextProps["onDragCancel"];
};

export type KanbanBoardProps = {
  children?: React.ReactNode;
  asChild?: boolean;
} & React.ComponentProps<"div">;

export type KanbanColumnProps = {
  value: UniqueIdentifier;
  children?: React.ReactNode;
  disabled?: boolean;
  asHandle?: boolean;
  asChild?: boolean;
} & React.ComponentProps<"div">;

export type KanbanColumnHandleProps = {
  asChild?: boolean;
} & React.ComponentProps<"button">;

export type KanbanItemProps = {
  value: UniqueIdentifier;
  disabled?: boolean;
  asHandle?: boolean;
  asChild?: boolean;
} & React.ComponentProps<"div">;

export type KanbanItemHandleProps = {
  asChild?: boolean;
} & React.ComponentProps<"button">;

export type KanbanOverlayProps = {
  container?: Element | DocumentFragment | null;
  dropAnimation?: unknown;
  children?:
    | React.ReactNode
    | ((params: {
        value: UniqueIdentifier;
        variant: "column" | "item";
      }) => React.ReactNode);
  adjustScale?: boolean;
  transition?: unknown;
  modifiers?: unknown;
  wrapperElement?: keyof React.JSX.IntrinsicElements;
  zIndex?: number;
} & Omit<React.ComponentProps<"div">, "children">;

export const typeInfo: Record<string, PropDef[]> = {
  KanbanProps: [
    {
      name: "value",
      type: "Record<UniqueIdentifier, T[]>",
      description: "The board data structure mapping column IDs to arrays of items.",
    },
    {
      name: "onValueChange",
      type: "(columns: Record<UniqueIdentifier, T[]>) => void",
      description: "Callback when the board state changes.",
    },
    {
      name: "getItemValue",
      type: "(item: T) => UniqueIdentifier",
      description: "Function to extract a unique identifier from each item (required for object arrays).",
    },
    {
      name: "onMove",
      type: "(event: { activeIndex: number; overIndex: number }) => void",
      description: "Custom callback for handling moves with event details.",
    },
    {
      name: "modifiers",
      type: "DndContextProps['modifiers']",
      description: "dnd-kit modifiers for drag behavior.",
    },
    {
      name: "strategy",
      type: "SortableContextProps['strategy']",
      description: "Sorting strategy for dnd-kit.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Layout orientation for columns.",
    },
    {
      name: "flatCursor",
      type: "boolean",
      default: "false",
      description: "Disable grab cursor styling.",
    },
    {
      name: "id",
      type: "string",
      description: "Unique identifier for the dnd context.",
    },
    {
      name: "accessibility",
      type: "DndContextProps['accessibility']",
      description: "Accessibility configuration for dnd-kit.",
    },
    {
      name: "autoScroll",
      type: "DndContextProps['autoScroll']",
      description: "Auto-scroll configuration for dnd-kit.",
    },
    {
      name: "cancelDrop",
      type: "DndContextProps['cancelDrop']",
      description: "Cancel drop configuration for dnd-kit.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Child components (KanbanBoard, KanbanOverlay).",
    },
    {
      name: "collisionDetection",
      type: "CollisionDetection",
      description: "Custom collision detection algorithm.",
    },
    {
      name: "measuring",
      type: "DndContextProps['measuring']",
      description: "Measuring configuration for dnd-kit.",
    },
    {
      name: "onDragStart",
      type: "DndContextProps['onDragStart']",
      description: "Callback when drag starts.",
    },
    {
      name: "onDragMove",
      type: "DndContextProps['onDragMove']",
      description: "Callback when drag moves.",
    },
    {
      name: "onDragOver",
      type: "DndContextProps['onDragOver']",
      description: "Callback when drag moves over a droppable.",
    },
    {
      name: "onDragEnd",
      type: "DndContextProps['onDragEnd']",
      description: "Callback when drag ends.",
    },
    {
      name: "onDragCancel",
      type: "DndContextProps['onDragCancel']",
      description: "Callback when drag is cancelled.",
    },
  ],
  KanbanBoardProps: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Child KanbanColumn components.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  KanbanColumnProps: [
    {
      name: "value",
      type: "UniqueIdentifier",
      description: "Unique identifier for the column.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Child KanbanItem components.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable dragging for this column.",
    },
    {
      name: "asHandle",
      type: "boolean",
      default: "false",
      description: "Use the entire column as a drag handle.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  KanbanColumnHandleProps: [
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the handle.",
    },
  ],
  KanbanItemProps: [
    {
      name: "value",
      type: "UniqueIdentifier",
      description: "Unique identifier for the item.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable dragging for this item.",
    },
    {
      name: "asHandle",
      type: "boolean",
      default: "false",
      description: "Use the entire item as a drag handle.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
  ],
  KanbanItemHandleProps: [
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge props onto child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable the handle.",
    },
  ],
  KanbanOverlayProps: [
    {
      name: "container",
      type: "Element | DocumentFragment | null",
      default: "document.body",
      description: "Portal container element.",
    },
    {
      name: "dropAnimation",
      type: "DropAnimation",
      description: "Animation configuration for drop.",
    },
    {
      name: "children",
      type: "React.ReactNode | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => React.ReactNode)",
      description: "Content to render in the overlay, or a function receiving the dragged item info.",
    },
    {
      name: "adjustScale",
      type: "boolean",
      description: "Adjust scale of the overlay.",
    },
    {
      name: "transition",
      type: "unknown",
      description: "Transition configuration.",
    },
    {
      name: "modifiers",
      type: "unknown",
      description: "Modifiers for drag behavior.",
    },
    {
      name: "wrapperElement",
      type: "keyof React.JSX.IntrinsicElements",
      description: "Wrapper element type.",
    },
    {
      name: "zIndex",
      type: "number",
      description: "Z-index for the overlay.",
    },
  ],
};
