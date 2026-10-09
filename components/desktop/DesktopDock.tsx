"use client";

import { motion } from "framer-motion";
import { prefetchCalEmbed } from "@/components/apps/CalBookingEmbed";
import { AppIconTile } from "@/components/apps/AppIcon";
import { useIconLabelClass } from "@/hooks/useIconLabelClass";
import { useOSStore } from "@/stores/useOSStore";
import { DOCK_APP_IDS, APP_META } from "@/types/os";

export default function DesktopDock() {
  const windows = useOSStore((s) => s.windows);
  const openWindow = useOSStore((s) => s.openWindow);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const { onBright, dockLabelClass } = useIconLabelClass();

  const handleClick = (id: (typeof DOCK_APP_IDS)[number]) => {
    const win = windows[id];
    if (win.isOpen && !win.isMinimized) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[1000] flex justify-center px-4">
      <nav className="desktop-dock pointer-events-auto flex items-stretch gap-1 rounded-[1.35rem] px-2.5 py-2">
        {DOCK_APP_IDS.map((id, index) => {
          const isActive = windows[id].isOpen && !windows[id].isMinimized;
          return (
            <div key={id} className="flex items-stretch">
              {index > 0 ? (
                <div
                  className="mx-0.5 w-px self-stretch bg-white/20"
                  aria-hidden
                />
              ) : null}
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                onClick={() => handleClick(id)}
                onMouseEnter={() => {
                  if (id === "contact") void prefetchCalEmbed();
                }}
                className="group flex min-w-[4.5rem] flex-col items-center gap-1 rounded-xl px-3 py-1.5 outline-none transition-colors hover:bg-white/15 focus-visible:bg-white/15"
                aria-label={APP_META[id].title}
              >
                <div className="relative">
                  <AppIconTile
                    appId={id}
                    className="h-11 w-11 shadow-md transition duration-200 group-hover:brightness-110"
                    iconSize={22}
                  />
                  <span
                    className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-opacity ${
                      isActive
                        ? onBright
                          ? "bg-neutral-800 opacity-100"
                          : "bg-white opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>
                <span
                  className={`mt-1 whitespace-nowrap text-center text-[10px] font-semibold tracking-wide ${dockLabelClass}`}
                >
                  {APP_META[id].title}
                </span>
              </motion.button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
