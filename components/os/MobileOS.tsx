"use client";

import { AnimatePresence } from "framer-motion";
import { isWindowAppId } from "@/components/apps";
import MobileAppModal from "@/components/mobile/MobileAppModal";
import MobileDock from "@/components/mobile/MobileDock";
import MobileHomeScreen from "@/components/mobile/MobileHomeScreen";
import MobileIntroductionSheet from "@/components/mobile/MobileIntroductionSheet";
import MobileProjectSheet from "@/components/mobile/MobileProjectSheet";
import MobileStatusBar from "@/components/mobile/MobileStatusBar";
import { useOSStore } from "@/stores/useOSStore";

export default function MobileOS() {
  const activeMobileApp = useOSStore((s) => s.activeMobileApp);
  const activeMobileProjectId = useOSStore((s) => s.activeMobileProjectId);
  const isIntroductionOpen = useOSStore((s) => s.isIntroductionOpen);
  const windowApp =
    activeMobileApp && isWindowAppId(activeMobileApp)
      ? activeMobileApp
      : null;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-transparent">
      <MobileStatusBar />
      <div className="relative min-h-0 flex-1">
        <MobileHomeScreen />
        <AnimatePresence>
          {windowApp ? (
            <MobileAppModal key={windowApp} appId={windowApp} />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {activeMobileProjectId ? (
            <MobileProjectSheet
              key={activeMobileProjectId}
              projectId={activeMobileProjectId}
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {isIntroductionOpen ? (
            <MobileIntroductionSheet key="introduction" />
          ) : null}
        </AnimatePresence>
      </div>
      <MobileDock />
    </div>
  );
}
