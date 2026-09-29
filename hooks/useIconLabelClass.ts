"use client";

import { getWallpaperById } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";

/**
 * Black labels on bright wallpapers in light mode;
 * white when the backdrop is dark (dark wallpaper or dark-mode tint).
 */
export function useIconLabelClass() {
  const wallpaperId = useOSStore((s) => s.wallpaperId);
  const theme = useOSStore((s) => s.theme);
  const tone = getWallpaperById(wallpaperId).tone;
  const onBright = tone === "bright" && theme === "light";

  return {
    onBright,
    labelClass: onBright
      ? "text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]"
      : "text-white drop-shadow-md",
    dockLabelClass: onBright ? "text-neutral-900" : "text-white",
  };
}
