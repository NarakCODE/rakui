"use client";

import * as React from "react";

import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableOverlay,
} from "@/components/ui/sortable";

const initialTricks = [
  "The 900",
  "Indy Backflip",
  "Pizza Guy",
  "Rocket Air",
  "Kickflip Backflip",
  "FS 540",
];

export function SortablePrimitiveValuesDemo() {
  const [tricks, setTricks] = React.useState(initialTricks);

  return (
    <div className="w-full max-w-2xl">
      <Sortable value={tricks} onValueChange={setTricks} orientation="mixed">
        <SortableContent className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {tricks.map((trick) => (
            <SortableItem key={trick} value={trick} asChild asHandle>
              <div className="flex size-full flex-col items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-8 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                <div className="font-medium text-sm leading-tight sm:text-base">
                  {trick}
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContent>

        <SortableOverlay>
          {({ value }) => (
            <SortableItem value={value} asChild>
              <div className="flex size-full flex-col items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 p-8 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                <div className="font-medium text-sm leading-tight sm:text-base">
                  {value}
                </div>
              </div>
            </SortableItem>
          )}
        </SortableOverlay>
      </Sortable>
    </div>
  );
}
