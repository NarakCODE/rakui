"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

interface DataGridKeyboardShortcutsProps {
  enableSearch?: boolean;
}

export function DataGridKeyboardShortcuts({
  enableSearch = true,
}: DataGridKeyboardShortcutsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ShortcutSection title="Navigation">
            <ShortcutItem
              keys={["↑", "↓", "←", "→"]}
              description="Move between cells"
            />
            <ShortcutItem
              keys={["Tab"]}
              description="Move to next cell (Shift+Tab for previous)"
            />
            <ShortcutItem keys={["Enter"]} description="Edit cell / Confirm edit" />
            <ShortcutItem keys={["Escape"]} description="Cancel edit" />
          </ShortcutSection>

          <ShortcutSection title="Editing">
            <ShortcutItem
              keys={["Cmd", "Enter"]}
              description="Add new row"
            />
            <ShortcutItem
              keys={["Cmd", "Backspace"]}
              description="Delete current row"
            />
            <ShortcutItem
              keys={["Delete"]}
              description="Clear cell content"
            />
          </ShortcutSection>

          {enableSearch && (
            <ShortcutSection title="Search">
              <ShortcutItem
                keys={["Cmd", "F"]}
                description="Open search dialog"
              />
              <ShortcutItem
                keys={["Enter"]}
                description="Next match (in search)"
              />
              <ShortcutItem
                keys={["Shift", "Enter"]}
                description="Previous match (in search)"
              />
            </ShortcutSection>
          )}

          <ShortcutSection title="Selection">
            <ShortcutItem
              keys={["Space"]}
              description="Toggle row selection"
            />
            <ShortcutItem
              keys={["Cmd", "A"]}
              description="Select all rows"
            />
            <ShortcutItem
              keys={["Shift", "Click"]}
              description="Select range of rows"
            />
          </ShortcutSection>

          <ShortcutSection title="Clipboard">
            <ShortcutItem keys={["Cmd", "C"]} description="Copy selected cells" />
            <ShortcutItem keys={["Cmd", "V"]} description="Paste into cells" />
            <ShortcutItem keys={["Cmd", "X"]} description="Cut selected cells" />
          </ShortcutSection>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ShortcutItem({
  keys,
  description,
}: {
  keys: string[];
  description: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{description}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
              {key}
            </kbd>
            {index < keys.length - 1 && (
              <span className="text-muted-foreground">+</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
