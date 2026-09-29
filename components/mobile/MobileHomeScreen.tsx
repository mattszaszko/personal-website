"use client";

import { motion } from "framer-motion";
import { AppIconTile } from "@/components/apps/AppIcon";
import { useIconLabelClass } from "@/hooks/useIconLabelClass";
import { useOSStore } from "@/stores/useOSStore";
import { MOBILE_APP_IDS, APP_META } from "@/types/os";

export default function MobileHomeScreen() {
  const openMobileApp = useOSStore((s) => s.openMobileApp);
  const { labelClass } = useIconLabelClass();

  return (
    <div className="h-full overflow-auto px-6 pt-4 pb-28">
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {MOBILE_APP_IDS.map((id) => (
          <motion.button
            key={id}
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => openMobileApp(id)}
            className="flex flex-col items-center gap-2"
          >
            <AppIconTile appId={id} className="h-16 w-16" iconSize={32} />
            <span className={`text-xs font-medium ${labelClass}`}>
              {APP_META[id].title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
