"use client";

import { Bell, ChevronRight, DollarSign, Minus } from "lucide-react";
import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatValue,
} from "@/components/ui/stat";

const indicators = [
  {
    label: "Default",
    value: "42 alerts",
    description: "Use a simple glyph when you only need light emphasis.",
    indicator: (
      <StatIndicator color="warning">
        <Minus />
      </StatIndicator>
    ),
  },
  {
    label: "Icon",
    value: "$9,240",
    description: "Best for branded metric cards and dashboard overviews.",
    indicator: (
      <StatIndicator color="success" variant="icon">
        <DollarSign />
      </StatIndicator>
    ),
  },
  {
    label: "Badge",
    value: "18.2%",
    description: "Useful for compact deltas, quotas, and score changes.",
    indicator: (
      <StatIndicator color="info" variant="badge">
        +18%
      </StatIndicator>
    ),
  },
  {
    label: "Action",
    value: "Review queue",
    description: "Works as an affordance inside a larger interactive layout.",
    indicator: (
      <StatIndicator aria-hidden="true" variant="action">
        <ChevronRight />
      </StatIndicator>
    ),
  },
] as const;

export function StatIndicatorDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      {indicators.map((item) => (
        <Stat key={item.label}>
          <StatLabel>{item.label} indicator</StatLabel>
          <StatValue>{item.value}</StatValue>
          {item.indicator}
          <StatDescription>{item.description}</StatDescription>
        </Stat>
      ))}

      <Stat className="md:col-span-2">
        <StatLabel>Notification summary</StatLabel>
        <StatValue>6 pending approvals</StatValue>
        <StatIndicator color="error" variant="icon">
          <Bell />
        </StatIndicator>
        <StatDescription>
          Mix indicator styles with the same root layout without changing the
          surrounding card structure.
        </StatDescription>
      </Stat>
    </div>
  );
}
