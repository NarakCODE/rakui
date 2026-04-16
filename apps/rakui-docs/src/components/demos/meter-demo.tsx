"use client";

import { Meter } from "@/components/ui/meter";

export function MeterDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Meter label="Storage" value={65} />
      <Meter label="Memory" value={42} />
      <Meter label="CPU" value={87} />
    </div>
  );
}
