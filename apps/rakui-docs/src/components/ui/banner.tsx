"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";
import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import { useAsRef } from "@/hooks/use-as-ref";
import { useLazyRef } from "@/hooks/use-lazy-ref";
import { Button } from "@/components/ui/button";

const BANNER_ANIMATION_DURATION = 400;
const DEFAULT_BANNER_PRIORITY = 0;
const DEFAULT_BANNER_DISMISSIBLE = true;

type BannerVariant = "default" | "info" | "success" | "warning" | "destructive";
type BannerSide = "top" | "bottom";

interface DivProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

interface BannerRenderProps {
  id: string;
  variant?: BannerVariant;
  dismissible: boolean;
  onClose: () => void;
  onRemove: () => void;
}

type BannerContentType =
  | React.ReactNode
  | ((props: BannerRenderProps) => React.ReactNode);

interface BannerData {
  id: string;
  content: BannerContentType;
  variant?: BannerVariant;
  priority?: number;
  dismissible?: boolean;
  duration?: number;
  onDismiss?: () => void;
}

interface StoreState {
  banners: BannerData[];
  removing: Set<string>;
  heights: Map<string, number>;
}

interface Store {
  subscribe: (callback: () => void) => () => void;
  getState: () => StoreState;
  notify: () => void;
  onBannerAdd: (banner: Omit<BannerData, "id">) => string;
  onBannerRemove: (id: string) => void;
  onBannersClear: () => void;
  onRemovingChange: (id: string, value: boolean) => void;
  onHeightChange: (id: string, height: number) => void;
  onHeightRemove: (id: string) => void;
}

const StoreContext = React.createContext<Store | null>(null);

function useStoreContext(consumerName: string) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`Banners\``);
  }
  return context;
}

function useStore<T>(store: Store, selector: (state: StoreState) => T): T {
  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  );
}

interface BannerContextValue {
  id?: string;
  variant?: BannerVariant | null;
  dismissible?: boolean;
  onClose?: () => void;
}

const BannerContext = React.createContext<BannerContextValue | null>(null);

function useBannerContext(consumerName: string) {
  const context = React.useContext(BannerContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`Banner\``);
  }
  return context;
}

function useBanner() {
  const { id, variant, dismissible, onClose } = useBannerContext("useBanner");
  const storeContext = React.useContext(StoreContext);

  return React.useMemo(() => {
    const onRemove =
      id && storeContext ? () => storeContext.onBannerRemove(id) : undefined;

    return {
      id,
      variant,
      dismissible,
      onClose,
      onRemove,
    };
  }, [id, variant, dismissible, onClose, storeContext]);
}

interface BannersProps {
  children?: React.ReactNode;
  maxVisible?: number;
  side?: BannerSide;
  container?: Element | DocumentFragment | null;
}

function Banners(props: BannersProps) {
  const {
    children,
    maxVisible = 1,
    side = "top",
    container: containerProp,
  } = props;

  const stateRef = useLazyRef<StoreState>(() => ({
    banners: [],
    removing: new Set(),
    heights: new Map(),
  }));
  const listenersRef = useLazyRef<Set<() => void>>(() => new Set());
  const timeoutsRef = useLazyRef<Map<string, ReturnType<typeof setTimeout>>>(
    () => new Map(),
  );

  const store: Store = React.useMemo(
    () => ({
      subscribe: (cb) => {
        listenersRef.current.add(cb);
        return () => listenersRef.current.delete(cb);
      },
      getState: () => stateRef.current,
      notify: () => {
        for (const listener of listenersRef.current) {
          listener();
        }
      },
      onBannerAdd: (banner) => {
        const id = crypto.randomUUID();
        const newBanner: BannerData = { ...banner, id };
        const priority = banner.priority ?? DEFAULT_BANNER_PRIORITY;

        const banners = [...stateRef.current.banners];
        const insertIndex = banners.findIndex(
          (entry) => (entry.priority ?? DEFAULT_BANNER_PRIORITY) < priority,
        );

        if (insertIndex === -1) {
          banners.push(newBanner);
        } else {
          banners.splice(insertIndex, 0, newBanner);
        }

        stateRef.current.banners = banners;
        store.notify();

        if (banner.duration && banner.duration > 0) {
          const timeoutId = setTimeout(() => {
            store.onRemovingChange(id, true);
            timeoutsRef.current.delete(id);
          }, banner.duration);
          timeoutsRef.current.set(id, timeoutId);
        }

        return id;
      },
      onBannerRemove: (id) => {
        const banner = stateRef.current.banners.find((entry) => entry.id === id);
        if (!banner) return;

        const timeoutId = timeoutsRef.current.get(id);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutsRef.current.delete(id);
        }

        const nextRemoving = new Set(stateRef.current.removing);
        nextRemoving.delete(id);
        stateRef.current.removing = nextRemoving;

        banner.onDismiss?.();
        stateRef.current.banners = stateRef.current.banners.filter(
          (entry) => entry.id !== id,
        );
        store.notify();
      },
      onBannersClear: () => {
        for (const timeoutId of timeoutsRef.current.values()) {
          clearTimeout(timeoutId);
        }

        timeoutsRef.current.clear();
        stateRef.current.removing = new Set();
        stateRef.current.heights = new Map();
        stateRef.current.banners = [];
        store.notify();
      },
      onRemovingChange: (id, value) => {
        const nextRemoving = new Set(stateRef.current.removing);
        if (value) {
          nextRemoving.add(id);
        } else {
          nextRemoving.delete(id);
        }
        stateRef.current.removing = nextRemoving;
        store.notify();
      },
      onHeightChange: (id, height) => {
        if (stateRef.current.heights.get(id) === height) return;
        const nextHeights = new Map(stateRef.current.heights);
        nextHeights.set(id, height);
        stateRef.current.heights = nextHeights;
        store.notify();
      },
      onHeightRemove: (id) => {
        if (!stateRef.current.heights.has(id)) return;
        const nextHeights = new Map(stateRef.current.heights);
        nextHeights.delete(id);
        stateRef.current.heights = nextHeights;
        store.notify();
      },
    }),
    [listenersRef, stateRef, timeoutsRef],
  );

  const banners = useStore(store, (state) => state.banners);
  const heights = useStore(store, (state) => state.heights);
  const visibleBanners = banners.slice(0, maxVisible);
  const container = containerProp ?? globalThis.document?.body ?? null;

  const totalHeight = React.useMemo(() => {
    let total = 0;
    for (const banner of visibleBanners) {
      total += heights.get(banner.id) ?? 0;
    }
    return total;
  }, [visibleBanners, heights]);

  return (
    <StoreContext.Provider value={store}>
      {children}
      {container && visibleBanners.length > 0
        ? ReactDOM.createPortal(
            <div
              aria-live="off"
              data-side={side}
              data-slot="banner-container"
              className={cn(
                "pointer-events-none fixed inset-x-0 isolate z-50",
                side === "top" ? "top-0" : "bottom-0",
              )}
              style={{
                height: totalHeight > 0 ? totalHeight : "auto",
                transition: `height ${BANNER_ANIMATION_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1)`,
              }}
            >
              {visibleBanners.map((banner, index) => (
                <BannerImpl
                  key={banner.id}
                  banner={banner}
                  index={index}
                  side={side}
                />
              ))}
            </div>,
            container,
          )
        : null}
    </StoreContext.Provider>
  );
}

function useBanners() {
  const store = useStoreContext("useBanners");
  const banners = useStore(store, (state) => state.banners);

  return React.useMemo(
    () => ({
      onBannerAdd: store.onBannerAdd,
      onBannerRemove: store.onBannerRemove,
      onBannersClear: store.onBannersClear,
      banners,
    }),
    [store, banners],
  );
}

const bannerVariants = cva(
  "pointer-events-auto relative flex w-full items-center gap-3 border-b px-4 py-3 text-sm motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info:
          "border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-50",
        success:
          "border-green-200 bg-green-50 text-green-950 dark:border-green-900 dark:bg-green-950 dark:text-green-50",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-950 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-50",
        destructive:
          "border-red-200 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BannerImplProps {
  banner: BannerData;
  side: BannerSide;
  index: number;
}

function BannerImpl(props: BannerImplProps) {
  const { banner, side, index } = props;

  const store = useStoreContext("BannerImpl");
  const removing = useStore(store, (state) => state.removing.has(banner.id));
  const banners = useStore(store, (state) => state.banners);
  const heights = useStore(store, (state) => state.heights);

  const [mounted, setMounted] = React.useState(false);
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const offsetBeforeRemoveRef = React.useRef(0);

  const offset = React.useMemo(() => {
    let total = 0;
    for (const entry of banners) {
      if (entry.id === banner.id) break;
      total += heights.get(entry.id) ?? 0;
    }
    return total;
  }, [banners, heights, banner.id]);

  if (!removing) {
    offsetBeforeRemoveRef.current = offset;
  }

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  React.useLayoutEffect(() => {
    if (!bannerRef.current || removing) return;
    const height = bannerRef.current.getBoundingClientRect().height;
    store.onHeightChange(banner.id, height);
  }, [store, banner.id, removing]);

  React.useEffect(() => {
    if (!removing) return;
    store.onHeightRemove(banner.id);
    const timeoutId = setTimeout(
      () => store.onBannerRemove(banner.id),
      BANNER_ANIMATION_DURATION,
    );
    return () => clearTimeout(timeoutId);
  }, [removing, store, banner.id]);

  const onClose = React.useCallback(
    () => store.onRemovingChange(banner.id, true),
    [store, banner.id],
  );

  const onRemove = React.useCallback(
    () => store.onBannerRemove(banner.id),
    [store, banner.id],
  );

  const dismissible = banner.dismissible ?? DEFAULT_BANNER_DISMISSIBLE;

  const contextValue = React.useMemo<BannerContextValue>(
    () => ({ id: banner.id, variant: banner.variant, dismissible, onClose }),
    [banner.id, banner.variant, dismissible, onClose],
  );

  const renderProps = React.useMemo<BannerRenderProps>(
    () => ({
      id: banner.id,
      variant: banner.variant,
      dismissible,
      onClose,
      onRemove,
    }),
    [banner.id, banner.variant, dismissible, onClose, onRemove],
  );

  const currentOffset = removing ? offsetBeforeRemoveRef.current : offset;
  const isTop = side === "top";
  const isAssertive =
    banner.variant === "warning" || banner.variant === "destructive";

  function getTransform() {
    if (!mounted) return isTop ? "translateY(-100%)" : "translateY(100%)";
    if (removing) {
      return isTop
        ? `translateY(calc(${currentOffset}px - 100%))`
        : `translateY(calc(-${currentOffset}px + 100%))`;
    }
    return isTop
      ? `translateY(${currentOffset}px)`
      : `translateY(-${currentOffset}px)`;
  }

  return (
    <BannerContext.Provider value={contextValue}>
      <div
        ref={bannerRef}
        aria-atomic="true"
        aria-live={isAssertive ? "assertive" : "polite"}
        data-front={index === 0}
        data-index={index}
        data-mounted={mounted}
        data-removed={removing}
        data-side={side}
        data-slot="queued-banner"
        data-state={removing ? "closed" : "open"}
        role={isAssertive ? "alert" : "status"}
        className={bannerVariants({ variant: banner.variant })}
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: 0,
          left: 0,
          right: 0,
          zIndex: removing ? 0 : 50 - index,
          transform: getTransform(),
          opacity: mounted && !removing ? 1 : 0,
          transition: `transform ${BANNER_ANIMATION_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${removing ? BANNER_ANIMATION_DURATION / 2 : BANNER_ANIMATION_DURATION}ms ease`,
        }}
      >
        {typeof banner.content === "function"
          ? banner.content(renderProps)
          : banner.content}
      </div>
    </BannerContext.Provider>
  );
}

interface BannerProps extends DivProps, VariantProps<typeof bannerVariants> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDismiss?: () => void;
  priority?: number;
  dismissible?: boolean;
  duration?: number;
}

function Banner(props: BannerProps) {
  const {
    className,
    variant = "default",
    open: openProp,
    defaultOpen,
    onOpenChange,
    onDismiss,
    priority,
    dismissible = DEFAULT_BANNER_DISMISSIBLE,
    duration,
    children,
    asChild,
    ...rootProps
  } = props;

  const store = React.useContext(StoreContext);
  const isInsideStore = store !== null;
  const isControlled = openProp !== undefined;

  const openRef = useLazyRef(() => openProp ?? defaultOpen ?? true);
  const listenersRef = useLazyRef<Set<() => void>>(() => new Set());
  const bannerIdRef = React.useRef<string | null>(null);
  const childrenRef = useAsRef(children);
  const onDismissRef = useAsRef(onDismiss);
  const onOpenChangeRef = useAsRef(onOpenChange);

  if (isControlled) {
    openRef.current = openProp;
  }

  const subscribe = React.useCallback(
    (cb: () => void) => {
      listenersRef.current.add(cb);
      return () => listenersRef.current.delete(cb);
    },
    [listenersRef],
  );

  const getSnapshot = React.useCallback(() => openRef.current, [openRef]);
  const open = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  React.useEffect(() => {
    if (!isInsideStore || !store || !open) return;
    if (bannerIdRef.current) return;

    const id = store.onBannerAdd({
      content: () => childrenRef.current,
      variant: variant ?? undefined,
      priority,
      dismissible,
      duration,
      onDismiss: () => {
        onDismissRef.current?.();
        onOpenChangeRef.current?.(false);
      },
    });
    bannerIdRef.current = id;

    return () => {
      if (bannerIdRef.current) {
        store.onBannerRemove(bannerIdRef.current);
        bannerIdRef.current = null;
      }
    };
  }, [
    childrenRef,
    dismissible,
    duration,
    isInsideStore,
    onDismissRef,
    onOpenChangeRef,
    open,
    priority,
    store,
    variant,
  ]);

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      openRef.current = false;
      for (const listener of listenersRef.current) {
        listener();
      }
    }
    onOpenChangeRef.current?.(false);
  }, [isControlled, listenersRef, onOpenChangeRef, openRef]);

  const contextValue = React.useMemo<BannerContextValue>(
    () => ({
      variant,
      dismissible,
      onClose,
    }),
    [variant, dismissible, onClose],
  );

  if (!open || isInsideStore) return null;

  const RootPrimitive = asChild ? SlotPrimitive.Slot : "div";
  const isAssertive = variant === "warning" || variant === "destructive";

  return (
    <BannerContext.Provider value={contextValue}>
      <RootPrimitive
        aria-atomic="true"
        aria-live={isAssertive ? "assertive" : "polite"}
        data-slot="banner"
        data-state="open"
        role={isAssertive ? "alert" : "status"}
        className={cn(bannerVariants({ variant, className }))}
        {...rootProps}
      >
        {children}
      </RootPrimitive>
    </BannerContext.Provider>
  );
}

function BannerIcon(props: DivProps) {
  const { className, asChild, ...iconProps } = props;
  const IconPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <IconPrimitive
      data-slot="banner-icon"
      className={cn("flex shrink-0 items-center [&>svg]:size-4", className)}
      {...iconProps}
    />
  );
}

function BannerContent(props: DivProps) {
  const { className, asChild, ...contentProps } = props;
  const ContentPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ContentPrimitive
      data-slot="banner-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...contentProps}
    />
  );
}

function BannerTitle(props: React.ComponentProps<"div">) {
  const { className, ...titleProps } = props;

  return (
    <div
      data-slot="banner-title"
      className={cn("font-medium text-sm leading-none", className)}
      {...titleProps}
    />
  );
}

function BannerDescription(props: React.ComponentProps<"div">) {
  const { className, ...descriptionProps } = props;

  return (
    <div
      data-slot="banner-description"
      className={cn("text-xs opacity-90", className)}
      {...descriptionProps}
    />
  );
}

function BannerActions(props: DivProps) {
  const { className, asChild, ...actionsProps } = props;
  const ActionsPrimitive = asChild ? SlotPrimitive.Slot : "div";

  return (
    <ActionsPrimitive
      data-slot="banner-actions"
      className={cn("flex items-center gap-2", className)}
      {...actionsProps}
    />
  );
}

function BannerClose(props: React.ComponentProps<typeof Button>) {
  const {
    children,
    onClick: onClickProp,
    isDisabled: isDisabledProp,
    "aria-label": ariaLabel,
    ...closeProps
  } = props;
  const { dismissible = DEFAULT_BANNER_DISMISSIBLE, onClose } =
    useBannerContext("BannerClose");

  const isDisabled = isDisabledProp ?? !dismissible;

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClickProp?.(event);
      if (event.defaultPrevented || isDisabled) return;
      onClose?.();
    },
    [isDisabled, onClickProp, onClose],
  );

  return (
    <Button
      aria-label={ariaLabel ?? "Dismiss banner"}
      data-slot="banner-close"
      isDisabled={isDisabled}
      isIconOnly
      size="sm"
      variant="ghost"
      onClick={onClick}
      {...closeProps}
    >
      {children ?? <X aria-hidden="true" className="size-3.5" weight="bold" />}
    </Button>
  );
}

export {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  Banners,
  BannerTitle,
  useBanner,
  useBanners,
};

export type {
  BannerProps,
  BannersProps,
  BannerRenderProps,
  BannerSide,
  BannerVariant,
};
