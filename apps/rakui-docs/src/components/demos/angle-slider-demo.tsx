"use client";

import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/angle-slider";

export function AngleSliderDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AngleSlider defaultValue={[45]}>
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
      </AngleSlider>
    </div>
  );
}
