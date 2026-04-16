"use client";

import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupOrientation() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Horizontal
        </span>
        <ButtonGroup orientation="horizontal">
          <Button size="icon" variant="secondary">
            <TextAlignLeftIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignCenterIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignRightIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Vertical
        </span>
        <ButtonGroup orientation="vertical">
          <Button size="icon" variant="secondary">
            <TextAlignLeftIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignCenterIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignRightIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
