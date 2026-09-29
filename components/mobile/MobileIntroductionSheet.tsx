"use client";

import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import IntroductionContent from "@/components/apps/IntroductionContent";
import { useOSStore } from "@/stores/useOSStore";

export default function MobileIntroductionSheet() {
  const closeIntroduction = useOSStore((s) => s.closeIntroduction);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="absolute inset-0 z-40 flex flex-col bg-[var(--os-window)]"
    >
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--os-border)] px-3">
        <button
          type="button"
          onClick={closeIntroduction}
          className="flex items-center gap-0.5 text-sm font-medium text-[var(--os-accent)]"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <h2 className="text-sm font-semibold text-[var(--os-text)]">
          Introduction
        </h2>
        <button
          type="button"
          onClick={closeIntroduction}
          className="rounded-full p-1.5 text-[var(--os-muted)] transition hover:bg-[var(--os-surface)]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </header>

      <IntroductionContent hideFooter />

      <div className="shrink-0 border-t border-[var(--os-border)] bg-[var(--os-window)] px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <p className="mb-3 text-center text-xs text-[var(--os-muted)]">
          Tip: my website is more fun on a computer screen
        </p>
        <button
          type="button"
          onClick={closeIntroduction}
          className="w-full rounded-xl bg-[var(--os-accent)] px-4 py-3.5 text-center text-sm font-semibold text-white transition active:opacity-90"
        >
          Go forth and explore!
        </button>
      </div>
    </motion.div>
  );
}
