"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { prefetchCalEmbed } from "@/components/apps/CalBookingEmbed";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import { withBasePath } from "@/lib/basePath";
import { getRandomWallpaperId, getWallpaperById } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";
import DesktopOS from "./DesktopOS";
import MobileOS from "./MobileOS";
import PhoneMockupFrame from "./PhoneMockupFrame";

function WallpaperShell({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const wallpaperId = useOSStore((s) => s.wallpaperId);
  const wallpaper = getWallpaperById(wallpaperId);

  const style = {
    "--wallpaper-image": `url('${withBasePath(wallpaper.src)}')`,
  } as CSSProperties;

  return (
    <div
      className={`os-wallpaper fixed inset-0 ${className}`.trim()}
      data-wallpaper-tone={wallpaper.tone}
      style={style}
    >
      {children}
    </div>
  );
}

export default function OSRoot() {
  const { isMobileViewport, isMounted } = useResponsiveOS();
  const isMobilePreviewForced = useOSStore((s) => s.isMobilePreviewForced);
  const theme = useOSStore((s) => s.theme);
  const [showBoot, setShowBoot] = useState(true);

  useLayoutEffect(() => {
    useOSStore.getState().setWallpaper(getRandomWallpaperId());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isMounted) return;

    const bootTimer = window.setTimeout(() => setShowBoot(false), 1500);

    const run = () => {
      void prefetchCalEmbed();
    };

    let idle: number | undefined;
    let delay: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(run, { timeout: 2000 });
    } else {
      delay = window.setTimeout(run, 800);
    }

    return () => {
      window.clearTimeout(bootTimer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (delay !== undefined) window.clearTimeout(delay);
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black">
        <BootMark />
        <div className="boot-progress mt-10" aria-hidden>
          <div className="boot-progress-fill" />
        </div>
      </div>
    );
  }

  const shell = isMobileViewport ? (
    <WallpaperShell className="overflow-hidden">
      <MobileOS />
    </WallpaperShell>
  ) : isMobilePreviewForced ? (
    <WallpaperShell className="flex items-center justify-center overflow-hidden p-6">
      <PhoneMockupFrame>
        <MobileOS />
      </PhoneMockupFrame>
    </WallpaperShell>
  ) : (
    <WallpaperShell className="overflow-hidden">
      <DesktopOS />
    </WallpaperShell>
  );

  return (
    <>
      {shell}
      {showBoot ? (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black">
          <BootMark />
          <div className="boot-progress mt-10" aria-hidden>
            <div className="boot-progress-fill" />
          </div>
        </div>
      ) : null}
    </>
  );
}

function BootMark() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="text-white"
    >
      <rect
        x="8"
        y="10"
        width="40"
        height="30"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M20 40h16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M14 48h28"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="28" cy="25" r="4.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
