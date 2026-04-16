"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";

export function SwapFlipDemo() {
  return (
    <Swap animation="flip">
      <SwapOn>
        <ThumbsUp className="h-8 w-8 text-green-500" />
      </SwapOn>
      <SwapOff>
        <ThumbsDown className="h-8 w-8 text-red-500" />
      </SwapOff>
    </Swap>
  );
}
