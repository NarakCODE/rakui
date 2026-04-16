"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/angle-slider";

export function AngleSliderControlledDemo() {
  const [value, setValue] = React.useState([90]);

  return (
    <div className="flex flex-col items-center gap-6">
      <AngleSlider value={value} onValueChange={(v) => setValue(v)}
      >
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setValue([0])}>
          0°
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue([90])}>
          90°
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue([180])}>
          180°
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue([270])}>
          270°
        </Button>
      </div>
    </div>
  );
}
