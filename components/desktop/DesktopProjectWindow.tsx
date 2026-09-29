"use client";

import { motion } from "framer-motion";
import ProjectDetailApp from "@/components/apps/ProjectDetailApp";
import { useOSStore } from "@/stores/useOSStore";

const MAXIMIZED_INSET = {
  x: 8,
  y: 40,
  right: 8,
  bottom: 88,
} as const;

interface DesktopProjectWindowProps {
  projectId: string;
}

export default function DesktopProjectWindow({
  projectId,
}: DesktopProjectWindowProps) {
  const win = useOSStore((s) => s.projectWindows[projectId]);
  const closeProjectWindow = useOSStore((s) => s.closeProjectWindow);
  const minimizeProjectWindow = useOSStore((s) => s.minimizeProjectWindow);
  const toggleMaximizeProjectWindow = useOSStore(
    (s) => s.toggleMaximizeProjectWindow,
  );
  const focusProjectWindow = useOSStore((s) => s.focusProjectWindow);
  const updateProjectWindowPosition = useOSStore(
    (s) => s.updateProjectWindowPosition,
  );

  if (!win) return null;

  const maximized = win.isMaximized;

  return (
    <motion.div
      drag={!maximized}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(_, info) => {
        if (maximized) return;
        updateProjectWindowPosition(projectId, {
          x: win.position.x + info.offset.x,
          y: win.position.y + info.offset.y,
        });
      }}
      onPointerDownCapture={() => focusProjectWindow(projectId)}
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
          toggleMaximizeProjectWindow(projectId);
        }}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeProjectWindow(projectId);
            }}
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-110"
            aria-label="Close window"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              minimizeProjectWindow(projectId);
            }}
            className="h-3 w-3 rounded-full bg-[#febc2e] transition hover:brightness-110"
            aria-label="Minimize window"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeProjectWindow(projectId);
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
        <ProjectDetailApp projectId={projectId} />
      </div>
    </motion.div>
  );
}
