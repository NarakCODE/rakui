"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeOverflow } from "@/components/ui/badge-overflow";

const skillTags = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "REST",
  "Git",
  "CI/CD",
];

export function BadgeOverflowTruncationDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* No Truncation */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">No Truncation (5 items)</h3>
        <div className="w-full">
          <BadgeOverflow
            items={skillTags.slice(0, 5)}
            lineCount={1}
            renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          />
        </div>
      </div>

      {/* Truncated to fit */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Auto Truncation (20 items)</h3>
        <div className="w-full">
          <BadgeOverflow
            items={skillTags}
            lineCount={1}
            renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          />
        </div>
      </div>

      {/* Two Lines */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Two Line Overflow</h3>
        <div className="w-full">
          <BadgeOverflow
            items={skillTags}
            lineCount={2}
            renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          />
        </div>
      </div>

      {/* Narrow Container */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Narrow Container (300px)</h3>
        <div className="w-[300px]">
          <BadgeOverflow
            items={skillTags.slice(0, 10)}
            lineCount={1}
            renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          />
        </div>
      </div>

      {/* Dynamic Addition */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Responsive Behavior</h3>
        <div className="w-full max-w-lg">
          <BadgeOverflow
            items={skillTags.slice(0, 12)}
            lineCount={1}
            renderBadge={(item) => <Badge variant="info">{item}</Badge>}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Badges automatically adjust to container width
        </p>
      </div>
    </div>
  );
}
