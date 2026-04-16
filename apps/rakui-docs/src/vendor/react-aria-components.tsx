"use client";

import * as React from "react";

export type ButtonRenderProps = {
  isPending: boolean;
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
};

type DOMButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type DOMRenderFunction = (
  props: DOMButtonProps,
  renderProps: ButtonRenderProps,
) => React.ReactNode;

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "disabled"
  > {
  children?: React.ReactNode | ((values: ButtonRenderProps) => React.ReactNode);
  className?: string | ((values: ButtonRenderProps) => string | undefined);
  isDisabled?: boolean;
  isPending?: boolean;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  render?: DOMRenderFunction;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isDisabled = false,
      isPending = false,
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPress,
      onTouchStart,
      render,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isFocusVisible, setIsFocusVisible] = React.useState(false);

    const renderProps: ButtonRenderProps = {
      isPending,
      isPressed,
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled,
    };

    const resolvedClassName =
      typeof className === "function" ? className(renderProps) : className;

    const domProps = {
      ...props,
      type,
      disabled: isDisabled,
      "aria-disabled": isDisabled || undefined,
      "data-disabled": isDisabled ? "" : undefined,
      "data-hovered": isHovered ? "" : undefined,
      "data-focused": isFocused ? "" : undefined,
      "data-focus-visible": isFocusVisible ? "" : undefined,
      "data-pending": isPending ? "" : undefined,
      "data-pressed": isPressed ? "" : undefined,
      className: resolvedClassName,
      onBlur: (event) => {
        setIsFocused(false);
        setIsFocusVisible(false);
        onBlur?.(event);
      },
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !isDisabled) {
          onPress?.(event);
        }
      },
      onFocus: (event) => {
        setIsFocused(true);
        setIsFocusVisible(true);
        onFocus?.(event);
      },
      onKeyDown: (event) => {
        if (event.key === " " || event.key === "Enter") {
          setIsPressed(true);
        }
        onKeyDown?.(event);
      },
      onKeyUp: (event) => {
        if (event.key === " " || event.key === "Enter") {
          setIsPressed(false);
        }
        onKeyUp?.(event);
      },
      onMouseDown: (event) => {
        setIsPressed(true);
        onMouseDown?.(event);
      },
      onMouseEnter: (event) => {
        setIsHovered(true);
        onMouseEnter?.(event);
      },
      onMouseLeave: (event) => {
        setIsHovered(false);
        setIsPressed(false);
        onMouseLeave?.(event);
      },
      onPointerDown: (event) => {
        setIsPressed(true);
        onPointerDown?.(event);
      },
      onPointerUp: (event) => {
        setIsPressed(false);
        onPointerUp?.(event);
      },
      onTouchStart: (event) => {
        setIsPressed(true);
        onTouchStart?.(event);
      },
    } as DOMButtonProps;

    if (render) {
      return <>{render(domProps, renderProps)}</>;
    }

    return (
      <button {...domProps} ref={ref}>
        {typeof children === "function" ? children(renderProps) : children}
      </button>
    );
  },
);

Button.displayName = "Button";
