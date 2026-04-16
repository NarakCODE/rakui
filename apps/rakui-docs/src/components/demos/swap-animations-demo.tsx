"use client";

import {
  Check,
  Moon,
  Pause,
  Play,
  Sun,
  SpeakerHigh,
  SpeakerSlash,
  X,
} from "@phosphor-icons/react";
import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";

export function SwapAnimationsDemo() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="flex flex-col items-center gap-3">
        <Swap
          animation="fade"
          className="size-12 rounded-lg border bg-muted/50"
        >
          <SwapOn>
            <Check className="size-5" />
          </SwapOn>
          <SwapOff>
            <X className="size-5" />
          </SwapOff>
        </Swap>
        <span className="text-center text-muted-foreground text-sm">Fade</span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Swap
          animation="rotate"
          className="size-12 rounded-lg border bg-muted/50"
        >
          <SwapOn>
            <Sun className="size-5" />
          </SwapOn>
          <SwapOff>
            <Moon className="size-5" />
          </SwapOff>
        </Swap>
        <span className="text-center text-muted-foreground text-sm">
          Rotate
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Swap
          animation="flip"
          className="size-12 rounded-lg border bg-muted/50"
        >
          <SwapOn>
            <Play className="size-5" />
          </SwapOn>
          <SwapOff>
            <Pause className="size-5" />
          </SwapOff>
        </Swap>
        <span className="text-center text-muted-foreground text-sm">Flip</span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Swap
          animation="scale"
          className="size-12 rounded-lg border bg-muted/50"
        >
          <SwapOn>
            <SpeakerHigh className="size-5" />
          </SwapOn>
          <SwapOff>
            <SpeakerSlash className="size-5" />
          </SwapOff>
        </Swap>
        <span className="text-center text-muted-foreground text-sm">Scale</span>
      </div>
    </div>
  );
}
