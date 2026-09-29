"use client";

import { Check, Folder } from "lucide-react";
import FadeImage from "@/components/ui/FadeImage";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import { WALLPAPERS } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";

/** Preview decode size: Next Image optimizer downsamples to these dims */
const PREVIEW_WIDTH = 160;
const PREVIEW_HEIGHT = 100;

export default function WallpapersApp() {
  const wallpaperId = useOSStore((s) => s.wallpaperId);
  const setWallpaper = useOSStore((s) => s.setWallpaper);
  const closeMobileApp = useOSStore((s) => s.closeMobileApp);
  const { isMobileLayout } = useResponsiveOS();

  const selectWallpaper = (id: string) => {
    setWallpaper(id);
    closeMobileApp();
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--os-window)] text-[var(--os-text)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--os-border)] bg-[var(--os-titlebar)] px-3 py-2">
        <Folder size={14} className="text-[var(--os-accent)]" />
        <p className="text-xs font-medium tracking-wide text-[var(--os-muted)]">
          wallpapers
        </p>
        <span className="text-xs text-[var(--os-muted)]/70">
          {WALLPAPERS.length} items
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div
          className={`grid grid-cols-2 gap-4 ${
            isMobileLayout ? "" : "sm:grid-cols-3"
          }`}
        >
          {WALLPAPERS.map((wallpaper) => {
            const selected = wallpaper.id === wallpaperId;
            return (
              <button
                key={wallpaper.id}
                type="button"
                onClick={() => selectWallpaper(wallpaper.id)}
                className={`group flex flex-col gap-2 rounded-lg p-2 text-left transition outline-none focus-visible:ring-2 focus-visible:ring-[var(--os-accent)] ${
                  selected
                    ? "bg-[var(--os-accent)]/15 ring-2 ring-[var(--os-accent)]"
                    : "hover:bg-[var(--os-surface)]"
                }`}
              >
                <div className="relative aspect-[8/5] w-full overflow-hidden rounded-md bg-[var(--os-surface)] shadow-sm ring-1 ring-[var(--os-border)]">
                  <FadeImage
                    src={wallpaper.src}
                    alt={wallpaper.name}
                    width={PREVIEW_WIDTH}
                    height={PREVIEW_HEIGHT}
                    quality={75}
                    sizes={`${PREVIEW_WIDTH}px`}
                    className="h-full w-full object-cover"
                  />
                  {selected ? (
                    <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--os-accent)] text-white shadow">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0 px-0.5">
                  <p className="truncate text-xs font-medium">
                    {wallpaper.name}
                  </p>
                  <p className="truncate text-[10px] text-[var(--os-muted)]">
                    {wallpaper.src.split("/").pop()}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
