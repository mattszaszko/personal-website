"use client";

import { motion } from "framer-motion";
import { prefetchCalEmbed } from "@/components/apps/CalBookingEmbed";
import { AppIconTile } from "@/components/apps/AppIcon";
import { useIconLabelClass } from "@/hooks/useIconLabelClass";
import { useOSStore } from "@/stores/useOSStore";
import { DESKTOP_ICON_IDS, APP_META } from "@/types/os";

export default function DesktopGrid() {
  const openWindow = useOSStore((s) => s.openWindow);
  const { labelClass } = useIconLabelClass();

  return (
    <div className="absolute top-14 left-6 z-[1] grid grid-cols-1 gap-5 sm:grid-cols-1">
      {DESKTOP_ICON_IDS.map((id) => (
        <motion.button
          key={id}
          type="button"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          onDoubleClick={() => openWindow(id)}
          onClick={() => openWindow(id)}
          onMouseEnter={() => {
            if (id === "contact") void prefetchCalEmbed();
          }}
          className="group flex min-w-20 flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <AppIconTile
            appId={id}
            className="h-14 w-14 shadow-md transition duration-200 group-hover:brightness-110"
            iconSize={28}
          />
          <span className={`whitespace-nowrap text-center ${labelClass}`}>
            {APP_META[id].title}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
