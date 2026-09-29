"use client";

import { useEffect, useState } from "react";
import { Moon, Smartphone, Sun } from "lucide-react";
import { useOSStore } from "@/stores/useOSStore";

function useAmsterdamClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function DesktopTopBar() {
  const theme = useOSStore((s) => s.theme);
  const isMobilePreviewForced = useOSStore((s) => s.isMobilePreviewForced);
  const toggleTheme = useOSStore((s) => s.toggleTheme);
  const toggleMobilePreview = useOSStore((s) => s.toggleMobilePreview);
  const time = useAmsterdamClock();

  return (
    <header className="absolute inset-x-0 top-0 z-[1100] flex h-9 items-center justify-between bg-[var(--os-topbar)] px-4 text-xs font-medium text-[var(--os-topbar-text)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="font-semibold tracking-tight">Portfolio OS</span>
      </div>

      <button
        type="button"
        onClick={toggleMobilePreview}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition ${
          isMobilePreviewForced
            ? "bg-white/25"
            : "hover:bg-white/15"
        }`}
      >
        <Smartphone size={14} />
        <span>Preview Mobile</span>
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded p-1 transition hover:bg-white/15"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <time className="tabular-nums">{time}</time>
      </div>
    </header>
  );
}
