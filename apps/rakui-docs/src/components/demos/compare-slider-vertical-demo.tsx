"use client";

import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider";

export function CompareSliderVerticalDemo() {
  return (
    <CompareSlider
      defaultValue={50}
      orientation="vertical"
      className="h-[400px] w-full overflow-hidden rounded-lg border"
    >
      <CompareSliderBefore>
        {/* biome-ignore lint/performance/noImgElement: Demo image for comparison slider */}
        <img
          src="https://www.cnet.com/a/img/resize/2aa0bcdfeb22b34255c1238465d82eb28f871d67/hub/2018/06/07/78e06ce4-81e0-4b35-992f-6a2b3585b931/mojave-night.jpg?auto=webp&fit=crop&height=675&width=1200"
          alt="Night"
          className="size-full object-cover"
        />
      </CompareSliderBefore>
      <CompareSliderAfter>
        {/* biome-ignore lint/performance/noImgElement: Demo image for comparison slider */}
        <img
          src="https://images.squarespace-cdn.com/content/v1/535b1632e4b0ab57db46e48b/1607375588865-SNMZM58WTDX7LIFPOXUL/sunset3.jpg?format=1000w"
          alt="Sunset"
          className="size-full object-cover"
        />
      </CompareSliderAfter>
      <CompareSliderHandle />
    </CompareSlider>
  );
}
