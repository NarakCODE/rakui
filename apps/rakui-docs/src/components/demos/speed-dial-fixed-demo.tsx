"use client";

import { Copy, Heart, Plus, ShareNetwork } from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from "@/components/ui/speed-dial";

export function SpeedDialFixedDemo() {
  return (
    <div className="relative h-64 w-full">
      <SpeedDial className="absolute right-4 bottom-4">
        <SpeedDialTrigger className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
          <Plus />
        </SpeedDialTrigger>
        <SpeedDialContent>
          <SpeedDialItem>
            <SpeedDialLabel className="sr-only">Share</SpeedDialLabel>
            <SpeedDialAction onSelect={() => toast.success("Shared")}>
              <ShareNetwork />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel className="sr-only">Copy</SpeedDialLabel>
            <SpeedDialAction onSelect={() => toast.success("Copied")}>
              <Copy />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel className="sr-only">Like</SpeedDialLabel>
            <SpeedDialAction onSelect={() => toast.success("Liked")}>
              <Heart />
            </SpeedDialAction>
          </SpeedDialItem>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
