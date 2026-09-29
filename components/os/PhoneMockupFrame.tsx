"use client";

import type { CSSProperties, ReactNode } from "react";
import { X } from "lucide-react";
import { getWallpaperById } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";

interface PhoneMockupFrameProps {
  children: ReactNode;
}

export default function PhoneMockupFrame({ children }: PhoneMockupFrameProps) {
  const toggleMobilePreview = useOSStore((s) => s.toggleMobilePreview);
  const wallpaperId = useOSStore((s) => s.wallpaperId);
  const wallpaper = getWallpaperById(wallpaperId);

  const wallpaperStyle = {
    "--wallpaper-image": `url('${wallpaper.src}')`,
  } as CSSProperties;

  return (
    <div className="relative flex flex-col items-center gap-5">
      <button
        type="button"
        onClick={toggleMobilePreview}
        className="group absolute -top-3 -right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 py-1.5 pr-2.5 pl-2 text-xs font-medium text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-white/40 hover:bg-white/25"
        aria-label="Exit mobile preview"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
          <X size={13} strokeWidth={2.5} />
        </span>
        <span>Exit</span>
      </button>

      <div className="relative h-[min(844px,85vh)] w-[min(390px,92vw)] overflow-hidden rounded-[2rem] border-[8px] border-neutral-800 bg-neutral-900 shadow-[0_25px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <div
          className="os-wallpaper h-full w-full overflow-hidden rounded-[1.55rem]"
          data-wallpaper-tone={wallpaper.tone}
          style={wallpaperStyle}
        >
          {children}
        </div>
      </div>

      <p className="text-sm text-white/70">Mobile Preview</p>
    </div>
  );
}
