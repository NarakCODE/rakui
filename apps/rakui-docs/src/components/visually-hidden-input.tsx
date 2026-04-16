"use client";

import * as React from "react";

interface VisuallyHiddenInputProps {
  name: string;
  value: string | number;
}

/**
 * A visually hidden input for form submission.
 * Used by form components to submit values without visible UI.
 */
function VisuallyHiddenInput({ name, value }: VisuallyHiddenInputProps) {
  return (
    <input
      type="text"
      name={name}
      defaultValue={value}
      tabIndex={-1}
      aria-hidden="true"
      style={{
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    />
  );
}

export { VisuallyHiddenInput };
