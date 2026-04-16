"use client";

import * as React from "react";
import { Bell, LayoutGrid, Search, Sparkles, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tour,
  TourArrow,
  TourClose,
  TourDescription,
  TourFooter,
  TourHeader,
  TourNext,
  TourPortal,
  TourPrev,
  TourSkip,
  TourSpotlight,
  TourSpotlightRing,
  TourStep,
  TourStepCounter,
  TourTitle,
} from "@/components/ui/tour";

const campaignRows = [
  { label: "Open pipeline", value: "$142k" },
  { label: "Reply rate", value: "38%" },
  { label: "Tasks due today", value: "7" },
];

export function TourDemo() {
  const searchRef = React.useRef<HTMLDivElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);
  const insightsRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState("Ready to guide a new teammate.");

  function startTour() {
    setValue(0);
    setOpen(true);
    setStatus("Tour in progress.");
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-medium">
            <WandSparkles className="text-primary" />
            Growth workspace tour
          </div>
          <p className="text-muted-foreground text-sm">{status}</p>
        </div>

        <Button onClick={startTour}>
          <Sparkles data-icon="inline-start" />
          Start Tour
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="gap-0">
          <CardHeader>
            <CardTitle>Campaign console</CardTitle>
            <CardDescription>
              Search accounts, launch quick actions, and review the day&apos;s
              priorities.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div
              ref={searchRef}
              className="rounded-xl border bg-background p-3 shadow-xs"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label="Search accounts"
                    className="pl-9"
                    defaultValue="Acme, quarterly renewal"
                  />
                </div>

                <Button variant="outline">Search</Button>
              </div>
            </div>

            <div
              ref={actionsRef}
              className="grid gap-3 rounded-xl border bg-background p-3 sm:grid-cols-3"
            >
              <Button variant="outline">New list</Button>
              <Button variant="outline">Assign owner</Button>
              <Button variant="outline">Schedule send</Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-background p-4">
                <p className="font-medium text-sm">Focus queue</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Enterprise follow-up</span>
                    <span className="text-muted-foreground">12</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Proposal approvals</span>
                    <span className="text-muted-foreground">4</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Churn watchlist</span>
                    <span className="text-muted-foreground">3</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <Bell />
                  Team activity
                </div>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                  <li>Jordan moved 8 accounts to proposal review.</li>
                  <li>Rhea sent today&apos;s onboarding digest.</li>
                  <li>Three new handoff notes need approval.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card ref={insightsRef}>
          <CardHeader>
            <CardTitle>Today&apos;s snapshot</CardTitle>
            <CardDescription>
              Fast health check for the campaign team.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {campaignRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border bg-background px-3 py-2"
              >
                <span className="text-muted-foreground text-sm">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
            ))}

            <div className="rounded-lg border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground">
              Final step is marked as required, so the user has to finish the
              tour instead of dismissing it midway.
            </div>
          </CardContent>
        </Card>
      </div>

      <Tour
        open={open}
        value={value}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen && value < 2) {
            setStatus("Tour dismissed before completion.");
          }
        }}
        onValueChange={setValue}
        onComplete={() => {
          setStatus("Tour completed.");
        }}
        onSkip={() => {
          setStatus("Tour skipped.");
        }}
        stepFooter={
          <TourFooter className="sm:justify-between">
            <TourStepCounter />
            <div className="flex flex-wrap justify-end gap-2">
              <TourSkip />
              <TourPrev />
              <TourNext />
            </div>
          </TourFooter>
        }
      >
        <TourPortal>
          <TourSpotlight />
          <TourSpotlightRing />

          <TourStep align="start" side="bottom" target={searchRef}>
            <TourArrow />
            <TourClose />
            <TourHeader>
              <TourTitle>Search before you branch</TourTitle>
              <TourDescription>
                Start here to find accounts, renewals, or people before you
                queue any actions.
              </TourDescription>
            </TourHeader>
          </TourStep>

          <TourStep side="top" target={actionsRef}>
            <TourArrow />
            <TourClose />
            <TourHeader>
              <TourTitle>Quick actions stay close</TourTitle>
              <TourDescription>
                This cluster keeps the common bulk tasks one click away after
                you narrow the list.
              </TourDescription>
            </TourHeader>
          </TourStep>

          <TourStep required side="left" target={insightsRef}>
            <TourArrow />
            <TourClose />
            <TourHeader>
              <TourTitle>Finish on the team snapshot</TourTitle>
              <TourDescription>
                The last step is required. That keeps new users from missing the
                high-signal panel that summarizes what matters today.
              </TourDescription>
            </TourHeader>
          </TourStep>
        </TourPortal>
      </Tour>
    </div>
  );
}
