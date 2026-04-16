"use client";

import { ArrowDownRight, ArrowUpRight, DollarSign, Minus, Users } from "lucide-react";
import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatSeparator,
  StatTrend,
  StatValue,
} from "@/components/ui/stat";

export function StatDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Stat>
        <StatLabel>Monthly revenue</StatLabel>
        <StatValue>$48,240</StatValue>
        <StatIndicator color="success" variant="icon">
          <DollarSign />
        </StatIndicator>
        <StatTrend trend="up">
          <ArrowUpRight />
          12.4% from last month
        </StatTrend>
        <StatDescription>
          14 enterprise renewals closed during the current billing cycle.
        </StatDescription>
      </Stat>

      <Stat>
        <StatLabel>Active customers</StatLabel>
        <StatValue>1,284</StatValue>
        <StatIndicator color="info" variant="badge">
          +86
        </StatIndicator>
        <StatTrend trend="up">
          <ArrowUpRight />
          7.1% week over week
        </StatTrend>
        <StatSeparator />
        <StatDescription>
          New workspace invites outpaced churn by 4.3x this week.
        </StatDescription>
      </Stat>

      <Stat>
        <StatLabel>Support load</StatLabel>
        <StatValue>17 open</StatValue>
        <StatIndicator color="warning">
          <Minus />
        </StatIndicator>
        <StatTrend trend="down">
          <ArrowDownRight />
          3 escalations need review
        </StatTrend>
        <StatDescription>
          Response times are stable, but the west region queue is backlogged.
        </StatDescription>
      </Stat>

      <Stat className="md:col-span-2 xl:col-span-3">
        <StatLabel>Team activity</StatLabel>
        <StatValue>328 updates shipped</StatValue>
        <StatIndicator color="default" variant="icon">
          <Users />
        </StatIndicator>
        <StatTrend trend="neutral">
          <Minus />
          Consistent with the previous seven-day average
        </StatTrend>
        <StatDescription>
          Product, design, and support stayed within the planned release cadence.
        </StatDescription>
      </Stat>
    </div>
  );
}
