import type * as React from "react";
import type { PropDef } from "@/components/props-table";

export type BannerVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "destructive";

export type BannerSide = "top" | "bottom";

export type BannerRenderProps = {
  id: string;
  variant?: BannerVariant;
  dismissible: boolean;
  onClose: () => void;
  onRemove: () => void;
};

export type BannerProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDismiss?: () => void;
  priority?: number;
  dismissible?: boolean;
  duration?: number;
  variant?: BannerVariant;
};

export type BannersProps = {
  children?: React.ReactNode;
  maxVisible?: number;
  side?: BannerSide;
  container?: Element | DocumentFragment | null;
};

export type BannerContentProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export type BannerIconProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export type BannerActionsProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export type BannerCloseProps = React.ComponentProps<"button">;

export const typeInfo: Record<string, PropDef[]> = {
  BannerProps: [
    {
      name: "variant",
      type: '"default" | "info" | "success" | "warning" | "destructive"',
      default: '"default"',
      description: "Visual treatment and live-region urgency for the banner.",
    },
    {
      name: "open",
      type: "boolean",
      description: "Controlled open state for inline or queued banners.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      description: "Initial open state when uncontrolled.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the banner requests to open or close.",
    },
    {
      name: "onDismiss",
      type: "() => void",
      description: "Called after a queued banner is fully dismissed.",
    },
    {
      name: "priority",
      type: "number",
      default: "0",
      description: "Higher-priority banners are inserted ahead of lower-priority ones.",
    },
    {
      name: "dismissible",
      type: "boolean",
      default: "true",
      description: "Whether the banner can be dismissed by the close action.",
    },
    {
      name: "duration",
      type: "number",
      description: "Optional auto-dismiss delay in milliseconds for queued banners.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges banner props into a custom child element.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Banner content or composed banner parts.",
    },
  ],
  BannersProps: [
    {
      name: "maxVisible",
      type: "number",
      default: "1",
      description: "Maximum number of queued banners visible at once.",
    },
    {
      name: "side",
      type: '"top" | "bottom"',
      default: '"top"',
      description: "Screen edge used for queued banners.",
    },
    {
      name: "container",
      type: "Element | DocumentFragment | null",
      description: "Portal container for queued banners.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Nested content with access to `useBanners`.",
    },
  ],
  BannerContentProps: [
    {
      name: "asChild",
      type: "boolean",
      description: "Merges content props into a custom child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the content wrapper.",
    },
  ],
  BannerIconProps: [
    {
      name: "asChild",
      type: "boolean",
      description: "Merges icon props into a custom child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the icon wrapper.",
    },
  ],
  BannerActionsProps: [
    {
      name: "asChild",
      type: "boolean",
      description: "Merges action props into a custom child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the actions row.",
    },
  ],
  BannerCloseProps: [
    {
      name: "aria-label",
      type: "string",
      default: '"Dismiss banner"',
      description: "Accessible name for the icon-only close control.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables the close action.",
    },
  ],
};
