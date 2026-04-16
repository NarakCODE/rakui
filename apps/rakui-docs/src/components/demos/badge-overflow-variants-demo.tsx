"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeOverflow } from "@/components/ui/badge-overflow";

const categories = [
  { name: "Technology", color: "blue" as const },
  { name: "Design", color: "purple" as const },
  { name: "Business", color: "green" as const },
  { name: "Marketing", color: "orange" as const },
  { name: "Sales", color: "pink" as const },
  { name: "Support", color: "cyan" as const },
  { name: "Research", color: "indigo" as const },
  { name: "Analytics", color: "teal" as const },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300" },
  purple: { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-700 dark:text-purple-300" },
  green: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900", text: "text-orange-700 dark:text-orange-300" },
  pink: { bg: "bg-pink-100 dark:bg-pink-900", text: "text-pink-700 dark:text-pink-300" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900", text: "text-cyan-700 dark:text-cyan-300" },
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-900", text: "text-indigo-700 dark:text-indigo-300" },
  teal: { bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
};

type Category = (typeof categories)[number];

export function BadgeOverflowVariantsDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Solid Variants */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Solid Variants</h3>
        <BadgeOverflow
          items={["Default", "Secondary", "Destructive"]}
          lineCount={1}
          renderBadge={(item: string) => (
            <Badge variant={item.toLowerCase() as any}>{item}</Badge>
          )}
        />
      </div>

      {/* Outline Variant */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Outline Variant</h3>
        <BadgeOverflow
          items={["Outline", "Tags", "Categories", "Labels"]}
          lineCount={1}
          renderBadge={(item: string) => <Badge variant="outline">{item}</Badge>}
        />
      </div>

      {/* Semantic Variants */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Semantic Variants</h3>
        <BadgeOverflow
          items={["Success", "Warning", "Info", "Default"]}
          lineCount={1}
          renderBadge={(item: string) => (
            <Badge variant={item.toLowerCase() as any}>{item}</Badge>
          )}
        />
      </div>

      {/* Custom Colored Badges */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Custom Colored Badges</h3>
        <BadgeOverflow
          items={categories}
          lineCount={1}
          getBadgeLabel={(item: Category) => item.name}
          renderBadge={(item: Category) => {
            const colors = colorMap[item.color]!;
            return (
              <Badge className={`${colors.bg} ${colors.text}`}>
                {item.name}
              </Badge>
            );
          }}
        />
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Badges with Custom Styling</h3>
        <BadgeOverflow
          items={["🎨 Design", "💻 Code", "📊 Analytics", "🚀 Deploy", "🔒 Security"]}
          lineCount={1}
          renderBadge={(item: string) => (
            <Badge className="rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0">
              {item}
            </Badge>
          )}
        />
      </div>
    </div>
  );
}
