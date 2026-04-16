"use client";

import { Bold, Copy, Italic, Link, Share2 } from "lucide-react";
import * as React from "react";
import {
  SelectionToolbar,
  SelectionToolbarItem,
  SelectionToolbarSeparator,
} from "@/components/ui/selection-toolbar";

export function SelectionToolbarDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const wrapSelection = React.useCallback((tagName: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const wrapper = document.createElement(tagName);

    try {
      range.surroundContents(wrapper);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      selection.addRange(newRange);
    } catch {
      wrapper.textContent = selectedText;
      range.deleteContents();
      range.insertNode(wrapper);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      selection.addRange(newRange);
    }
  }, []);

  const onBold = React.useCallback(() => {
    wrapSelection("strong");
  }, [wrapSelection]);

  const onItalic = React.useCallback(() => {
    wrapSelection("em");
  }, [wrapSelection]);

  const onLink = React.useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const url = window.prompt("Enter URL:");
    if (!url) return;

    const range = selection.getRangeAt(0);
    const link = document.createElement("a");
    link.href = url;
    link.className = "text-primary underline hover:text-primary/80";

    try {
      range.surroundContents(link);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(link);
      selection.addRange(newRange);
    } catch {
      link.textContent = range.toString();
      range.deleteContents();
      range.insertNode(link);
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(link);
      selection.addRange(newRange);
    }
  }, []);

  const clearSelection = React.useCallback(() => {
    window.getSelection()?.removeAllRanges();
  }, []);

  const onCopy = React.useCallback(
    (text: string) => {
      if (navigator.clipboard) {
        void navigator.clipboard.writeText(text).catch(() => {});
      }
      clearSelection();
    },
    [clearSelection],
  );

  const onShare = React.useCallback(
    (text: string) => {
      if (navigator.share) {
        void navigator.share({ text }).catch(() => {});
      } else if (navigator.clipboard) {
        void navigator.clipboard.writeText(text).catch(() => {});
      }
      clearSelection();
    },
    [clearSelection],
  );

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div
        ref={containerRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full max-w-2xl space-y-4 rounded-lg border bg-card p-8 text-card-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <h2 className="text-2xl font-semibold">Medium-Style Text Selection</h2>
        <p className="leading-relaxed text-muted-foreground">
          Select any text in this area to see the floating toolbar appear. The
          toolbar automatically positions itself above the selection and
          includes common formatting options like bold, italic, and link, as
          well as utility actions like copy and share.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Try selecting text across multiple lines or near the edges of the
          viewport. The menu will automatically adjust its position to stay
          visible and accessible. This creates a seamless editing experience
          similar to popular writing platforms.
        </p>

        <SelectionToolbar container={containerRef}>
          <SelectionToolbarItem onSelect={onBold}>
            <Bold className="size-4" />
          </SelectionToolbarItem>
          <SelectionToolbarItem onSelect={onItalic}>
            <Italic className="size-4" />
          </SelectionToolbarItem>
          <SelectionToolbarItem onSelect={onLink}>
            <Link className="size-4" />
          </SelectionToolbarItem>
          <SelectionToolbarSeparator />
          <SelectionToolbarItem onSelect={onCopy}>
            <Copy className="size-4" />
          </SelectionToolbarItem>
          <SelectionToolbarItem onSelect={onShare}>
            <Share2 className="size-4" />
          </SelectionToolbarItem>
        </SelectionToolbar>
      </div>
    </div>
  );
}
