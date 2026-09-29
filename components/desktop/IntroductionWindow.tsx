"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IntroductionContent from "@/components/apps/IntroductionContent";
import { useOSStore } from "@/stores/useOSStore";

const WINDOW_WIDTH = 520;

export default function IntroductionWindow() {
  const closeIntroduction = useOSStore((s) => s.closeIntroduction);
  const focusIntroduction = useOSStore((s) => s.focusIntroduction);
  const isIntroductionOpen = useOSStore((s) => s.isIntroductionOpen);
  const introductionZIndex = useOSStore((s) => s.introductionZIndex);
  const [pos, setPos] = useState({ x: 120, y: 72 });

  useEffect(() => {
    setPos({
      x: Math.max(24, Math.round((window.innerWidth - WINDOW_WIDTH) / 2)),
      y: Math.max(56, Math.round(window.innerHeight * 0.1)),
    });
  }, []);

  if (!isIntroductionOpen) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 24, stiffness: 280 }}
      onPointerDownCapture={() => focusIntroduction()}
      onDragEnd={(_, info) => {
        setPos((prev) => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y,
        }));
      }}
      style={{ x: pos.x, y: pos.y, zIndex: introductionZIndex }}
      className="absolute top-0 left-0 flex w-[min(520px,92vw)] flex-col overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-window)] shadow-2xl"
    >
      <div className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-[var(--os-border)] bg-[var(--os-titlebar)] px-3 active:cursor-grabbing">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeIntroduction();
            }}
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-110"
            aria-label="Close introduction"
          />
          <span
            className="h-3 w-3 rounded-full bg-[#febc2e]/50"
            aria-hidden
          />
          <span
            className="h-3 w-3 rounded-full bg-[#28c840]/50"
            aria-hidden
          />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-[var(--os-muted)]">
          Introduction
        </span>
        <span className="w-12" />
      </div>

      <IntroductionContent />
    </motion.div>
  );
}
