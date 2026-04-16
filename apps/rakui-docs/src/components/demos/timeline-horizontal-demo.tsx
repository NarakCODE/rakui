"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

const timelineItems = [
  {
    id: "research-and-planning",
    dateTime: "2025-01",
    date: "Jan - Mar",
    title: "Q1",
    description: "Research and planning",
  },
  {
    id: "development-sprint",
    dateTime: "2025-04",
    date: "Apr - Jun",
    title: "Q2",
    description: "Development sprint",
  },
  {
    id: "beta-launch",
    dateTime: "2025-07",
    date: "Jul - Sep",
    title: "Q3",
    description: "Beta launch",
  },
];

export function TimelineHorizontalDemo() {
  return (
    <div className="w-full overflow-x-auto flex items-center justify-center">
      <Timeline orientation="horizontal" activeIndex={1} className="min-w-180">
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} className="min-w-52">
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <TimelineHeader>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineTime dateTime={item.dateTime}>
                  {item.date}
                </TimelineTime>
              </TimelineHeader>
              <TimelineDescription>{item.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
