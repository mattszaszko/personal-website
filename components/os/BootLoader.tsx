"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootLoaderProps {
  /** Called after the exit fade finishes */
  onFinished: () => void;
  /** Minimum time the boot screen stays visible */
  minDurationMs?: number;
}

export default function BootLoader({
  onFinished,
  minDurationMs = 1600,
}: BootLoaderProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setExiting(true), minDurationMs);
    return () => window.clearTimeout(start);
  }, [minDurationMs]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Starting Portfolio OS"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: exiting ? 0.55 : 0.35, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (exiting) onFinished();
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-10"
      >
        <BootMark />

        <div className="boot-progress" aria-hidden>
          <div className="boot-progress-fill" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Abstract mark inspired by classic Mac boot screens (not an Apple logo) */
function BootMark() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="text-white"
    >
      <rect
        x="8"
        y="10"
        width="40"
        height="30"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M20 40h16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M14 48h28"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="28" cy="25" r="4.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
