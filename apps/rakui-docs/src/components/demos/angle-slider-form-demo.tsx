"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/angle-slider";

export function AngleSliderFormDemo() {
  const [submitted, setSubmitted] = React.useState<{ angle: number } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const angle = parseInt(formData.get("angle") as string, 10);
    setSubmitted({ angle });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Label htmlFor="angle" className="text-sm font-medium">
            Select Rotation Angle
          </Label>
          <AngleSlider name="angle" id="angle" defaultValue={[90]}>
            <AngleSliderTrack>
              <AngleSliderRange />
            </AngleSliderTrack>
            <AngleSliderThumb />
            <AngleSliderValue />
          </AngleSlider>
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {submitted && (
        <div className="rounded-lg border bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">Submitted value:</p>
          <p className="text-lg font-semibold">{submitted.angle}°</p>
        </div>
      )}
    </div>
  );
}
