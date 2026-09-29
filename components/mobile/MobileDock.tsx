"use client";

import { motion } from "framer-motion";
import { AppIconTile } from "@/components/apps/AppIcon";
import { openMobileAppFromGesture } from "@/lib/openMobileAppFromGesture";
import { useOSStore } from "@/stores/useOSStore";
import { DOCK_APP_IDS, APP_META } from "@/types/os";

export default function MobileDock() {
  const activeMobileApp = useOSStore((s) => s.activeMobileApp);

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
      <nav className="flex items-center justify-around rounded-2xl border border-[var(--os-border)] bg-[var(--os-dock)] px-2 py-2.5 backdrop-blur-xl">
        {DOCK_APP_IDS.map((id) => (
          <motion.button
            key={id}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => openMobileAppFromGesture(id)}
            className={`flex flex-col items-center gap-1 rounded-xl p-1 ${
              activeMobileApp === id ? "opacity-100" : "opacity-90"
            }`}
            aria-label={APP_META[id].title}
          >
            <AppIconTile appId={id} className="h-11 w-11" iconSize={22} />
          </motion.button>
        ))}
      </nav>
    </div>
  );
}
