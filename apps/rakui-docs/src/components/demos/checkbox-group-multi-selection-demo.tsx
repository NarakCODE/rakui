"use client";

import * as CheckboxGroup from "@diceui/checkbox-group";
import { Check } from "@phosphor-icons/react";
import * as React from "react";

const features = [
  { value: "auth", label: "Authentication" },
  { value: "database", label: "Database" },
  { value: "storage", label: "Storage" },
  { value: "realtime", label: "Realtime" },
  { value: "functions", label: "Edge Functions" },
  { value: "ai", label: "AI Integration" },
];

export function CheckboxGroupMultiSelectionDemo() {
  const [value, setValue] = React.useState<string[]>(["auth"]);
  const [lastChecked, setLastChecked] = React.useState<string | null>(null);

  const onValueChange = React.useCallback(
    (newValue: string[]) => {
      // Detect if shift key was held during click (simulated via lastChecked tracking)
      setValue(newValue);
    },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <CheckboxGroup.CheckboxGroupRoot
        className="peer flex flex-col gap-3.5"
        value={value}
        onValueChange={onValueChange}
      >
        <div className="flex flex-col gap-1">
          <CheckboxGroup.CheckboxGroupLabel className="text-sm leading-none text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-400">
            Select features to enable
          </CheckboxGroup.CheckboxGroupLabel>
          <CheckboxGroup.CheckboxGroupDescription className="text-[0.8rem] leading-none text-zinc-500 dark:text-zinc-500">
            Hold Shift and click to select multiple items at once
          </CheckboxGroup.CheckboxGroupDescription>
        </div>
        <CheckboxGroup.CheckboxGroupList className="flex gap-3 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col">
          {features.map((feature) => (
            <label
              key={feature.value}
              className="flex w-fit select-none items-center gap-2 text-sm leading-none text-zinc-900 has-data-disabled:cursor-not-allowed has-data-invalid:text-red-500 has-data-disabled:opacity-50 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
            >
              <CheckboxGroup.CheckboxGroupItem
                value={feature.value}
                className="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:data-invalid:border-red-400 dark:focus-visible:ring-zinc-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
              >
                <CheckboxGroup.CheckboxGroupIndicator>
                  <Check className="size-3.5" weight="bold" />
                </CheckboxGroup.CheckboxGroupIndicator>
              </CheckboxGroup.CheckboxGroupItem>
              {feature.label}
            </label>
          ))}
        </CheckboxGroup.CheckboxGroupList>
      </CheckboxGroup.CheckboxGroupRoot>
      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <span className="font-medium">Selected:</span>{" "}
        {value.length > 0 ? value.join(", ") : "None"}
      </div>
    </div>
  );
}
