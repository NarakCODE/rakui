"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanOverlay,
} from "@/components/ui/kanban";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  description?: string;
  assignee?: string;
  dueDate?: string;
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  done: "Done",
};

const COLUMN_COLORS: Record<string, string> = {
  backlog: "border-t-blue-500",
  inProgress: "border-t-amber-500",
  done: "border-t-green-500",
};

export function KanbanDynamicOverlayDemo() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [
      {
        id: "1",
        title: "Add authentication",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2024-04-01",
      },
      {
        id: "2",
        title: "Create API endpoints",
        priority: "medium",
        assignee: "Jane Smith",
        dueDate: "2024-04-05",
      },
      {
        id: "3",
        title: "Write documentation",
        priority: "low",
        assignee: "Bob Johnson",
        dueDate: "2024-04-10",
      },
    ],
    inProgress: [
      {
        id: "4",
        title: "Design system updates",
        priority: "high",
        assignee: "Alice Brown",
        dueDate: "2024-03-28",
      },
      {
        id: "5",
        title: "Implement dark mode",
        priority: "medium",
        assignee: "Charlie Wilson",
        dueDate: "2024-04-02",
      },
    ],
    done: [
      {
        id: "7",
        title: "Setup project",
        priority: "high",
        assignee: "Eve Davis",
        dueDate: "2024-03-25",
      },
      {
        id: "8",
        title: "Initial commit",
        priority: "low",
        assignee: "Frank White",
        dueDate: "2024-03-24",
      },
    ],
  });

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3 gap-4">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const tasks = columns[value] ?? [];

            return <TaskColumn value={value} tasks={tasks} className="rotate-2" />;
          }

          const task = Object.values(columns)
            .flat()
            .find((task) => task.id === value);

          if (!task) return null;

          return <TaskCard task={task} className="rotate-2" />;
        }}
      </KanbanOverlay>
    </Kanban>
  );
}

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof KanbanItem>, "value"> {
  task: Task;
}

function TaskCard({ task, className, ...props }: TaskCardProps) {
  return (
    <KanbanItem key={task.id} value={task.id} asChild {...props}>
      <div className={`rounded-md border bg-card p-3 shadow-sm ${className || ""}`}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 font-medium text-sm">
              {task.title}
            </span>
            <Badge
              variant={
                task.priority === "high"
                  ? "destructive"
                  : task.priority === "medium"
                    ? "default"
                    : "secondary"
              }
              className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
            >
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <time className="text-[10px] tabular-nums">{task.dueDate}</time>
            )}
          </div>
        </div>
      </div>
    </KanbanItem>
  );
}

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof KanbanColumn>, "children"> {
  tasks: Task[];
}

function TaskColumn({ value, tasks, className, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn 
      value={value} 
      className={`bg-muted/30 border-t-4 ${COLUMN_COLORS[value] || ""} ${className || ""}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <KanbanColumnHandle asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <GripVertical className="h-4 w-4" />
          </Button>
        </KanbanColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5 min-h-[100px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </KanbanColumn>
  );
}
