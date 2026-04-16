"use client";

import * as React from "react";

import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableOverlay,
} from "@/components/ui/sortable";

const initialStages = ["Backlog", "Planning", "Design", "Build", "Launch"];

export function SortableHorizontalDemo() {
  const [stages, setStages] = React.useState(initialStages);

  return (
    <div className="w-full max-w-4xl">
      <Sortable
        value={stages}
        onValueChange={setStages}
        orientation="horizontal"
      >
        <SortableContent className="flex flex-col gap-3 sm:flex-row">
          {stages.map((stage) => (
            <SortableItem
              key={stage}
              value={stage}
              asHandle
              className="min-w-40 rounded-lg border bg-card p-4 text-center font-medium shadow-xs"
            >
              {stage}
            </SortableItem>
          ))}
        </SortableContent>

        <SortableOverlay>
          {({ value }) => (
            <SortableItem
              value={value}
              asChild
              className="min-w-40 rounded-lg border bg-card p-4 text-center font-medium shadow-lg"
            >
              <div>{value}</div>
            </SortableItem>
          )}
        </SortableOverlay>
      </Sortable>
    </div>
  );
}
