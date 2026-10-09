"use client";

import { getWallpaperById } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";

/**
 * Icon captions use the same frosted glass language as the dock
 * (shared --os-dock tokens) so titles stay readable on any wallpaper.
 */
export function useIconLabelClass() {
  const wallpaperId = useOSStore((s) => s.wallpaperId);
  const theme = useOSStore((s) => s.theme);
  const tone = getWallpaperById(wallpaperId).tone;
  const onBright = tone === "bright" && theme === "light";
  const ink = onBright ? "text-neutral-900" : "text-white";

  return {
    onBright,
    /** Desktop / mobile home icon titles — dock-matched glass chip */
    labelClass: `icon-label-chip ${ink}`,
    /** Plain text over wallpaper (status bar) */
    statusClass: onBright
      ? "text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]"
      : "text-white drop-shadow-md",
    dockLabelClass: ink,
  };
}
