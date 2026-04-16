"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { Bell, BellSlash } from "@phosphor-icons/react";

export function SwapHoverDemo() {
  return (
    <Swap activationMode="hover">
      <SwapOn>
        <Bell className="h-8 w-8" />
      </SwapOn>
      <SwapOff>
        <BellSlash className="h-8 w-8" />
      </SwapOff>
    </Swap>
  );
}
