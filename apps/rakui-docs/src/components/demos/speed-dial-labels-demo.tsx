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

export function SpeedDialLabelsDemo() {
  return (
    <SpeedDial>
      <SpeedDialTrigger className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
        <Plus />
      </SpeedDialTrigger>
      <SpeedDialContent>
        <SpeedDialItem>
          <SpeedDialLabel>Share</SpeedDialLabel>
          <SpeedDialAction onSelect={() => toast.success("Shared")}>
            <ShareNetwork />
          </SpeedDialAction>
        </SpeedDialItem>
        <SpeedDialItem>
          <SpeedDialLabel>Copy</SpeedDialLabel>
          <SpeedDialAction onSelect={() => toast.success("Copied")}>
            <Copy />
          </SpeedDialAction>
        </SpeedDialItem>
        <SpeedDialItem>
          <SpeedDialLabel>Like</SpeedDialLabel>
          <SpeedDialAction onSelect={() => toast.success("Liked")}>
            <Heart />
          </SpeedDialAction>
        </SpeedDialItem>
      </SpeedDialContent>
    </SpeedDial>
  );
}
