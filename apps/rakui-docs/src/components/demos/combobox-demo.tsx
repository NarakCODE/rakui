"use client";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxTrigger,
} from "@/components/ui/combobox";

const tricks = [
  { label: "Kickflip", value: "kickflip" },
  { label: "Heelflip", value: "heelflip" },
  { label: "Tre Flip", value: "tre-flip" },
  { label: "FS 540", value: "fs-540" },
  { label: "Casper flip 360 flip", value: "casper-flip-360-flip" },
  { label: "Kickflip Backflip", value: "kickflip-backflip" },
  { label: "360 Varial McTwist", value: "360-varial-mc-twist" },
  { label: "The 900", value: "the-900" },
];

export function ComboboxDemo() {
  return (
    <Combobox className="w-full max-w-sm">
      <ComboboxLabel>Trick</ComboboxLabel>
      <ComboboxAnchor>
        <ComboboxInput placeholder="Search trick..." />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxPortal>
        <ComboboxContent>
          <ComboboxEmpty>No tricks found.</ComboboxEmpty>
          {tricks.map((trick) => (
            <ComboboxItem key={trick.value} value={trick.value}>
              <ComboboxItemText>{trick.label}</ComboboxItemText>
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </ComboboxPortal>
    </Combobox>
  );
}
