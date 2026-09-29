"use client";

import { useEffect, useState } from "react";
import { Battery, Moon, Signal, Sun, Wifi } from "lucide-react";
import { useIconLabelClass } from "@/hooks/useIconLabelClass";
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

export default function MobileStatusBar() {
  const theme = useOSStore((s) => s.theme);
  const toggleTheme = useOSStore((s) => s.toggleTheme);
  const time = useAmsterdamClock();
  const { labelClass } = useIconLabelClass();

  return (
    <div
      className={`flex h-11 shrink-0 items-center justify-between px-5 pt-2 text-[11px] font-semibold ${labelClass}`}
    >
      <time className="tabular-nums">{time}</time>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full bg-[var(--os-surface)] p-1 text-[var(--os-muted)]"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={12} /> : <Sun size={12} />}
        </button>
        <Signal size={13} />
        <Wifi size={13} />
        <Battery size={14} />
      </div>
    </div>
  );
}
