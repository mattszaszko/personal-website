"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useOSStore } from "@/stores/useOSStore";
import type { Theme } from "@/types/os";

export const CAL_NAMESPACE = "intro-chat";
export const CAL_LINK = "matt-szaszko-k6ggpc/intro-chat";
export const CAL_ORIGIN = "https://app.cal.com";

/** Month view + event details: tall enough that dates aren't clipped */
const CAL_MIN_HEIGHT = 760;

const CSS_VARS = {
  light: {
    "cal-brand": "#0e7490",
    "cal-brand-emphasis": "#0f766e",
    "cal-brand-text": "#ffffff",
    "cal-bg": "#f8fafc",
    "cal-bg-muted": "#eef2f7",
    "cal-text": "#0f172a",
    "cal-text-muted": "#64748b",
    "cal-border-booker": "rgba(15, 23, 42, 0.1)",
  },
  dark: {
    "cal-brand": "#22d3ee",
    "cal-brand-emphasis": "#67e8f9",
    "cal-brand-text": "#0b1220",
    "cal-bg": "#0f172a",
    "cal-bg-muted": "#1e293b",
    "cal-text": "#e2e8f0",
    "cal-text-muted": "#94a3b8",
    "cal-border-booker": "rgba(226, 232, 240, 0.12)",
  },
} as const;

/** Warm the embed script + booking assets so Contact opens faster. */
export async function prefetchCalEmbed() {
  if (typeof window === "undefined") return;
  try {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    cal("preload", { calLink: CAL_LINK });
  } catch {
    // Prefetch is best-effort; ignore network failures.
  }
}

function applyCalTheme(theme: Theme) {
  return getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
    cal("ui", {
      theme,
      colorScheme: theme,
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: CSS_VARS,
    });
  });
}

export default function CalBookingEmbed() {
  const theme = useOSStore((s) => s.theme);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(CAL_MIN_HEIGHT);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void applyCalTheme(theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    const fallback = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 5000);

    const onReady = () => {
      if (!cancelled) setReady(true);
    };

    void (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        cal("on", {
          action: "linkReady",
          callback: onReady,
        });
      } catch {
        onReady();
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  // Follow Cal iframe's reported height so the month grid is never clipped
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const syncHeight = () => {
      const iframe = el.querySelector("iframe");
      const iframeHeight = iframe
        ? Math.ceil(iframe.getBoundingClientRect().height)
        : 0;
      // Also read explicit height attr Cal sets via postMessage resize
      const attrHeight = iframe
        ? Number.parseInt(iframe.getAttribute("height") || "", 10)
        : 0;
      const styleHeight = iframe?.style.height
        ? Number.parseInt(iframe.style.height, 10)
        : 0;
      const next = Math.max(
        CAL_MIN_HEIGHT,
        iframeHeight,
        Number.isFinite(attrHeight) ? attrHeight : 0,
        Number.isFinite(styleHeight) ? styleHeight : 0,
      );
      setHeight((prev) => (prev === next ? prev : next));
    };

    syncHeight();

    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(el);
    const iframe = el.querySelector("iframe");
    if (iframe) resizeObserver.observe(iframe);

    const mutationObserver = new MutationObserver(() => {
      const frame = el.querySelector("iframe");
      if (frame) resizeObserver.observe(frame);
      syncHeight();
    });
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "height"],
    });

    window.addEventListener("message", syncHeight);
    const interval = window.setInterval(syncHeight, 800);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("message", syncHeight);
      window.clearInterval(interval);
    };
  }, [ready]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible rounded-lg"
      style={{ height, minHeight: CAL_MIN_HEIGHT }}
    >
      {!ready ? (
        <div
          className="absolute inset-0 z-10 flex flex-col gap-3 bg-[var(--os-surface)] p-4"
          aria-busy
          aria-label="Loading calendar"
        >
          <div className="h-6 w-40 animate-pulse rounded bg-[var(--os-border)]" />
          <div className="min-h-0 flex-1 animate-pulse rounded-lg bg-[var(--os-border)]/60" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-[var(--os-border)]" />
        </div>
      ) : null}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        calOrigin={CAL_ORIGIN}
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        config={{
          layout: "month_view",
          theme,
          "ui.color-scheme": theme,
          useSlotsViewOnSmallScreen: "true",
        }}
      />
    </div>
  );
}
