import type * as React from "react";
import type { PropDef } from "@/components/props-table";

export type AngleSliderProps = {
  asChild?: boolean;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  size?: number;
  thickness?: number;
  startAngle?: number;
  endAngle?: number;
  dir?: "ltr" | "rtl";
  form?: string;
  name?: string;
  disabled?: boolean;
  inverted?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export type AngleSliderTrackProps = React.ComponentProps<"svg">;

export type AngleSliderRangeProps = React.ComponentProps<"path">;

export type AngleSliderThumbProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  index?: number;
};

export type AngleSliderValueProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  unit?: string;
  formatValue?: (value: number | number[]) => string;
};

export const typeInfo: Record<string, PropDef[]> = {
  AngleSliderProps: [
    {
      name: "value",
      type: "number[]",
      description: "Controlled angle value or values for range mode.",
    },
    {
      name: "defaultValue",
      type: "number[]",
      default: "[0]",
      description: "Initial angle value or values when uncontrolled.",
    },
    {
      name: "onValueChange",
      type: "(value: number[]) => void",
      description: "Called whenever the current value changes.",
    },
    {
      name: "onValueCommit",
      type: "(value: number[]) => void",
      description: "Called when a pointer or keyboard interaction is committed.",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum allowed value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum allowed value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Increment applied to pointer and keyboard updates.",
    },
    {
      name: "minStepsBetweenThumbs",
      type: "number",
      default: "0",
      description: "Minimum number of steps required between thumbs.",
    },
    {
      name: "size",
      type: "number",
      default: "60",
      description: "Radius used to render the circular track.",
    },
    {
      name: "thickness",
      type: "number",
      default: "8",
      description: "Stroke width for the track and selected range.",
    },
    {
      name: "startAngle",
      type: "number",
      default: "-90",
      description: "Starting angle of the track in degrees.",
    },
    {
      name: "endAngle",
      type: "number",
      default: "270",
      description: "Ending angle of the track in degrees.",
    },
    {
      name: "dir",
      type: '"ltr" | "rtl"',
      description: "Text direction used for keyboard interactions.",
    },
    {
      name: "form",
      type: "string",
      description: "Associates hidden inputs with a specific form.",
    },
    {
      name: "name",
      type: "string",
      description: "Base name used for hidden form inputs.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables pointer and keyboard interactions.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Reverses the direction of value progression around the track.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges props into the child element instead of rendering a div.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the root element.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Composed angle slider parts.",
    },
  ],
  AngleSliderTrackProps: [
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the SVG track element.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      description: "Usually contains `AngleSliderRange`.",
    },
  ],
  AngleSliderRangeProps: [
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the selected range arc.",
    },
  ],
  AngleSliderThumbProps: [
    {
      name: "index",
      type: "number",
      default: "0",
      description: "Value index controlled by this thumb.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges thumb props into a custom child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the thumb.",
    },
  ],
  AngleSliderValueProps: [
    {
      name: "unit",
      type: "string",
      default: '"°"',
      description: "Suffix added to displayed values when `formatValue` is not provided.",
    },
    {
      name: "formatValue",
      type: "(value: number | number[]) => string",
      description: "Custom formatter for the displayed angle value.",
    },
    {
      name: "asChild",
      type: "boolean",
      description: "Merges value props into a custom child element.",
    },
    {
      name: "className",
      type: "string",
      description: "Applies custom classes to the value label.",
    },
  ],
};
