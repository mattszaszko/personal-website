"use client";

import { motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import ProjectDetailApp from "@/components/apps/ProjectDetailApp";
import { getProjectById } from "@/lib/projects";
import { useOSStore } from "@/stores/useOSStore";

interface MobileProjectSheetProps {
  projectId: string;
}

export default function MobileProjectSheet({
  projectId,
}: MobileProjectSheetProps) {
  const closeMobileProject = useOSStore((s) => s.closeMobileProject);
  const project = getProjectById(projectId);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="absolute inset-0 z-[35] flex flex-col bg-[var(--os-window)]"
    >
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--os-border)] px-3">
        <button
          type="button"
          onClick={closeMobileProject}
          className="flex items-center gap-0.5 text-sm font-medium text-[var(--os-accent)]"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <h2 className="max-w-[50%] truncate text-sm font-semibold text-[var(--os-text)]">
          {project?.name ?? "Project"}
        </h2>
        <button
          type="button"
          onClick={closeMobileProject}
          className="rounded-full p-1.5 text-[var(--os-muted)] transition hover:bg-[var(--os-surface)]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ProjectDetailApp projectId={projectId} />
      </div>
    </motion.div>
  );
}
