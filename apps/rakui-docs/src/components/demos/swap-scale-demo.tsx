"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { Heart } from "@phosphor-icons/react";

export function SwapScaleDemo() {
  return (
    <Swap animation="scale">
      <SwapOn>
        <Heart className="h-8 w-8 fill-red-500 text-red-500" />
      </SwapOn>
      <SwapOff>
        <Heart className="h-8 w-8" />
      </SwapOff>
    </Swap>
  );
}
