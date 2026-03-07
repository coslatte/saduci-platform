"use client";

import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  closeOnSelect?: boolean;
}

/**
 * Popover
 *
 * A lightweight portal-backed popover/dialog used for small interactive panels
 * (notifications, menus, etc.). The popover clones native interactive triggers
 * (button, anchor) to avoid invalid nested interactive elements; non-interactive
 * triggers (like <span>) are wrapped in a button.
 *
 * Accessibility notes:
 * - The trigger receives `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
 * - The content uses `role="dialog"` but is non-modal (aria-modal=false).
 *
 * @param trigger - React node used to toggle the popover. Can be a native element
 *                  (button/a) or any other node. Native interactive triggers are
 *                  cloned to preserve valid HTML.
 * @param children - Content rendered inside the popover
 * @param align - Horizontal alignment of the popover relative to the trigger
 * @param className - Optional className applied to the wrapper
 * @param closeOnSelect - If true, clicking a button/link inside the popover will close it
 */
export function Popover({
  trigger,
  children,
  align = "right",
  className,
  closeOnSelect = true,
}: PopoverProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    relative?: boolean;
  } | null>(null);
  const [usePortal, setUsePortal] = useState(true);

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(target)) return;
      if (contentRef.current && contentRef.current.contains(target)) return;
      // trigger closing animation
      setExiting(true);
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setExiting(true);
    }

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // If content contains interactive items that should close the popover
  useEffect(() => {
    if (!contentRef.current || !closeOnSelect) return;
    const el = contentRef.current;
    function handler(e: Event) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // close when clicking a button/link inside content
      if (target.closest("button") || target.closest("a")) {
        setExiting(true);
      }
    }

    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [closeOnSelect]);

  // Re-compute position when open/align changes and on resize/scroll.
  useLayoutEffect(() => {
    if (!open) return;

    function compute() {
      if (!wrapperRef.current) return;
      // Use the trigger element if present (aria-controls points to the popover id)
      const triggerEl = document.querySelector(
        `[aria-controls="${id}"]`,
      ) as HTMLElement | null;
      const rect =
        triggerEl?.getBoundingClientRect() ??
        wrapperRef.current.getBoundingClientRect();
      const PANEL_WIDTH = 320;
      let left = rect.right - PANEL_WIDTH;
      if (align === "left") left = rect.left;
      if (align === "center")
        left = rect.left + rect.width / 2 - PANEL_WIDTH / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - PANEL_WIDTH - 8));

      const PANEL_MAX_HEIGHT = 360;
      const contentHeight =
        contentRef.current?.offsetHeight ?? PANEL_MAX_HEIGHT;
      const spaceBelow = window.innerHeight - rect.bottom;

      // detect transformed/filter/perspective ancestors which can change how
      // fixed positioning behaves (they create a containing block). When
      // present, we'll render the popover absolute inside the wrapper to
      // avoid misalignment.
      let el: Element | null = wrapperRef.current.parentElement;
      let transformed = false;
      while (el && el !== document.body) {
        const st = window.getComputedStyle(el as Element);
        const hasTransform =
          (st.transform && st.transform !== "none") ||
          (st.perspective && st.perspective !== "none") ||
          (st.filter && st.filter !== "none");
        if (hasTransform) {
          transformed = true;
          break;
        }
        el = el.parentElement;
      }
      setUsePortal(!transformed);

      // prefer showing below when there's enough space, otherwise show above
      if (spaceBelow < contentHeight + 16) {
        // place above the trigger, keeping 8px margin
        const top = Math.max(8, rect.top - contentHeight - 8);
        if (transformed) {
          const wrapperRect = wrapperRef.current.getBoundingClientRect();
          setPosition({
            top: top - wrapperRect.top,
            left: left - wrapperRect.left,
            relative: true,
          });
        } else {
          setPosition({ top, left, relative: false });
        }
      } else {
        if (transformed) {
          const wrapperRect = wrapperRef.current.getBoundingClientRect();
          setPosition({
            top: rect.bottom + 8 - wrapperRect.top,
            left: left - wrapperRect.left,
            relative: true,
          });
        } else {
          setPosition({ top: rect.bottom + 8, left, relative: false });
        }
      }
    }

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, { passive: true });
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute as EventListener);
    };
  }, [open, align, id]);

  // clear entering state after one frame to trigger CSS transition
  useEffect(() => {
    if (!entering) return;
    const frame = requestAnimationFrame(() => setEntering(false));
    return () => cancelAnimationFrame(frame);
  }, [entering]);

  // handle exiting animation timing
  useEffect(() => {
    if (!exiting) return;
    // wait for animation then close
    const t = setTimeout(() => {
      setExiting(false);
      setOpen(false);
      setPosition(null);
    }, 180);
    return () => clearTimeout(t);
  }, [exiting]);

  const content = (
    <div
      id={id}
      ref={contentRef}
      role="dialog"
      aria-modal={false}
      className={cn(
        "transform-gpu transition-all duration-150 z-50",
        exiting || entering
          ? "opacity-0 -translate-y-1 scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100",
      )}
      style={
        position
          ? {
              position: "fixed",
              top: position.top,
              bottom: position.bottom,
              left: position.left,
            }
          : { visibility: "hidden" }
      }
    >
      {children}
    </div>
  );

  // If trigger is a native interactive element (button or anchor) we clone it and
  // attach popover props to avoid nesting an extra <button> which would create
  // invalid HTML and break tests / accessibility. For non-interactive triggers
  // we wrap them in a button so the DOM and keyboard focus behavior remains
  // predictable for consumers and tests.
  const renderTrigger = () => {
    const handleToggle = (e?: React.MouseEvent<HTMLElement>) => {
      // allow original handler to run first
      try {
        if (typeof trigger === "object" && React.isValidElement(trigger)) {
          const origOnClick = (
            trigger.props as {
              onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
            }
          ).onClick;
          if (typeof origOnClick === "function") origOnClick(e);
        }
      } catch {
        // ignore
      }

      if (open) setExiting(true);
      else {
        // open first so the content can be rendered and measured
        // position will be resolved in the useLayoutEffect below once
        // the portal/content DOM node exists.
        setEntering(true);
        setOpen(true);
      }
    };

    if (
      React.isValidElement(trigger) &&
      typeof trigger.type === "string" &&
      (trigger.type === "button" || trigger.type === "a")
    ) {
      // native interactive element like 'button' or 'a'
      const isButtonEl = trigger.type === "button";
      const triggerProps = trigger.props as {
        className?: string;
        type?: string;
      };
      const newProps = {
        "aria-haspopup": "dialog" as const,
        "aria-expanded": open,
        "aria-controls": id,
        onClick: handleToggle,
        className: cn("inline-flex items-center", triggerProps.className),
        ...(isButtonEl ? { type: triggerProps.type ?? "button" } : {}),
      };

      return React.cloneElement(
        trigger,
        newProps as React.HTMLAttributes<HTMLElement>,
      );
    }

    // fallback: wrap non-native triggers in a button
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={handleToggle}
        className="inline-flex items-center"
      >
        {trigger}
      </button>
    );
  };

  return (
    <div className={cn("relative inline-block", className)} ref={wrapperRef}>
      {renderTrigger()}

      {(open || exiting) &&
        (usePortal ? createPortal(content, document.body) : content)}
    </div>
  );
}

export default Popover;
