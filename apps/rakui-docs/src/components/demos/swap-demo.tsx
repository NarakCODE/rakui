"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { Moon, Sun } from "@phosphor-icons/react";

export function SwapDemo() {
  return (
    <Swap>
      <SwapOn>
        <Sun className="h-8 w-8" />
      </SwapOn>
      <SwapOff>
        <Moon className="h-8 w-8" />
      </SwapOff>
    </Swap>
  );
}
