"use client";

import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { APP_COMPONENTS, type WindowAppId } from "@/components/apps";
import { useOSStore } from "@/stores/useOSStore";
import { APP_META } from "@/types/os";

interface MobileAppModalProps {
  appId: WindowAppId;
}

export default function MobileAppModal({ appId }: MobileAppModalProps) {
  const closeMobileApp = useOSStore((s) => s.closeMobileApp);
  const AppContent = APP_COMPONENTS[appId];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="absolute inset-0 z-30 flex flex-col bg-[var(--os-window)]"
    >
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--os-border)] px-3">
        <button
          type="button"
          onClick={closeMobileApp}
          className="flex items-center gap-0.5 text-sm font-medium text-[var(--os-accent)]"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <h2 className="text-sm font-semibold text-[var(--os-text)]">
          {APP_META[appId].title}
        </h2>
        <button
          type="button"
          onClick={closeMobileApp}
          className="rounded-full p-1.5 text-[var(--os-muted)] transition hover:bg-[var(--os-surface)]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <AppContent />
      </div>
    </motion.div>
  );
}
