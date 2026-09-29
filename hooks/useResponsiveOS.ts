"use client";

import { useEffect, useState } from "react";
import { useOSStore } from "@/stores/useOSStore";

const MOBILE_BREAKPOINT = 768;

export function useResponsiveOS() {
  const isMobilePreviewForced = useOSStore((s) => s.isMobilePreviewForced);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobileViewport(window.innerWidth < MOBILE_BREAKPOINT);
    };

    update();
    setIsMounted(true);

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /** True for real mobile viewports and the desktop phone preview */
  const isMobileLayout = isMobileViewport || isMobilePreviewForced;

  return { isMobileViewport, isMobileLayout, isMounted };
}
