"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Trick {
  id: string;
  title: string;
  difficulty: string;
  points: number;
}

const initialTricks: Trick[] = [
  { id: "1", title: "The 900", difficulty: "Expert", points: 9000 },
  { id: "2", title: "Indy Backflip", difficulty: "Advanced", points: 4000 },
  { id: "3", title: "Pizza Guy", difficulty: "Intermediate", points: 1500 },
  {
    id: "4",
    title: "360 Varial McTwist",
    difficulty: "Expert",
    points: 5000,
  },
];

export function SortableWithHandleDemo() {
  const [tricks, setTricks] = React.useState(initialTricks);

  return (
    <div className="w-full max-w-3xl">
      <Sortable
        value={tricks}
        onValueChange={setTricks}
        getItemValue={(item) => item.id}
      >
        <Table className="rounded-none border">
          <TableHeader>
            <TableRow className="bg-accent/50 hover:bg-accent/50">
              <TableHead className="w-[50px] bg-transparent" />
              <TableHead className="bg-transparent">Trick</TableHead>
              <TableHead className="bg-transparent">Difficulty</TableHead>
              <TableHead className="bg-transparent text-right">
                Points
              </TableHead>
            </TableRow>
          </TableHeader>

          <SortableContent asChild>
            <TableBody>
              {tricks.map((trick) => (
                <SortableItem key={trick.id} value={trick.id} asChild>
                  <TableRow>
                    <TableCell className="w-[50px]">
                      <SortableItemHandle asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <GripVertical />
                          <span className="sr-only">Reorder {trick.title}</span>
                        </Button>
                      </SortableItemHandle>
                    </TableCell>
                    <TableCell className="font-medium">{trick.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {trick.difficulty}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {trick.points}
                    </TableCell>
                  </TableRow>
                </SortableItem>
              ))}
            </TableBody>
          </SortableContent>
        </Table>

        <SortableOverlay>
          {({ value }) => {
            const activeTrick = tricks.find((trick) => trick.id === value);

            if (!activeTrick) {
              return null;
            }

            return (
              <div className="w-[min(100vw-2rem,48rem)] rounded-md border bg-card shadow-lg">
                <div className="grid grid-cols-[50px_minmax(0,1fr)_minmax(0,1fr)_90px] items-center gap-0">
                  <div className="flex h-14 items-center justify-center">
                    <div className="flex size-8 items-center justify-center rounded-md border border-dashed border-border bg-background">
                      <GripVertical className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="px-4 font-medium">{activeTrick.title}</div>
                  <div className="px-4 text-muted-foreground">
                    {activeTrick.difficulty}
                  </div>
                  <div className="px-4 text-right text-muted-foreground">
                    {activeTrick.points}
                  </div>
                </div>
              </div>
            );
          }}
        </SortableOverlay>
      </Sortable>
    </div>
  );
}
