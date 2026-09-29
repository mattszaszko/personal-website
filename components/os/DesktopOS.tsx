"use client";

import DesktopDock from "@/components/desktop/DesktopDock";
import DesktopGrid from "@/components/desktop/DesktopGrid";
import DesktopStickyNote from "@/components/desktop/DesktopStickyNote";
import DesktopTopBar from "@/components/desktop/DesktopTopBar";
import DesktopProjectWindow from "@/components/desktop/DesktopProjectWindow";
import DesktopWindow from "@/components/desktop/DesktopWindow";
import IntroductionWindow from "@/components/desktop/IntroductionWindow";
import ToastersScreensaver from "@/components/desktop/ToastersScreensaver";
import { useOSStore } from "@/stores/useOSStore";
import { WINDOW_APP_IDS } from "@/types/os";

export default function DesktopOS() {
  const windows = useOSStore((s) => s.windows);
  const projectWindows = useOSStore((s) => s.projectWindows);
  const isScreensaverActive = useOSStore((s) => s.isScreensaverActive);

  return (
    <div className="absolute inset-0">
      <DesktopTopBar />
      <DesktopGrid />
      <DesktopStickyNote />
      {WINDOW_APP_IDS.map((id) => {
        const win = windows[id];
        if (!win.isOpen || win.isMinimized) return null;
        return <DesktopWindow key={id} appId={id} />;
      })}
      {Object.values(projectWindows).map((win) => {
        if (!win.isOpen || win.isMinimized) return null;
        return (
          <DesktopProjectWindow
            key={win.projectId}
            projectId={win.projectId}
          />
        );
      })}
      <IntroductionWindow />
      <DesktopDock />
      {isScreensaverActive ? <ToastersScreensaver /> : null}
    </div>
  );
}
