"use client";

import * as React from "react";
import { Masonry, MasonryItem } from "@/components/ui/masonry";

const items = [
  {
    id: "1",
    title: "The 900",
    description:
      "The 900 is a 2½-revolution (900 degrees) aerial spin performed on a skateboard ramp. While airborne, the skateboarder makes two-and-a-half turns about their longitudinal axis, thereby facing down when coming down. It is considered one of skateboarding's most technically demanding tricks.",
  },
  {
    id: "2",
    title: "Kickflip Indy",
    description:
      "A kickflip indy is a skateboarding trick where the rider performs a kickflip while simultaneously grabbing the board with their trailing hand on the toe side edge in the middle of the board. It combines the board rotation of a kickflip with the grab of an indy.",
  },
  {
    id: "3",
    title: "FS 540",
    description:
      "The frontside 540 is a skateboarding aerial trick where the rider rotates 540 degrees frontside (toward the direction they are facing) while airborne. It requires precise timing and body control to complete the rotation before landing.",
  },
  {
    id: "4",
    title: "Casper 360 Flip",
    description:
      "The Casper 360 flip is a complex skateboarding trick that combines a Casper flip with a 360-degree rotation. The rider balances the board on its tail with their front foot under the board while performing a 360-degree flip motion.",
  },
  {
    id: "5",
    title: "Varial Heelflip Indy",
    description:
      "A varial heelflip indy combines a varial heelflip (a backside pop shove-it with a heelflip) with an indy grab. The rider pops the board, initiates the flip and rotation, then grabs the board mid-air with their trailing hand.",
  },
  {
    id: "6",
    title: "Backside Lipslide Revert",
    description:
      "The backside lipslide revert is a slide trick performed on a rail or ledge where the rider approaches backside, slides on the tail of the board, and then reverts (spins back) to their original stance before landing.",
  },
];

export function MasonryDemo() {
  return (
    <Masonry columnCount={3} gap={12} fallback={<div className="h-72 w-full animate-pulse bg-muted" />}>
      {items.map((item) => (
        <MasonryItem key={item.id} asChild>
          <div className="flex flex-col gap-1 rounded-md border bg-card p-4">
            <div className="font-medium text-sm">{item.title}</div>
            <span className="text-muted-foreground text-sm">
              {item.description}
            </span>
          </div>
        </MasonryItem>
      ))}
    </Masonry>
  );
}
