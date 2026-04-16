"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeOverflow } from "@/components/ui/badge-overflow";

const projectTags = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Testing",
  "Documentation",
  "Design",
  "API",
  "Security",
  "Performance",
  "Accessibility",
  "i18n",
];

export function BadgeOverflowCustomOverflowDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Default Overflow */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Default Overflow Indicator</h3>
        <BadgeOverflow
          items={projectTags}
          lineCount={1}
          renderBadge={(item) => <Badge>{item}</Badge>}
        />
      </div>

      {/* Custom Overflow with Badge */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Custom Overflow (Badge Style)</h3>
        <BadgeOverflow
          items={projectTags}
          lineCount={1}
          renderBadge={(item) => <Badge variant="outline">{item}</Badge>}
          renderOverflow={(count) => (
            <Badge variant="secondary">+{count} tags</Badge>
          )}
        />
      </div>

      {/* Custom Overflow with Button */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Interactive Overflow</h3>
        <BadgeOverflow
          items={projectTags}
          lineCount={1}
          renderBadge={(item) => <Badge>{item}</Badge>}
          renderOverflow={(count) => (
            <button
              className="inline-flex h-5 shrink-0 cursor-pointer items-center rounded-md border border-dashed px-1.5 font-semibold text-xs text-muted-foreground transition-colors hover:border-solid hover:text-foreground"
              onClick={() => alert(`Show ${count} more tags`)}
            >
              +{count}
            </button>
          )}
        />
      </div>

      {/* Custom Overflow with Icon */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Overflow with Icon</h3>
        <BadgeOverflow
          items={projectTags}
          lineCount={1}
          renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          renderOverflow={(count) => (
            <div className="inline-flex h-5 shrink-0 items-center gap-0.5 rounded-md bg-muted px-1.5 text-xs font-medium text-muted-foreground">
              <span>•••</span>
              <span>+{count}</span>
            </div>
          )}
        />
      </div>

      {/* Gradient Overflow */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Gradient Overflow</h3>
        <BadgeOverflow
          items={projectTags}
          lineCount={1}
          renderBadge={(item) => (
            <Badge className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              {item}
            </Badge>
          )}
          renderOverflow={(count) => (
            <div className="inline-flex h-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 text-xs font-semibold text-white shadow-md">
              +{count}
            </div>
          )}
        />
      </div>
    </div>
  );
}
