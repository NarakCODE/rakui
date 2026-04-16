"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  lane: "Docs" | "UI" | "QA";
  estimate: string;
}

const initialTasks: Task[] = [
  {
    id: "rewrite-docs",
    title: "Rewrite Sortable docs page",
    lane: "Docs",
    estimate: "20 min",
  },
  {
    id: "ship-demo",
    title: "Add live docs demo",
    lane: "UI",
    estimate: "15 min",
  },
  {
    id: "run-verification",
    title: "Run type-check and verify drag flow",
    lane: "QA",
    estimate: "10 min",
  },
];

function TaskCard({
  task,
  className,
  handle,
}: {
  task: Task;
  className?: string;
  handle?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border bg-card p-3 shadow-xs",
        className,
      )}
    >
      {handle}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="line-clamp-1 font-medium text-sm">{task.title}</p>
          <Badge variant="secondary" className="rounded-sm">
            {task.lane}
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs">
          Estimated effort: {task.estimate}
        </p>
      </div>
    </div>
  );
}

export function SortableDemo() {
  const [tasks, setTasks] = React.useState(initialTasks);

  return (
    <div className="w-full max-w-xl">
      <Sortable
        value={tasks}
        onValueChange={setTasks}
        getItemValue={(item) => item.id}
      >
        <SortableContent className="flex flex-col gap-2">
          {tasks.map((task) => (
            <SortableItem key={task.id} value={task.id}>
              <TaskCard
                task={task}
                handle={
                  <SortableItemHandle asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-0.5 size-8 shrink-0 rounded-lg"
                    >
                      <GripVertical className="size-4" />
                      <span className="sr-only">Reorder {task.title}</span>
                    </Button>
                  </SortableItemHandle>
                }
              />
            </SortableItem>
          ))}
        </SortableContent>

        <SortableOverlay>
          {({ value }) => {
            const activeTask = tasks.find((task) => task.id === value);

            if (!activeTask) {
              return null;
            }

            return (
              <div className="w-[min(100vw-2rem,32rem)]">
                <TaskCard
                  task={activeTask}
                  className="border-border bg-card shadow-lg"
                  handle={
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-background">
                      <GripVertical className="size-4 text-muted-foreground" />
                    </div>
                  }
                />
              </div>
            );
          }}
        </SortableOverlay>
      </Sortable>
    </div>
  );
}
