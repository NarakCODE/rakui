"use client";

import { ArrowCounterClockwise } from "@phosphor-icons/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  TagsInput,
  TagsInputClear,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "@/components/ui/tags-input";

export function TagsInputEditableDemo() {
  const [tricks, setTricks] = React.useState([
    "Kickflip",
    "Heelflip",
    "FS 540",
  ]);

  return (
    <TagsInput value={tricks} onValueChange={setTricks} editable addOnPaste>
      <TagsInputLabel>Tricks</TagsInputLabel>
      <TagsInputList>
        {tricks.map((trick) => (
          <TagsInputItem key={trick} value={trick}>
            {trick}
          </TagsInputItem>
        ))}
        <TagsInputInput placeholder="Add trick..." />
      </TagsInputList>
      <TagsInputClear asChild>
        <Button variant="outline">
          <ArrowCounterClockwise className="h-4 w-4" />
          Clear
        </Button>
      </TagsInputClear>
    </TagsInput>
  );
}
