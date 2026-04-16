import type * as React from "react";
import type { PropDef } from "@/components/props-table";

export type BadgeOverflowProps<T = string> = React.ComponentProps<"div"> & {
  /**
   * The array of items to render as badges. Can be primitives or objects.
   */
  items: T[];
  /**
   * Maximum number of lines to display before truncating.
   * @default 1
   */
  lineCount?: number;
  /**
   * Function to render each individual badge.
   * @param item The original item data
   * @param label The extracted label string
   */
  renderBadge: (item: T, label: string) => React.ReactNode;
  /**
   * Optional function to render a custom overflow indicator.
   * @param count The number of hidden items
   */
  renderOverflow?: (count: number) => React.ReactNode;
  /**
   * Callback that returns a label string for each badge item.
   * Required for object arrays, optional for primitive arrays.
   */
  getBadgeLabel?: (item: T) => string;
  /**
   * Whether to merge props onto a custom child element.
   * @default false
   */
  asChild?: boolean;
};

export const typeInfo: Record<string, PropDef[]> = {
  BadgeOverflowProps: [
    {
      name: "items",
      type: "T[]",
      required: true,
      description: "The array of items to render as badges.",
    },
    {
      name: "lineCount",
      type: "number",
      default: "1",
      description: "Maximum number of lines to display before truncating.",
    },
    {
      name: "renderBadge",
      type: "(item: T, label: string) => React.ReactNode",
      required: true,
      description: "Function to render each individual badge.",
    },
    {
      name: "renderOverflow",
      type: "(count: number) => React.ReactNode",
      description: "Function to render the overflow indicator.",
    },
    {
      name: "getBadgeLabel",
      type: "(item: T) => string",
      description:
        "Callback to extract a string label from each item. Required for object arrays.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Merges props onto the child element.",
    },
  ],
};
