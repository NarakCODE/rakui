"use client";

import { cva } from "class-variance-authority";
import {
  Direction as DirectionPrimitive,
  Slot as SlotPrimitive,
} from "radix-ui";
import * as React from "react";
import { useLazyRef } from "@/hooks/use-lazy-ref";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { useComposedRefs } from "@/lib/compose-refs";
import { cn } from "@/lib/utils";

export type Direction = "ltr" | "rtl";
export type Orientation = "vertical" | "horizontal";
export type TimelineVariant = "default" | "alternate";
export type TimelineStatus = "completed" | "active" | "pending";

interface DivProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface TimelineProps extends DivProps {
  dir?: Direction;
  orientation?: Orientation;
  variant?: TimelineVariant;
  activeIndex?: number;
}

export interface TimelineItemProps extends DivProps {}

export interface TimelineContentProps extends DivProps {}

export interface TimelineDotProps extends DivProps {}

export interface TimelineHeaderProps extends DivProps {}

export interface TimelineTitleProps extends DivProps {}

export interface TimelineDescriptionProps extends DivProps {}

export interface TimelineConnectorProps extends DivProps {
  forceMount?: boolean;
}

export interface TimelineTimeProps extends React.ComponentProps<"time"> {
  asChild?: boolean;
}

type ItemElement = HTMLDivElement;

const ROOT_NAME = "Timeline";
const ITEM_NAME = "TimelineItem";
const DOT_NAME = "TimelineDot";
const CONNECTOR_NAME = "TimelineConnector";
const CONTENT_NAME = "TimelineContent";

function getItemStatus(
  itemIndex: number,
  activeIndex?: number,
): TimelineStatus {
  if (itemIndex < 0 || activeIndex === undefined) return "pending";
  if (itemIndex < activeIndex) return "completed";
  if (itemIndex === activeIndex) return "active";
  return "pending";
}

function getSortedEntries(
  entries: [string, React.RefObject<ItemElement | null>][],
) {
  return entries.sort((a, b) => {
    const elementA = a[1].current;
    const elementB = b[1].current;

    if (!elementA || !elementB) return 0;

    const position = elementA.compareDocumentPosition(elementB);

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  notify: () => void;
  onItemRegister: (
    id: string,
    ref: React.RefObject<ItemElement | null>,
  ) => void;
  onItemUnregister: (id: string) => void;
  getNextItemStatus: (
    id: string,
    activeIndex?: number,
  ) => TimelineStatus | undefined;
  getItemIndex: (id: string) => number;
}

function useStore<T>(selector: (store: Store) => T): T {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error(`\`useStore\` must be used within \`${ROOT_NAME}\``);
  }

  const getSnapshot = React.useCallback(
    () => selector(store),
    [selector, store],
  );

  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

interface StoreState {
  items: Map<string, React.RefObject<ItemElement | null>>;
}

const StoreContext = React.createContext<Store | null>(null);

function useStoreContext(consumerName: string) {
  const context = React.useContext(StoreContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }

  return context;
}

interface TimelineContextValue {
  dir: Direction;
  orientation: Orientation;
  variant: TimelineVariant;
  activeIndex?: number;
}

const TimelineContext = React.createContext<TimelineContextValue | null>(null);

function useTimelineContext(consumerName: string) {
  const context = React.useContext(TimelineContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }

  return context;
}

const timelineVariants = cva(
  "relative flex [--timeline-connector-thickness:0.125rem] [--timeline-dot-size:0.875rem]",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-start",
      },
      variant: {
        default: "",
        alternate: "",
      },
    },
    compoundVariants: [
      {
        orientation: "vertical",
        variant: "default",
        class: "gap-6",
      },
      {
        orientation: "horizontal",
        variant: "default",
        class: "gap-8",
      },
      {
        orientation: "vertical",
        variant: "alternate",
        class: "relative w-full gap-3",
      },
      {
        orientation: "horizontal",
        variant: "alternate",
        class: "items-center gap-4",
      },
    ],
    defaultVariants: {
      orientation: "vertical",
      variant: "default",
    },
  },
);

function Timeline(props: TimelineProps) {
  const {
    orientation = "vertical",
    variant = "default",
    dir: dirProp,
    activeIndex,
    asChild,
    className,
    ...rootProps
  } = props;

  const dir = DirectionPrimitive.useDirection(dirProp) as Direction;

  const listenersRef = useLazyRef(() => new Set<() => void>());
  const stateRef = useLazyRef<StoreState>(() => ({
    items: new Map(),
  }));

  const store = React.useMemo<Store>(() => {
    return {
      subscribe: (callback) => {
        listenersRef.current.add(callback);
        return () => listenersRef.current.delete(callback);
      },
      getState: () => stateRef.current,
      notify: () => {
        for (const callback of listenersRef.current) {
          callback();
        }
      },
      onItemRegister: (
        id: string,
        ref: React.RefObject<ItemElement | null>,
      ) => {
        stateRef.current.items.set(id, ref);
        store.notify();
      },
      onItemUnregister: (id: string) => {
        stateRef.current.items.delete(id);
        store.notify();
      },
      getNextItemStatus: (id: string, index?: number) => {
        const entries = Array.from(stateRef.current.items.entries());
        const sortedEntries = getSortedEntries(entries);

        const currentIndex = sortedEntries.findIndex(([key]) => key === id);

        if (currentIndex === -1 || currentIndex === sortedEntries.length - 1) {
          return undefined;
        }

        return getItemStatus(currentIndex + 1, index);
      },
      getItemIndex: (id: string) => {
        const entries = Array.from(stateRef.current.items.entries());
        const sortedEntries = getSortedEntries(entries);

        return sortedEntries.findIndex(([key]) => key === id);
      },
    };
  }, [listenersRef, stateRef]);

  const contextValue = React.useMemo<TimelineContextValue>(
    () => ({
      dir,
      orientation,
      variant,
      activeIndex,
    }),
    [activeIndex, dir, orientation, variant],
  );

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <StoreContext.Provider value={store}>
      <TimelineContext.Provider value={contextValue}>
        <RootPrimitive
          role="list"
          aria-orientation={orientation}
          data-slot="timeline"
          data-orientation={orientation}
          data-variant={variant}
          dir={dir}
          {...rootProps}
          className={cn(timelineVariants({ orientation, variant, className }))}
        />
      </TimelineContext.Provider>
    </StoreContext.Provider>
  );
}

interface TimelineItemContextValue {
  id: string;
  status: TimelineStatus;
  isAlternateRight: boolean;
}

const TimelineItemContext =
  React.createContext<TimelineItemContextValue | null>(null);

function useTimelineItemContext(consumerName: string) {
  const context = React.useContext(TimelineItemContext);

  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ITEM_NAME}\``);
  }

  return context;
}

const timelineItemVariants = cva("relative flex", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "",
    },
    variant: {
      default: "",
      alternate: "",
    },
    isAlternateRight: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      class: "gap-3 pb-8 last:pb-0",
    },
    {
      orientation: "horizontal",
      variant: "default",
      class: "flex-col gap-3",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      class: "w-1/2 gap-3 pr-6 pb-12 last:pb-0",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      class: "ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0",
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

function TimelineItem(props: TimelineItemProps) {
  const { asChild, className, id, ref, ...itemProps } = props;
  const { dir, orientation, variant, activeIndex } =
    useTimelineContext(ITEM_NAME);
  const store = useStoreContext(ITEM_NAME);

  const instanceId = React.useId();
  const itemId = id ?? instanceId;
  const itemRef = React.useRef<ItemElement | null>(null);
  const composedRef = useComposedRefs(ref, itemRef);

  const itemIndex = useStore((state) => state.getItemIndex(itemId));

  const status = React.useMemo<TimelineStatus>(() => {
    return getItemStatus(itemIndex, activeIndex);
  }, [activeIndex, itemIndex]);

  useIsomorphicLayoutEffect(() => {
    store.onItemRegister(itemId, itemRef);

    return () => {
      store.onItemUnregister(itemId);
    };
  }, [itemId, store]);

  const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1;

  const itemContextValue = React.useMemo<TimelineItemContextValue>(
    () => ({
      id: itemId,
      status,
      isAlternateRight,
    }),
    [isAlternateRight, itemId, status],
  );

  const ItemPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <TimelineItemContext.Provider value={itemContextValue}>
      <ItemPrimitive
        role="listitem"
        aria-current={status === "active" ? "step" : undefined}
        data-slot="timeline-item"
        data-status={status}
        data-orientation={orientation}
        data-alternate-right={isAlternateRight ? "" : undefined}
        id={itemId}
        dir={dir}
        {...itemProps}
        ref={composedRef}
        className={cn(
          timelineItemVariants({
            orientation,
            variant,
            isAlternateRight,
            className,
          }),
        )}
      />
    </TimelineItemContext.Provider>
  );
}

const timelineContentVariants = cva("flex-1", {
  variants: {
    orientation: {
      vertical: "",
      horizontal: "",
    },
    variant: {
      default: "",
      alternate: "",
    },
    isAlternateRight: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "alternate",
      orientation: "vertical",
      isAlternateRight: false,
      class: "text-right",
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: false,
      class: "row-start-3 pt-2",
    },
    {
      variant: "alternate",
      orientation: "horizontal",
      isAlternateRight: true,
      class: "row-start-1 pb-2",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

function TimelineContent(props: TimelineContentProps) {
  const { asChild, className, ...contentProps } = props;
  const { variant, orientation } = useTimelineContext(CONTENT_NAME);
  const { status, isAlternateRight } = useTimelineItemContext(CONTENT_NAME);

  const ContentPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ContentPrimitive
      data-slot="timeline-content"
      data-status={status}
      {...contentProps}
      className={cn(
        timelineContentVariants({
          orientation,
          variant,
          isAlternateRight,
          className,
        }),
      )}
    />
  );
}

const timelineDotVariants = cva(
  "relative z-10 flex size-[var(--timeline-dot-size)] shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      status: {
        completed: "border-primary",
        active: "border-primary",
        pending: "border-border",
      },
      orientation: {
        vertical: "",
        horizontal: "",
      },
      variant: {
        default: "",
        alternate: "",
      },
      isAlternateRight: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "alternate",
        orientation: "vertical",
        isAlternateRight: false,
        class:
          "absolute -right-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background",
      },
      {
        variant: "alternate",
        orientation: "vertical",
        isAlternateRight: true,
        class:
          "absolute -left-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background",
      },
      {
        variant: "alternate",
        orientation: "horizontal",
        class: "row-start-2 bg-background",
      },
      {
        variant: "alternate",
        status: "completed",
        class: "bg-background",
      },
      {
        variant: "alternate",
        status: "active",
        class: "bg-background",
      },
    ],
    defaultVariants: {
      status: "pending",
      orientation: "vertical",
      variant: "default",
      isAlternateRight: false,
    },
  },
);

function TimelineDot(props: TimelineDotProps) {
  const { asChild, className, ...dotProps } = props;
  const { orientation, variant } = useTimelineContext(DOT_NAME);
  const { status, isAlternateRight } = useTimelineItemContext(DOT_NAME);

  const DotPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <DotPrimitive
      data-slot="timeline-dot"
      data-status={status}
      data-orientation={orientation}
      {...dotProps}
      className={cn(
        timelineDotVariants({
          status,
          orientation,
          variant,
          isAlternateRight,
          className,
        }),
      )}
    />
  );
}

const timelineConnectorVariants = cva("absolute z-0", {
  variants: {
    isCompleted: {
      true: "bg-primary",
      false: "bg-border",
    },
    orientation: {
      vertical: "",
      horizontal: "",
    },
    variant: {
      default: "",
      alternate: "",
    },
    isAlternateRight: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "default",
      class:
        "start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] top-3 h-[calc(100%+0.5rem)] w-[var(--timeline-connector-thickness)]",
    },
    {
      orientation: "horizontal",
      variant: "default",
      class:
        "start-3 top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: false,
      class:
        "top-2 -right-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]",
    },
    {
      orientation: "vertical",
      variant: "alternate",
      isAlternateRight: true,
      class:
        "top-2 -left-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]",
    },
    {
      orientation: "horizontal",
      variant: "alternate",
      class:
        "top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]",
    },
  ],
  defaultVariants: {
    isCompleted: false,
    orientation: "vertical",
    variant: "default",
    isAlternateRight: false,
  },
});

function TimelineConnector(props: TimelineConnectorProps) {
  const { asChild, forceMount, className, ...connectorProps } = props;
  const { orientation, variant, activeIndex } =
    useTimelineContext(CONNECTOR_NAME);
  const { id, status, isAlternateRight } =
    useTimelineItemContext(CONNECTOR_NAME);

  const nextItemStatus = useStore((state) =>
    state.getNextItemStatus(id, activeIndex),
  );

  const isLastItem = nextItemStatus === undefined;

  if (!forceMount && isLastItem) return null;

  const isConnectorCompleted =
    nextItemStatus === "completed" || nextItemStatus === "active";

  const ConnectorPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ConnectorPrimitive
      aria-hidden="true"
      data-slot="timeline-connector"
      data-completed={isConnectorCompleted ? "" : undefined}
      data-status={status}
      data-orientation={orientation}
      {...connectorProps}
      className={cn(
        timelineConnectorVariants({
          isCompleted: isConnectorCompleted,
          orientation,
          variant,
          isAlternateRight,
          className,
        }),
      )}
    />
  );
}

function TimelineHeader(props: TimelineHeaderProps) {
  const { asChild, className, ...headerProps } = props;

  const HeaderPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <HeaderPrimitive
      data-slot="timeline-header"
      {...headerProps}
      className={cn("flex flex-col gap-1", className)}
    />
  );
}

function TimelineTitle(props: TimelineTitleProps) {
  const { asChild, className, ...titleProps } = props;

  const TitlePrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <TitlePrimitive
      data-slot="timeline-title"
      {...titleProps}
      className={cn("font-semibold leading-none", className)}
    />
  );
}

function TimelineDescription(props: TimelineDescriptionProps) {
  const { asChild, className, ...descriptionProps } = props;

  const DescriptionPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <DescriptionPrimitive
      data-slot="timeline-description"
      {...descriptionProps}
      className={cn("text-muted-foreground text-sm", className)}
    />
  );
}

function TimelineTime(props: TimelineTimeProps) {
  const { asChild, className, ...timeProps } = props;

  const TimePrimitive = asChild ? SlotPrimitive.Slot : "time";

  return (
    <TimePrimitive
      data-slot="timeline-time"
      {...timeProps}
      className={cn("text-muted-foreground text-xs", className)}
    />
  );
}

export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
};
