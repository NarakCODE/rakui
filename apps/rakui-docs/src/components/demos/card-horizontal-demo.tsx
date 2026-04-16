"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CardHorizontalDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Card className="flex flex-row items-center gap-4 p-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
          <svg
            className="size-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Project Alpha</CardTitle>
            <Badge variant="secondary">Active</Badge>
          </div>
          <CardDescription className="line-clamp-2">
            A comprehensive dashboard for managing team projects and tracking progress.
          </CardDescription>
        </div>
      </Card>

      <Card className="flex flex-row items-center gap-4 p-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
          <svg
            className="size-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Analytics Beta</CardTitle>
            <Badge variant="outline">In Review</Badge>
          </div>
          <CardDescription className="line-clamp-2">
            Real-time analytics platform with advanced reporting capabilities.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
