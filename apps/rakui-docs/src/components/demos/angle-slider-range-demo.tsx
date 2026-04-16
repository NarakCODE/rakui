"use client";

import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/angle-slider";

export function AngleSliderRangeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <AngleSlider defaultValue={[30, 120]} step={5}>
        <AngleSliderTrack>
          <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb index={0} />
        <AngleSliderThumb index={1} />
        <AngleSliderValue />
      </AngleSlider>
    </div>
  );
}
