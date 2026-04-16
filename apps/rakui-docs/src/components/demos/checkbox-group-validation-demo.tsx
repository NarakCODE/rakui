"use client";

import * as CheckboxGroup from "@diceui/checkbox-group";
import { Check } from "@phosphor-icons/react";
import * as React from "react";
import { Button } from "@/components/ui/button";

const skills = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "tailwind", label: "Tailwind CSS" },
];

export function CheckboxGroupValidationDemo() {
  const [value, setValue] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const onValidate = React.useCallback((selected: string[]) => {
    if (selected.length < 2) {
      return "Please select at least 2 skills";
    }
    if (selected.length > 3) {
      return "Please select no more than 3 skills";
    }
    return null;
  }, []);

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = onValidate(value);
      setError(validationError);
      if (!validationError) {
        alert(`Selected: ${value.join(", ")}`);
      }
    },
    [value, onValidate],
  );

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <CheckboxGroup.CheckboxGroupRoot
        className="peer flex flex-col gap-3.5"
        value={value}
        onValueChange={setValue}
        onValidate={onValidate}
        invalid={!!error}
      >
        <CheckboxGroup.CheckboxGroupLabel className="text-sm leading-none text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-400">
          Select your skills (2-3 required)
        </CheckboxGroup.CheckboxGroupLabel>
        <CheckboxGroup.CheckboxGroupList className="flex gap-3 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col">
          {skills.map((skill) => (
            <label
              key={skill.value}
              className="flex w-fit select-none items-center gap-2 text-sm leading-none text-zinc-900 has-data-disabled:cursor-not-allowed has-data-invalid:text-red-500 has-data-disabled:opacity-50 dark:text-zinc-100 dark:has-data-invalid:text-red-400"
            >
              <CheckboxGroup.CheckboxGroupItem
                value={skill.value}
                className="h-4 w-4 shrink-0 rounded-sm border border-zinc-600 shadow-sm focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-hidden data-invalid:border-red-500 dark:border-zinc-400 dark:data-invalid:border-red-400 dark:focus-visible:ring-zinc-400 [&[data-state=checked]:not([data-invalid])]:bg-zinc-900 [&[data-state=checked]:not([data-invalid])]:text-zinc-50 dark:[&[data-state=checked]:not([data-invalid])]:bg-zinc-100 dark:[&[data-state=checked]:not([data-invalid])]:text-zinc-900 [&[data-state=checked][data-invalid]]:bg-red-500 [&[data-state=checked][data-invalid]]:text-white dark:[&[data-state=checked][data-invalid]]:bg-red-400 [&[data-state=unchecked][data-invalid]]:bg-transparent"
              >
                <CheckboxGroup.CheckboxGroupIndicator>
                  <Check className="size-3.5" weight="bold" />
                </CheckboxGroup.CheckboxGroupIndicator>
              </CheckboxGroup.CheckboxGroupItem>
              {skill.label}
            </label>
          ))}
        </CheckboxGroup.CheckboxGroupList>
        {error && (
          <CheckboxGroup.CheckboxGroupMessage className="text-[0.8rem] leading-none text-red-500 dark:text-red-400">
            {error}
          </CheckboxGroup.CheckboxGroupMessage>
        )}
      </CheckboxGroup.CheckboxGroupRoot>
      <Button type="submit" size="sm" className="w-fit">
        Submit
      </Button>
    </form>
  );
}
