"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupFullWidth() {
  return (
    <div className="w-full max-w-md">
      <ButtonGroup className="w-full">
        <Button className="flex-1">First</Button>
        <Button className="flex-1">Second</Button>
        <Button className="flex-1">Third</Button>
      </ButtonGroup>
    </div>
  );
}
