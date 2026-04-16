"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface MeterProps {
  label?: string
  value: number
  className?: string
}

function Meter({ label = "Storage", value, className }: MeterProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          {Math.round(clampedValue)}%
        </span>
      </div>
      <Progress value={clampedValue} />
    </div>
  )
}

export { Meter }
