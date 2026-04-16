"use client";

import * as React from "react";
import { PhoneInput } from "@/components/ui/phone-input";

export function PhoneInputDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-6">
      {/* Basic */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Basic</p>
        <PhoneInput name="phone-basic" className="max-w-sm">
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
      </div>

      {/* Default Value */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">With Default Value</p>
        <PhoneInput defaultValue="+14155551234" name="phone-default" className="max-w-sm">
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Sizes</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <PhoneInput size="sm" name="phone-sm" className="max-w-[220px]">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
          <PhoneInput size="md" name="phone-md" className="max-w-[240px]">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
          <PhoneInput size="lg" name="phone-lg" className="max-w-[260px]">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
        </div>
      </div>

      {/* Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Variants</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <PhoneInput variant="default" name="phone-default-var" className="max-w-sm">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
          <PhoneInput variant="filled" name="phone-filled" className="max-w-sm">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
          <PhoneInput variant="outline" name="phone-outline" className="max-w-sm">
            <PhoneInput.CountrySelect />
            <PhoneInput.Field />
          </PhoneInput>
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Disabled</p>
        <PhoneInput disabled name="phone-disabled" className="max-w-sm">
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
      </div>

      {/* Invalid */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Invalid State</p>
        <PhoneInput invalid name="phone-invalid" className="max-w-sm">
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
      </div>

      {/* Controlled */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Controlled</p>
        <PhoneInput
          value={value}
          onChange={setValue}
          name="phone-controlled"
          className="max-w-sm"
        >
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
        {value && (
          <p className="text-xs text-muted-foreground">
            Current value: <code className="font-mono">{value}</code>
          </p>
        )}
      </div>

      {/* Limited Countries */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Limited Countries (US, UK, CA)</p>
        <PhoneInput countries={["us", "gb", "ca"]} name="phone-limited" className="max-w-sm">
          <PhoneInput.CountrySelect />
          <PhoneInput.Field />
        </PhoneInput>
      </div>
    </div>
  );
}
