"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CollapsibleCodeBlock } from "@/components/collapsible-code-block";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { ActionBarDemo } from "@/components/demos/action-bar-demo";
import { AngleSliderControlledDemo } from "@/components/demos/angle-slider-controlled-demo";
import { AngleSliderDemo } from "@/components/demos/angle-slider-demo";
import { AngleSliderFormDemo } from "@/components/demos/angle-slider-form-demo";
import { AngleSliderRangeDemo } from "@/components/demos/angle-slider-range-demo";
import { AngleSliderThemesDemo } from "@/components/demos/angle-slider-themes-demo";
import { AvatarGroupCustomOverflowDemo } from "@/components/demos/avatar-group-custom-overflow-demo";
import { AvatarGroupDemo } from "@/components/demos/avatar-group-demo";
import { AvatarGroupIconsDemo } from "@/components/demos/avatar-group-icons-demo";
import { AvatarGroupRtlDemo } from "@/components/demos/avatar-group-rtl-demo";
import { AvatarGroupTruncationDemo } from "@/components/demos/avatar-group-truncation-demo";
import { BannerDemo } from "@/components/demos/banner-demo";
import { BadgeOverflowCustomOverflowDemo } from "@/components/demos/badge-overflow-custom-overflow-demo";
import { BadgeOverflowDemo } from "@/components/demos/badge-overflow-demo";
import { BadgeOverflowInteractiveDemo } from "@/components/demos/badge-overflow-interactive-demo";
import { BadgeOverflowMultilineDemo } from "@/components/demos/badge-overflow-multiline-demo";
import { BadgeOverflowTruncationDemo } from "@/components/demos/badge-overflow-truncation-demo";
import { BadgeOverflowVariantsDemo } from "@/components/demos/badge-overflow-variants-demo";
import { ButtonDemo } from "@/components/demos/button-demo";
import { ButtonGroupDemo } from "@/components/demos/button-group-demo";
import { ButtonGroupDisabled } from "@/components/demos/button-group-disabled";
import { ButtonGroupFullWidth } from "@/components/demos/button-group-full-width";
import { ButtonGroupOrientation } from "@/components/demos/button-group-orientation";
import { ButtonGroupSizes } from "@/components/demos/button-group-sizes";
import { ButtonGroupVariants } from "@/components/demos/button-group-variants";
import { ButtonGroupWithIcons } from "@/components/demos/button-group-with-icons";
import { CheckboxGroupDemo } from "@/components/demos/checkbox-group-demo";
import { ComboboxDemo } from "@/components/demos/combobox-demo";
import { CheckboxGroupHorizontalDemo } from "@/components/demos/checkbox-group-horizontal-demo";
import { CheckboxGroupMultiSelectionDemo } from "@/components/demos/checkbox-group-multi-selection-demo";
import { CheckboxGroupValidationDemo } from "@/components/demos/checkbox-group-validation-demo";
import { CircularProgressDemo } from "@/components/demos/circular-progress-demo";
import { CircularProgressControlledDemo } from "@/components/demos/circular-progress-controlled-demo";
import { CircularProgressColorsDemo } from "@/components/demos/circular-progress-colors-demo";
import { CompareSliderControlledDemo } from "@/components/demos/compare-slider-controlled-demo";
import { CompareSliderCustomDemo } from "@/components/demos/compare-slider-custom-demo";
import { CompareSliderDemo } from "@/components/demos/compare-slider-demo";
import { CompareSliderHoverDemo } from "@/components/demos/compare-slider-hover-demo";
import { CompareSliderVerticalDemo } from "@/components/demos/compare-slider-vertical-demo";
import { DashboardTemplateDemo } from "@/components/demos/dashboard-template-demo";
import { DataGridDemo } from "@/components/demos/data-grid-demo";
import { KanbanDemo } from "@/components/demos/kanban-demo";
import { KanbanDynamicOverlayDemo } from "@/components/demos/kanban-dynamic-overlay-demo";
import { ListboxDemo } from "@/components/demos/listbox-demo";
import { ListboxHorizontalDemo } from "@/components/demos/listbox-horizontal-demo";
import { ListboxGridDemo } from "@/components/demos/listbox-grid-demo";
import { ListboxGroupDemo } from "@/components/demos/listbox-group-demo";
import { MarqueeDemo } from "@/components/demos/marquee-demo";
import { MarqueeLogoDemo } from "@/components/demos/marquee-logo-demo";
import { MarqueeVerticalDemo } from "@/components/demos/marquee-vertical-demo";
import { MarqueeRtlDemo } from "@/components/demos/marquee-rtl-demo";
import { MasonryDemo } from "@/components/demos/masonry-demo";
import { MasonryLinearDemo } from "@/components/demos/masonry-linear-demo";
import { MasonrySSRDemo } from "@/components/demos/masonry-ssr-demo";
import { MaskInputDemo } from "@/components/demos/mask-input-demo";
import { MaskInputCustomPatternDemo } from "@/components/demos/mask-input-custom-pattern-demo";
import { MentionDemo } from "@/components/demos/mention-demo";
import { PhoneInputDemo } from "@/components/demos/phone-input-demo";
import { SortableDemo } from "@/components/demos/sortable-demo";
import { SortableHorizontalDemo } from "@/components/demos/sortable-horizontal-demo";
import { SortablePrimitiveValuesDemo } from "@/components/demos/sortable-primitive-values-demo";
import { StatDemo } from "@/components/demos/stat-demo";
import { StatIndicatorDemo } from "@/components/demos/stat-indicator-demo";
import { SortableWithHandleDemo } from "@/components/demos/sortable-with-handle-demo";
import { SpeedDialDemo } from "@/components/demos/speed-dial-demo";
import { SpeedDialLabelsDemo } from "@/components/demos/speed-dial-labels-demo";
import { SpeedDialHoverDemo } from "@/components/demos/speed-dial-hover-demo";
import { SpeedDialControlledDemo } from "@/components/demos/speed-dial-controlled-demo";
import { SpeedDialSideDemo } from "@/components/demos/speed-dial-side-demo";
import { SpeedDialFixedDemo } from "@/components/demos/speed-dial-fixed-demo";
import { TimelineAlternateDemo } from "@/components/demos/timeline-alternate-demo";
import { TimelineCustomDotDemo } from "@/components/demos/timeline-custom-dot-demo";
import { TimelineHorizontalDemo } from "@/components/demos/timeline-horizontal-demo";
import { TimelineRtlDemo } from "@/components/demos/timeline-rtl-demo";
import { SwapControlledDemo } from "@/components/demos/swap-controlled-demo";
import { SwapDemo } from "@/components/demos/swap-demo";
import { SwapFlipDemo } from "@/components/demos/swap-flip-demo";
import { SwapHoverDemo } from "@/components/demos/swap-hover-demo";
import { SwapRotateDemo } from "@/components/demos/swap-rotate-demo";
import { SwapAnimationsDemo } from "@/components/demos/swap-animations-demo";
import { SwapScaleDemo } from "@/components/demos/swap-scale-demo";
import { CardDemo } from "@/components/demos/card-demo";
import { CardHorizontalDemo } from "@/components/demos/card-horizontal-demo";
import { CardVariantsDemo } from "@/components/demos/card-variants-demo";
import { CardWithAvatarDemo } from "@/components/demos/card-with-avatar-demo";
import { CardWithFormDemo } from "@/components/demos/card-with-form-demo";
import { CardWithImageDemo } from "@/components/demos/card-with-image-demo";
import { StatusDemo } from "@/components/demos/status-demo";
import { StatusListDemo } from "@/components/demos/status-list-demo";
import { StatusTextOnlyDemo } from "@/components/demos/status-text-only-demo";
import { StatusVariantsDemo } from "@/components/demos/status-variants-demo";
import { TimelineDemo } from "@/components/demos/timeline-demo";
import { StepperDemo } from "@/components/demos/stepper-demo";
import { StepperVerticalDemo } from "@/components/demos/stepper-vertical-demo";
import { StepperValidationDemo } from "@/components/demos/stepper-validation-demo";
import { StepperFormDemo } from "@/components/demos/stepper-form-demo";
import { SelectionToolbarDemo } from "@/components/demos/selection-toolbar-demo";
import { SelectionToolbarInfoDemo } from "@/components/demos/selection-toolbar-info-demo";
import { TourDemo } from "@/components/demos/tour-demo";
import { StackDemo } from "@/components/demos/stack-demo";
import { StackWithoutExpansionDemo } from "@/components/demos/stack-without-expansion-demo";
import { StackSideDemo } from "@/components/demos/stack-side-demo";
import { SegmentedInputDemo } from "@/components/demos/segmented-input-demo";
import { SegmentedInputFormDemo } from "@/components/demos/segmented-input-form-demo";
import { SegmentedInputRgbDemo } from "@/components/demos/segmented-input-rgb-demo";
import { SegmentedInputVerticalDemo } from "@/components/demos/segmented-input-vertical-demo";
import { TagsInputDemo } from "@/components/demos/tags-input-demo";
import { TagsInputEditableDemo } from "@/components/demos/tags-input-editable-demo";
import { TagsInputValidationDemo } from "@/components/demos/tags-input-validation-demo";
import { TagsInputSortableDemo } from "@/components/demos/tags-input-sortable-demo";

interface ComponentPreviewContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  minHeight?: string;
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
}

function ComponentPreviewContainer({
  align = "center",
  children,
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  minHeight,
  name,
  style,
  ...props
}: React.PropsWithChildren<ComponentPreviewContainerProps>) {
  const [component, code] = React.Children.toArray(
    children,
  ) as React.ReactElement[];

  const alignmentClasses = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  };

  return (
    <div
      className={cn(
        "component-preview-container group relative w-full",
        className,
      )}
      data-name={name}
      style={{ ...style, contain: style?.contain ?? "content" }}
      {...props}
    >
      {!!description && (
        <p className="mb-2 text-sm text-muted-foreground">{description}</p>
      )}

      <div
        data-name={name}
        className={cn(
          "preview not-prose relative flex min-h-87.5 w-full overflow-hidden rounded-t-xl border-x border-t border-border p-4 sm:p-10",
          isBgSolid && "bg-background",
          !isBgSolid && "bg-background",
          alignmentClasses[align],
        )}
      >
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />{" "}
        <div
          className="relative flex w-full items-center justify-center"
          style={minHeight ? { minHeight } : undefined}
        >
          {component}
        </div>
      </div>

      {!hideCode && code ? code : null}
    </div>
  );
}

type ComponentPreviewClientProps = {
  children: ReactNode;
  className?: string;
  code: string;
  lang?: string;
  previewClassName?: string;
  title?: string;
  description?: string;
};

export function ComponentPreviewClient({
  children,
  className,
  code,
  lang = "tsx",
  previewClassName,
  title,
  description,
}: ComponentPreviewClientProps) {
  return (
    <ComponentPreviewContainer
      className={className}
      description={description}
      name={title ?? "component-preview"}
    >
      <div
        className={cn(
          "rounded-xl border border-dashed border-border bg-background p-8 shadow-sm",
          previewClassName,
        )}
      >
        {children}
      </div>

      <CollapsibleCodeBlock code={code} lang={lang} />
    </ComponentPreviewContainer>
  );
}

// Registry of demo components
const demoComponents: Record<string, React.ComponentType> = {
  "action-bar-demo": ActionBarDemo,
  "button-demo": ButtonDemo,
  "button-group-demo": ButtonGroupDemo,
  "button-group-disabled": ButtonGroupDisabled,
  "button-group-full-width": ButtonGroupFullWidth,
  "button-group-orientation": ButtonGroupOrientation,
  "button-group-sizes": ButtonGroupSizes,
  "button-group-variants": ButtonGroupVariants,
  "button-group-with-icons": ButtonGroupWithIcons,
  "angle-slider-controlled-demo": AngleSliderControlledDemo,
  "angle-slider-demo": AngleSliderDemo,
  "angle-slider-form-demo": AngleSliderFormDemo,
  "angle-slider-range-demo": AngleSliderRangeDemo,
  "angle-slider-themes-demo": AngleSliderThemesDemo,
  "avatar-group-demo": AvatarGroupDemo,
  "avatar-group-truncation-demo": AvatarGroupTruncationDemo,
  "avatar-group-icons-demo": AvatarGroupIconsDemo,
  "avatar-group-rtl-demo": AvatarGroupRtlDemo,
  "avatar-group-custom-overflow-demo": AvatarGroupCustomOverflowDemo,
  "banner-demo": BannerDemo,
  "badge-overflow-demo": BadgeOverflowDemo,
  "badge-overflow-truncation-demo": BadgeOverflowTruncationDemo,
  "badge-overflow-variants-demo": BadgeOverflowVariantsDemo,
  "badge-overflow-custom-overflow-demo": BadgeOverflowCustomOverflowDemo,
  "badge-overflow-interactive-demo": BadgeOverflowInteractiveDemo,
  "badge-overflow-multiline-demo": BadgeOverflowMultilineDemo,
  "checkbox-group-demo": CheckboxGroupDemo,
  "checkbox-group-horizontal-demo": CheckboxGroupHorizontalDemo,
  "checkbox-group-validation-demo": CheckboxGroupValidationDemo,
  "checkbox-group-multi-selection-demo": CheckboxGroupMultiSelectionDemo,
  "circular-progress-demo": CircularProgressDemo,
  "circular-progress-controlled-demo": CircularProgressControlledDemo,
  "circular-progress-colors-demo": CircularProgressColorsDemo,
  "compare-slider-demo": CompareSliderDemo,
  "compare-slider-controlled-demo": CompareSliderControlledDemo,
  "compare-slider-custom-demo": CompareSliderCustomDemo,
  "compare-slider-hover-demo": CompareSliderHoverDemo,
  "compare-slider-vertical-demo": CompareSliderVerticalDemo,
  "dashboard-template-demo": DashboardTemplateDemo,
  "data-grid-demo": DataGridDemo,
  "kanban-demo": KanbanDemo,
  "kanban-dynamic-overlay-demo": KanbanDynamicOverlayDemo,
  "listbox-demo": ListboxDemo,
  "listbox-horizontal-demo": ListboxHorizontalDemo,
  "listbox-grid-demo": ListboxGridDemo,
  "listbox-group-demo": ListboxGroupDemo,
  "marquee-demo": MarqueeDemo,
  "marquee-logo-demo": MarqueeLogoDemo,
  "marquee-vertical-demo": MarqueeVerticalDemo,
  "marquee-rtl-demo": MarqueeRtlDemo,
  "masonry-demo": MasonryDemo,
  "masonry-linear-demo": MasonryLinearDemo,
  "masonry-ssr-demo": MasonrySSRDemo,
  "mask-input-demo": MaskInputDemo,
  "mask-input-custom-pattern-demo": MaskInputCustomPatternDemo,
  "mention-demo": MentionDemo,
  "combobox-demo": ComboboxDemo,
  "phone-input-demo": PhoneInputDemo,
  "sortable-demo": SortableDemo,
  "sortable-horizontal-demo": SortableHorizontalDemo,
  "sortable-primitive-values-demo": SortablePrimitiveValuesDemo,
  "sortable-with-handle-demo": SortableWithHandleDemo,
  "speed-dial-demo": SpeedDialDemo,
  "speed-dial-labels-demo": SpeedDialLabelsDemo,
  "speed-dial-hover-demo": SpeedDialHoverDemo,
  "speed-dial-controlled-demo": SpeedDialControlledDemo,
  "speed-dial-side-demo": SpeedDialSideDemo,
  "speed-dial-fixed-demo": SpeedDialFixedDemo,
  "timeline-alternate-demo": TimelineAlternateDemo,
  "timeline-custom-dot-demo": TimelineCustomDotDemo,
  "timeline-horizontal-demo": TimelineHorizontalDemo,
  "timeline-rtl-demo": TimelineRtlDemo,
  "timeline-demo": TimelineDemo,
  "stepper-demo": StepperDemo,
  "stepper-vertical-demo": StepperVerticalDemo,
  "stepper-validation-demo": StepperValidationDemo,
  "stepper-form-demo": StepperFormDemo,
  "selection-toolbar-demo": SelectionToolbarDemo,
  "selection-toolbar-info-demo": SelectionToolbarInfoDemo,
  "tour-demo": TourDemo,
  "swap-demo": SwapDemo,
  "swap-controlled-demo": SwapControlledDemo,
  "swap-flip-demo": SwapFlipDemo,
  "swap-hover-demo": SwapHoverDemo,
  "swap-rotate-demo": SwapRotateDemo,
  "swap-scale-demo": SwapScaleDemo,
  "swap-animations-demo": SwapAnimationsDemo,
  "stat-demo": StatDemo,
  "stat-indicator-demo": StatIndicatorDemo,
  "status-demo": StatusDemo,
  "status-list-demo": StatusListDemo,
  "status-text-only-demo": StatusTextOnlyDemo,
  "status-variants-demo": StatusVariantsDemo,
  "card-demo": CardDemo,
  "card-horizontal-demo": CardHorizontalDemo,
  "card-variants-demo": CardVariantsDemo,
  "card-with-avatar-demo": CardWithAvatarDemo,
  "card-with-form-demo": CardWithFormDemo,
  "card-with-image-demo": CardWithImageDemo,
  "stack-demo": StackDemo,
  "stack-without-expansion-demo": StackWithoutExpansionDemo,
  "stack-side-demo": StackSideDemo,
  "tags-input-demo": TagsInputDemo,
  "tags-input-editable-demo": TagsInputEditableDemo,
  "tags-input-validation-demo": TagsInputValidationDemo,
  "tags-input-sortable-demo": TagsInputSortableDemo,
  "segmented-input-demo": SegmentedInputDemo,
  "segmented-input-form-demo": SegmentedInputFormDemo,
  "segmented-input-rgb-demo": SegmentedInputRgbDemo,
  "segmented-input-vertical-demo": SegmentedInputVerticalDemo,
};

type ComponentPreviewDemoClientProps = {
  className?: string;
  code?: string;
  lang?: string;
  name: string;
  previewClassName?: string;
  title?: string;
  description?: string;
};

export function ComponentPreviewDemoClient({
  className,
  code,
  lang = "tsx",
  name,
  previewClassName,
  title,
  description,
}: ComponentPreviewDemoClientProps) {
  const DemoComponent = demoComponents[name];

  if (!DemoComponent) {
    console.warn(`Demo component "${name}" not found`);
    return null;
  }

  return (
    <ComponentPreviewContainer
      className={className}
      description={description}
      hideCode={!code}
      name={name}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-4xl items-center justify-center",
          previewClassName,
        )}
      >
        <DemoComponent />
      </div>

      {code ? <CollapsibleCodeBlock code={code} lang={lang} /> : <></>}
    </ComponentPreviewContainer>
  );
}
