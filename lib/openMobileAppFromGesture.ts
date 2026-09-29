import { flushSync } from "react-dom";
import { useOSStore } from "@/stores/useOSStore";
import type { AppId } from "@/types/os";

const TERMINAL_INPUT_ID = "portfolio-terminal-input";

/**
 * Open a mobile app. For Terminal, flush-render then focus the input inside
 * the same user-gesture stack so iOS/Android show the on-screen keyboard.
 */
export function openMobileAppFromGesture(id: AppId) {
  flushSync(() => {
    useOSStore.getState().openMobileApp(id);
  });

  if (id !== "terminal") return;

  const el = document.getElementById(
    TERMINAL_INPUT_ID,
  ) as HTMLInputElement | null;
  el?.focus({ preventScroll: true });
}

export { TERMINAL_INPUT_ID };
