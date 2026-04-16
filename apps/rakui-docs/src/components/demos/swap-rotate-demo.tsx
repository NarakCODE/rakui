"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

export function SwapRotateDemo() {
  return (
    <Swap animation="rotate">
      <SwapOn>
        <SpeakerHigh className="h-8 w-8" />
      </SwapOn>
      <SwapOff>
        <SpeakerSlash className="h-8 w-8" />
      </SwapOff>
    </Swap>
  );
}
