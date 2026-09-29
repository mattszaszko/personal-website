"use client";

import { motion } from "framer-motion";
import { APP_COMPONENTS, type WindowAppId } from "@/components/apps";
import { useOSStore } from "@/stores/useOSStore";

/** Insets matching top bar (~36px) and dock clearance */
const MAXIMIZED_INSET = {
  x: 8,
  y: 40,
  right: 8,
  bottom: 88,
} as const;

interface DesktopWindowProps {
  appId: WindowAppId;
}

export default function DesktopWindow({ appId }: DesktopWindowProps) {
  const win = useOSStore((s) => s.windows[appId]);
  const closeWindow = useOSStore((s) => s.closeWindow);
  const minimizeWindow = useOSStore((s) => s.minimizeWindow);
  const toggleMaximizeWindow = useOSStore((s) => s.toggleMaximizeWindow);
  const focusWindow = useOSStore((s) => s.focusWindow);
  const updateWindowPosition = useOSStore((s) => s.updateWindowPosition);

  const AppContent = APP_COMPONENTS[appId];
  const maximized = win.isMaximized;

  return (
    <motion.div
      drag={!maximized}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(_, info) => {
        if (maximized) return;
        updateWindowPosition(appId, {
          x: win.position.x + info.offset.x,
          y: win.position.y + info.offset.y,
        });
      }}
      onPointerDownCapture={() => focusWindow(appId)}
      initial={false}
      animate={
        maximized
          ? {
              x: MAXIMIZED_INSET.x,
              y: MAXIMIZED_INSET.y,
              width: `calc(100vw - ${MAXIMIZED_INSET.x + MAXIMIZED_INSET.right}px)`,
              height: `calc(100vh - ${MAXIMIZED_INSET.y + MAXIMIZED_INSET.bottom}px)`,
            }
          : {
              x: win.position.x,
              y: win.position.y,
              width: win.size.width,
              height: win.size.height,
            }
      }
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      style={{ zIndex: win.zIndex }}
      className="absolute top-0 left-0 flex flex-col overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-window)] shadow-2xl"
    >
      <div
        className={`flex h-10 shrink-0 items-center gap-2 border-b border-[var(--os-border)] bg-[var(--os-titlebar)] px-3 ${
          maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
        onDoubleClick={(e) => {
          e.stopPropagation();
          toggleMaximizeWindow(appId);
        }}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(appId);
            }}
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-110"
            aria-label="Close window"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(appId);
            }}
            className="h-3 w-3 rounded-full bg-[#febc2e] transition hover:brightness-110"
            aria-label="Minimize window"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeWindow(appId);
            }}
            className="h-3 w-3 rounded-full bg-[#28c840] transition hover:brightness-110"
            aria-label={maximized ? "Restore window" : "Maximize window"}
          />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-[var(--os-muted)]">
          {win.title}
        </span>
        <span className="w-12" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-[var(--os-window)]">
        <AppContent />
      </div>
    </motion.div>
  );
}
