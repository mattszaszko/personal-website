"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StickyItem {
  id: string;
  label: string;
  done: boolean;
}

const INITIAL_ITEMS: StickyItem[] = [
  { id: "website", label: "Finish cool personal website", done: true },
  { id: "clients", label: "Get clients", done: false },
  { id: "build", label: "Build awesome sh*t", done: false },
  { id: "fun", label: "Have fun", done: false },
];

export default function DesktopStickyNote() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <motion.aside
      initial={{ opacity: 0, rotate: 4, y: -8 }}
      animate={{ opacity: 1, rotate: 2.5, y: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 160, delay: 0.15 }}
      className="pointer-events-auto absolute top-14 right-8 z-[2] w-[220px] select-none sm:right-12 sm:w-[240px]"
      aria-label="To-do sticky note"
    >
      {/* Tape */}
      <div
        className="absolute -top-2 left-1/2 z-10 h-5 w-16 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-[#f5e6b8]/80 shadow-sm backdrop-blur-[1px]"
        aria-hidden
      />

      <div className="sticky-note relative rounded-sm px-4 pt-5 pb-4 shadow-[2px_6px_16px_rgba(0,0,0,0.18)]">
        <p className="sticky-note-title mb-3 text-[15px] font-semibold tracking-wide text-[#5c4a1f]/90">
          To do
        </p>

        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-start gap-2.5 text-left outline-none"
              >
                <span
                  className={`mt-0.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition ${
                    item.done
                      ? "border-[#6b5a2a] bg-[#6b5a2a] text-[#f7e27a]"
                      : "border-[#6b5a2a]/70 bg-transparent"
                  }`}
                  aria-hidden
                >
                  {item.done ? <Check size={11} strokeWidth={3} /> : null}
                </span>
                <span
                  className={`sticky-note-body text-[15px] leading-snug text-[#3d3218] ${
                    item.done ? "line-through decoration-[#6b5a2a]/70 opacity-70" : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
