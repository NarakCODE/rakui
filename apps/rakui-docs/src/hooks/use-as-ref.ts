"use client";

import * as React from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

export function useAsRef<T>(value: T) {
  const ref = React.useRef<T>(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
