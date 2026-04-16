"use client";

import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupWithIcons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          With icons
        </span>
        <ButtonGroup>
          <Button variant="secondary">
            <TextAlignLeftIcon />
          </Button>
          <Button variant="secondary">
            <TextAlignCenterIcon />
          </Button>
          <Button variant="secondary">
            <TextAlignRightIcon />
          </Button>
          <Button variant="secondary">
            <TextAlignJustifyIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Icon only buttons
        </span>
        <ButtonGroup>
          <Button size="icon" variant="secondary">
            <TextAlignLeftIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignCenterIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignRightIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <TextAlignJustifyIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
