import type * as React from "react";
import type { PropDef } from "@/components/props-table";

export type Direction = "ltr" | "rtl";
export type Orientation = "vertical" | "horizontal";
export type TimelineVariant = "default" | "alternate";
export type TimelineStatus = "completed" | "active" | "pending";

type DivProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export type TimelineProps = DivProps & {
  dir?: Direction;
  orientation?: Orientation;
  variant?: TimelineVariant;
  activeIndex?: number;
};

export type TimelineItemProps = DivProps;

export type TimelineContentProps = DivProps;

export type TimelineDotProps = DivProps;

export type TimelineConnectorProps = DivProps & {
  forceMount?: boolean;
};

export type TimelineTimeProps = React.ComponentProps<"time"> & {
  asChild?: boolean;
};

export const typeInfo: Record<string, PropDef[]> = {
  TimelineProps: [
    {
      name: "orientation",
      type: '"vertical" | "horizontal"',
      default: '"vertical"',
      description: "Controls whether items flow top-to-bottom or left-to-right.",
    },
    {
      name: "variant",
      type: '"default" | "alternate"',
      default: '"default"',
      description:
        "Switches between a single-column flow and an alternating split layout.",
    },
    {
      name: "dir",
      type: '"ltr" | "rtl"',
      description:
        "Overrides the reading direction for connector placement and alternate alignment.",
    },
    {
      name: "activeIndex",
      type: "number",
      description:
        "Marks the active item and derives completed or pending states for the rest of the timeline.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges timeline props into a custom wrapper element.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Timeline items rendered in document order.",
    },
  ],
  TimelineItemProps: [
    {
      name: "id",
      type: "string",
      description:
        "Optional stable identifier used when computing order and connector state.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges item props into a custom wrapper element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the item wrapper.",
    },
  ],
  TimelineConnectorProps: [
    {
      name: "forceMount",
      type: "boolean",
      default: "false",
      description:
        "Keeps the connector mounted for the final item instead of hiding it automatically.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges connector props into a custom element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the connector element.",
    },
  ],
  TimelineTimeProps: [
    {
      name: "dateTime",
      type: "string",
      description:
        "Machine-readable date value announced by assistive technology and parsers.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges time props into a custom element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the rendered time element.",
    },
  ],
};
