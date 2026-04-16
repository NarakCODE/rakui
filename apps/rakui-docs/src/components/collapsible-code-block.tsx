"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface CollapsibleCodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
  defaultExpanded?: boolean;
  maxLines?: number;
}

export function CollapsibleCodeBlock({
  code,
  lang = "tsx",
  className,
  defaultExpanded = false,
  maxLines = 8,
}: CollapsibleCodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const lineCount = code.split("\n").length;
  const canCollapse = lineCount > maxLines;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-b-xl border border-fd-border bg-fd-card",
        className
      )}
    >
      <div
        className={cn(
          "relative transition-all duration-300 ease-in-out",
          !isExpanded && canCollapse && "max-h-[300px] overflow-hidden"
        )}
      >
        <DynamicCodeBlock code={code} lang={lang} />

        {/* Collapse overlay - fade effect at bottom */}
        {!isExpanded && canCollapse && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-fd-card to-transparent" />
        )}
      </div>

      {/* Expand/Collapse button - Always visible when can collapse */}
      {canCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-fd-border bg-fd-muted py-2.5 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          type="button"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="size-4" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="size-4" />
              <span>Show {lineCount - maxLines} more lines</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
