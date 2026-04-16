"use client";

import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from "@/components/ui/angle-slider";

export function AngleSliderThemesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {/* Default Theme */}
      <div className="flex flex-col items-center gap-2">
        <AngleSlider defaultValue={[45]}>
          <AngleSliderTrack>
            <AngleSliderRange />
          </AngleSliderTrack>
          <AngleSliderThumb />
        </AngleSlider>
        <span className="text-sm text-muted-foreground">Default</span>
      </div>

      {/* Blue Theme */}
      <div className="flex flex-col items-center gap-2">
        <AngleSlider defaultValue={[135]}>
          <AngleSliderTrack className="*:data-[slot='angle-slider-track-rail']:stroke-blue-100">
            <AngleSliderRange className="stroke-blue-500" />
          </AngleSliderTrack>
          <AngleSliderThumb className="border-blue-500 bg-blue-50 ring-blue-500/50" />
          <AngleSliderValue className="text-blue-600 dark:text-blue-400" />
        </AngleSlider>
        <span className="text-sm text-muted-foreground">Blue</span>
      </div>

      {/* Green Theme */}
      <div className="flex flex-col items-center gap-2">
        <AngleSlider defaultValue={[225]}>
          <AngleSliderTrack className="*:data-[slot='angle-slider-track-rail']:stroke-green-100">
            <AngleSliderRange className="stroke-green-500" />
          </AngleSliderTrack>
          <AngleSliderThumb className="border-green-500 bg-green-50 ring-green-500/50" />
          <AngleSliderValue className="text-green-600 dark:text-green-400" />
        </AngleSlider>
        <span className="text-sm text-muted-foreground">Green</span>
      </div>

      {/* Purple Theme */}
      <div className="flex flex-col items-center gap-2">
        <AngleSlider defaultValue={[315]}>
          <AngleSliderTrack className="*:data-[slot='angle-slider-track-rail']:stroke-purple-100">
            <AngleSliderRange className="stroke-purple-500" />
          </AngleSliderTrack>
          <AngleSliderThumb className="border-purple-500 bg-purple-50 ring-purple-500/50" />
          <AngleSliderValue className="text-purple-600 dark:text-purple-400" />
        </AngleSlider>
        <span className="text-sm text-muted-foreground">Purple</span>
      </div>
    </div>
  );
}
