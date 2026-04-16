"use client";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { useState } from "react";
import { Play, Pause } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function SwapControlledDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Swap swapped={isPlaying}>
        <SwapOn>
          <Pause className="h-8 w-8" />
        </SwapOn>
        <SwapOff>
          <Play className="h-8 w-8" />
        </SwapOff>
      </Swap>
      <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
        Toggle
      </Button>
    </div>
  );
}
