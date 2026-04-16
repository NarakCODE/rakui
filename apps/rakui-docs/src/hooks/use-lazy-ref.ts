"use client";

import * as React from "react";

/**
 * A hook that creates a lazy-initialized ref.
 * The initializer function is only called once, on first access.
 */
export function useLazyRef<T>(initializer: () => T): React.MutableRefObject<T> {
  const ref = React.useRef<T | null>(null);
  
  if (ref.current === null) {
    ref.current = initializer();
  }
  
  return ref as React.MutableRefObject<T>;
}
