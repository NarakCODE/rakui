"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComposedRefs } from "@/lib/compose-refs";
import { useLazyRef } from "@/hooks/use-lazy-ref";
import { VisuallyHiddenInput } from "@/components/visually-hidden-input";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ---------------------------------------------------------------------------
// Country Data
// ---------------------------------------------------------------------------

interface CountryData {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areaCodes: string[] | null;
}

const COUNTRY_DATA: CountryData[] = [
  { name: "United States", iso2: "us", dialCode: "+1", priority: 0, areaCodes: null },
  { name: "United Kingdom", iso2: "gb", dialCode: "+44", priority: 0, areaCodes: null },
  { name: "Canada", iso2: "ca", dialCode: "+1", priority: 1, areaCodes: null },
  { name: "Australia", iso2: "au", dialCode: "+61", priority: 0, areaCodes: null },
  { name: "Germany", iso2: "de", dialCode: "+49", priority: 0, areaCodes: null },
  { name: "France", iso2: "fr", dialCode: "+33", priority: 0, areaCodes: null },
  { name: "India", iso2: "in", dialCode: "+91", priority: 0, areaCodes: null },
  { name: "China", iso2: "cn", dialCode: "+86", priority: 0, areaCodes: null },
  { name: "Japan", iso2: "jp", dialCode: "+81", priority: 0, areaCodes: null },
  { name: "South Korea", iso2: "kr", dialCode: "+82", priority: 0, areaCodes: null },
  { name: "Brazil", iso2: "br", dialCode: "+55", priority: 0, areaCodes: null },
  { name: "Mexico", iso2: "mx", dialCode: "+52", priority: 0, areaCodes: null },
  { name: "Russia", iso2: "ru", dialCode: "+7", priority: 0, areaCodes: null },
  { name: "Italy", iso2: "it", dialCode: "+39", priority: 0, areaCodes: null },
  { name: "Spain", iso2: "es", dialCode: "+34", priority: 0, areaCodes: null },
  { name: "Netherlands", iso2: "nl", dialCode: "+31", priority: 0, areaCodes: null },
  { name: "Sweden", iso2: "se", dialCode: "+46", priority: 0, areaCodes: null },
  { name: "Norway", iso2: "no", dialCode: "+47", priority: 0, areaCodes: null },
  { name: "Denmark", iso2: "dk", dialCode: "+45", priority: 0, areaCodes: null },
  { name: "Finland", iso2: "fi", dialCode: "+358", priority: 0, areaCodes: null },
  { name: "Poland", iso2: "pl", dialCode: "+48", priority: 0, areaCodes: null },
  { name: "Belgium", iso2: "be", dialCode: "+32", priority: 0, areaCodes: null },
  { name: "Switzerland", iso2: "ch", dialCode: "+41", priority: 0, areaCodes: null },
  { name: "Austria", iso2: "at", dialCode: "+43", priority: 0, areaCodes: null },
  { name: "Portugal", iso2: "pt", dialCode: "+351", priority: 0, areaCodes: null },
  { name: "Greece", iso2: "gr", dialCode: "+30", priority: 0, areaCodes: null },
  { name: "Turkey", iso2: "tr", dialCode: "+90", priority: 0, areaCodes: null },
  { name: "Saudi Arabia", iso2: "sa", dialCode: "+966", priority: 0, areaCodes: null },
  { name: "United Arab Emirates", iso2: "ae", dialCode: "+971", priority: 0, areaCodes: null },
  { name: "Israel", iso2: "il", dialCode: "+972", priority: 0, areaCodes: null },
  { name: "South Africa", iso2: "za", dialCode: "+27", priority: 0, areaCodes: null },
  { name: "Nigeria", iso2: "ng", dialCode: "+234", priority: 0, areaCodes: null },
  { name: "Egypt", iso2: "eg", dialCode: "+20", priority: 0, areaCodes: null },
  { name: "Argentina", iso2: "ar", dialCode: "+54", priority: 0, areaCodes: null },
  { name: "Chile", iso2: "cl", dialCode: "+56", priority: 0, areaCodes: null },
  { name: "Colombia", iso2: "co", dialCode: "+57", priority: 0, areaCodes: null },
  { name: "Peru", iso2: "pe", dialCode: "+51", priority: 0, areaCodes: null },
  { name: "Venezuela", iso2: "ve", dialCode: "+58", priority: 0, areaCodes: null },
  { name: "Indonesia", iso2: "id", dialCode: "+62", priority: 0, areaCodes: null },
  { name: "Thailand", iso2: "th", dialCode: "+66", priority: 0, areaCodes: null },
  { name: "Vietnam", iso2: "vn", dialCode: "+84", priority: 0, areaCodes: null },
  { name: "Philippines", iso2: "ph", dialCode: "+63", priority: 0, areaCodes: null },
  { name: "Malaysia", iso2: "my", dialCode: "+60", priority: 0, areaCodes: null },
  { name: "Singapore", iso2: "sg", dialCode: "+65", priority: 0, areaCodes: null },
  { name: "New Zealand", iso2: "nz", dialCode: "+64", priority: 0, areaCodes: null },
  { name: "Ireland", iso2: "ie", dialCode: "+353", priority: 0, areaCodes: null },
  { name: "Czech Republic", iso2: "cz", dialCode: "+420", priority: 0, areaCodes: null },
  { name: "Romania", iso2: "ro", dialCode: "+40", priority: 0, areaCodes: null },
  { name: "Hungary", iso2: "hu", dialCode: "+36", priority: 0, areaCodes: null },
  { name: "Ukraine", iso2: "ua", dialCode: "+380", priority: 0, areaCodes: null },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get a human-readable country name from ISO2 code. */
export function getCountryName(iso2: string): string {
  return COUNTRY_DATA.find((c) => c.iso2 === iso2.toLowerCase())?.name ?? iso2.toUpperCase();
}

/** Return the flag emoji for a given ISO2 country code. */
export function getFlagEmoji(iso2: string): string {
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/** Return the full country list (deduplicated by iso2). */
export function getCountries(): CountryData[] {
  const seen = new Set<string>();
  return COUNTRY_DATA.filter((c) => {
    if (seen.has(c.iso2)) return false;
    seen.add(c.iso2);
    return true;
  });
}

/**
 * Attempt to detect the country from a phone number string.
 * Looks for the dial code prefix after stripping non-digit characters
 * (except the leading +).
 */
export function detectCountryFromNumber(value: string): CountryData | null {
  const stripped = value.replace(/[^\d+]/g, "");
  for (const country of getCountries()) {
    if (stripped.startsWith(country.dialCode)) {
      return country;
    }
  }
  return null;
}

/**
 * Format a phone number with basic grouping.
 * This is a simple formatter; for production-grade formatting consider
 * a library like libphonenumber-js.
 */
export function formatPhoneNumber(value: string, dialCode: string): string {
  const digits = value.replace(/\D/g, "");

  // Remove the dial code digits if they're already present
  const dialDigits = dialCode.replace(/\D/g, "");
  let remaining = digits;
  if (digits.startsWith(dialDigits)) {
    remaining = digits.slice(dialDigits.length);
  }

  // Basic formatting: group into chunks
  if (remaining.length <= 3) return remaining;
  if (remaining.length <= 6) return `${remaining.slice(0, 3)} ${remaining.slice(3)}`;
  if (remaining.length <= 9) {
    return `${remaining.slice(0, 3)} ${remaining.slice(3, 6)} ${remaining.slice(6)}`;
  }
  // For longer numbers, group in pairs after the first 3
  const first = remaining.slice(0, 3);
  const rest = remaining.slice(3).match(/.{1,2}/g)?.join(" ") ?? remaining.slice(3);
  return `${first} ${rest}`;
}

// ---------------------------------------------------------------------------
// Variant definitions (CVA)
// ---------------------------------------------------------------------------

const phoneInputVariants = cva(
  "group flex w-full items-center gap-0 rounded-md border border-input bg-transparent transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      variant: {
        default: "",
        filled: "bg-muted/50 border-transparent hover:bg-muted",
        outline: "border-border bg-background",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

// ---------------------------------------------------------------------------
// Context Interface
// ---------------------------------------------------------------------------

interface PhoneInputContextValue {
  country: CountryData;
  value: string;
  countries: CountryData[];
  disabled: boolean;
  placeholder: string;
  onValueChange: (value: string) => void;
  onCountryChange: (country: CountryData) => void;
}

const PhoneInputContext = React.createContext<PhoneInputContextValue | null>(null);

function usePhoneInputContext(componentName: string): PhoneInputContextValue {
  const ctx = React.useContext(PhoneInputContext);
  if (!ctx) {
    throw new Error(
      `\`${componentName}\` must be used within \`<PhoneInput>\`.`,
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// PhoneInput (Root)
// ---------------------------------------------------------------------------

export interface PhoneInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue" | "onChange">,
    VariantProps<typeof phoneInputVariants> {
  /** Controlled value. */
  value?: string;
  /** Uncontrolled default value. */
  defaultValue?: string;
  /** Default country (ISO2). */
  defaultCountry?: string;
  /** Callback fired when value changes. */
  onChange?: (value: string) => void;
  /** Name attribute for form submission. */
  name?: string;
  /** Disable the entire input. */
  disabled?: boolean;
  /** Mark as invalid. */
  invalid?: boolean;
  /** Limit the list of countries shown in the selector. */
  countries?: string[];
  /** Placeholder for the phone field. */
  placeholder?: string;
}

const PhoneInputRoot = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  (
    {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue = "",
      defaultCountry = "us",
      onChange,
      name,
      disabled = false,
      invalid = false,
      countries: allowedCountries,
      placeholder = "Phone number",
      ...rest
    },
    ref,
  ) => {
    const countryList = useLazyRef(() => {
      const all = getCountries();
      if (allowedCountries) {
        return all.filter((c) => allowedCountries.includes(c.iso2.toLowerCase()));
      }
      return all;
    });

    const defaultCountryData = useLazyRef(() => {
      return (
        countryList.current.find(
          (c) => c.iso2 === defaultCountry.toLowerCase(),
        ) ?? countryList.current[0]!
      );
    });

    // Detect country from defaultValue if provided
    const detectedCountry =
      defaultValue.length > 0
        ? detectCountryFromNumber(defaultValue) ?? defaultCountryData.current
        : defaultCountryData.current;

    const [country, setCountry] = React.useState<CountryData>(detectedCountry);
    const [value, setValue] = React.useState(controlledValue ?? defaultValue);

    // Sync controlled value
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    // Auto-detect country from value
    React.useEffect(() => {
      const detected = detectCountryFromNumber(value);
      if (detected) {
        setCountry(detected);
      }
    }, [value]);

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setValue(newValue);
        onChange?.(newValue);
      },
      [onChange],
    );

    const handleCountryChange = React.useCallback(
      (newCountry: CountryData) => {
        setCountry(newCountry);
      },
      [],
    );

    const contextValue = React.useMemo<PhoneInputContextValue>(
      () => ({
        country,
        value,
        countries: countryList.current,
        disabled,
        placeholder,
        onValueChange: handleValueChange,
        onCountryChange: handleCountryChange,
      }),
      [country, value, countryList, disabled, placeholder, handleValueChange, handleCountryChange],
    );

    return (
      <PhoneInputContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="phone-input"
          aria-invalid={invalid || undefined}
          className={cn(phoneInputVariants({ size, variant }), className)}
          {...rest}
        >
          {name !== undefined && (
            <VisuallyHiddenInput name={name} value={value} />
          )}
        </div>
      </PhoneInputContext.Provider>
    );
  },
);

PhoneInputRoot.displayName = "PhoneInput";

// ---------------------------------------------------------------------------
// PhoneInputCountrySelect
// ---------------------------------------------------------------------------

interface CountrySelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const PhoneInputCountrySelect = React.forwardRef<
  HTMLDivElement,
  CountrySelectProps
>(({ className, ...rest }, ref) => {
  const ctx = usePhoneInputContext("PhoneInputCountrySelect");
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredCountries = React.useMemo(() => {
    if (!search) return ctx.countries;
    const lower = search.toLowerCase();
    return ctx.countries.filter(
      (c: CountryData) =>
        c.name.toLowerCase().includes(lower) ||
        c.dialCode.includes(search) ||
        c.iso2.toLowerCase().includes(lower),
    );
  }, [ctx.countries, search]);

  const handleSelect = React.useCallback(
    (country: CountryData) => {
      ctx.onCountryChange(country);
      setOpen(false);
      setSearch("");
    },
    [ctx],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          disabled={ctx.disabled}
          aria-label="Select country"
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-l-md px-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className="text-base leading-none" aria-hidden="true">
            {getFlagEmoji(ctx.country.iso2)}
          </span>
          <ChevronDown
            className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] p-0"
        align="start"
        sideOffset={4}
        {...rest}
      >
        {/* Search */}
        <div className="flex items-center border-b px-2">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Country List */}
        <div className="max-h-[240px] overflow-y-auto p-1">
          {filteredCountries.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No countries found.
            </div>
          ) : (
            filteredCountries.map((country: CountryData) => (
              <button
                key={country.iso2}
                type="button"
                role="option"
                aria-selected={ctx.country.iso2 === country.iso2}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                  ctx.country.iso2 === country.iso2
                    ? "bg-muted font-medium"
                    : "hover:bg-muted",
                )}
                onClick={() => handleSelect(country)}
              >
                <span className="text-lg leading-none" aria-hidden="true">
                  {getFlagEmoji(country.iso2)}
                </span>
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-xs text-muted-foreground">
                  {country.dialCode}
                </span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});

PhoneInputCountrySelect.displayName = "PhoneInputCountrySelect";

// ---------------------------------------------------------------------------
// PhoneInputField
// ---------------------------------------------------------------------------

interface PhoneFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  onChange?: (value: string) => void;
}

const PhoneInputField = React.forwardRef<HTMLInputElement, PhoneFieldProps>(
  ({ className, onChange, ...props }, ref) => {
    const ctx = usePhoneInputContext("PhoneInputField");

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Strip formatting characters, keep digits and +
        const digits = raw.replace(/[^\d+]/g, "");
        ctx.onValueChange(digits);
        onChange?.(digits);
      },
      [ctx, onChange],
    );

    const displayValue = React.useMemo(() => {
      const { dialCode } = ctx.country;
      const formatted = formatPhoneNumber(ctx.value, dialCode);
      return `${dialCode} ${formatted}`.trim();
    }, [ctx.value, ctx.country]);

    const composedRef = useComposedRefs(ref);

    return (
      <Input
        ref={composedRef}
        type="tel"
        inputMode="tel"
        value={displayValue}
        onChange={handleChange}
        disabled={ctx.disabled}
        placeholder={ctx.placeholder}
        aria-label="Phone number"
        className={cn(
          "border-0 bg-transparent shadow-none focus-visible:ring-0",
          className,
        )}
        {...props}
      />
    );
  },
);

PhoneInputField.displayName = "PhoneInputField";

// ---------------------------------------------------------------------------
// Compound Component Assembly
// ---------------------------------------------------------------------------

export const PhoneInput = Object.assign(PhoneInputRoot, {
  CountrySelect: PhoneInputCountrySelect,
  Field: PhoneInputField,
});

// ---------------------------------------------------------------------------
// Hook (alias for store access)
// ---------------------------------------------------------------------------

/**
 * Hook to access the PhoneInput state from within the component tree.
 * Must be used inside a `<PhoneInput>` component.
 */
export function usePhoneInput(): PhoneInputContextValue {
  return usePhoneInputContext("usePhoneInput");
}
