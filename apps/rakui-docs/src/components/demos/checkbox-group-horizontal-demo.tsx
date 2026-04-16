"use client";

import * as CheckboxGroup from "@diceui/checkbox-group";
import { Check } from "@phosphor-icons/react";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
];

export function CheckboxGroupHorizontalDemo() {
  return (
    <CheckboxGroup.CheckboxGroupRoot
      className="peer flex flex-col gap-3.5"
      orientation="horizontal"
    >
      <CheckboxGroup.CheckboxGroupLabel className="text-sm leading-none text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-400">
        Select your frameworks
      </CheckboxGroup.CheckboxGroupLabel>
      <CheckboxGroup.CheckboxGroupList className="flex flex-wrap gap-4 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col">
        {frameworks.map((framework) => (
          <label
            key={framework.value}
            className="flex w-fit select-none items-center gap-2 text-sm leading-none text-zinc-900 has-data-disabled:cursor-not-allowed has-data-invalid:text-red-500 has-data-disabled:opacity-50 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
          >
            <CheckboxGroup.CheckboxGroupItem
              value={framework.value}
              className="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:data-invalid:border-red-400 dark:focus-visible:ring-zinc-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
            >
              <CheckboxGroup.CheckboxGroupIndicator>
                <Check className="size-3.5" weight="bold" />
              </CheckboxGroup.CheckboxGroupIndicator>
            </CheckboxGroup.CheckboxGroupItem>
            {framework.label}
          </label>
        ))}
      </CheckboxGroup.CheckboxGroupList>
    </CheckboxGroup.CheckboxGroupRoot>
  );
}
