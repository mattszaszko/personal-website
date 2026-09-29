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
import { getRandomWallpaperId, getWallpaperById } from "@/lib/wallpapers";
import { useOSStore } from "@/stores/useOSStore";
import BootLoader from "./BootLoader";
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
    "--wallpaper-image": `url('${wallpaper.src}')`,
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
  const setWallpaper = useOSStore((s) => s.setWallpaper);
  const [showBoot, setShowBoot] = useState(true);

  useLayoutEffect(() => {
    setWallpaper(getRandomWallpaperId());
  }, [setWallpaper]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isMounted) return;

    const run = () => {
      void prefetchCalEmbed();
    };

    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(idle);
    }

    const t = window.setTimeout(run, 800);
    return () => window.clearTimeout(t);
  }, [isMounted]);

  const shell = (() => {
    if (!isMounted) return null;

    if (isMobileViewport) {
      return (
        <WallpaperShell className="overflow-hidden">
          <MobileOS />
        </WallpaperShell>
      );
    }

    if (isMobilePreviewForced) {
      return (
        <WallpaperShell className="flex items-center justify-center overflow-hidden p-6">
          <PhoneMockupFrame>
            <MobileOS />
          </PhoneMockupFrame>
        </WallpaperShell>
      );
    }

    return (
      <WallpaperShell className="overflow-hidden">
        <DesktopOS />
      </WallpaperShell>
    );
  })();

  return (
    <>
      {/* OS mounts under the boot overlay so wallpaper/UI are ready before reveal */}
      <div
        className={showBoot ? "invisible" : "visible"}
        aria-hidden={showBoot}
      >
        {shell}
      </div>

      {showBoot ? (
        <BootLoader onFinished={() => setShowBoot(false)} />
      ) : null}
    </>
  );
}
