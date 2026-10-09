"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import { TERMINAL_INPUT_ID } from "@/lib/openMobileAppFromGesture";
import { useOSStore } from "@/stores/useOSStore";

type Line = { text: string; tone?: "muted" | "accent" | "error" | "default" };

const HELP_LINES: Line[] = [
  { text: "Available commands:", tone: "accent" },
  { text: "  help       Show this command list", tone: "muted" },
  { text: "  stack      List the tech stack I work with", tone: "muted" },
  { text: "  whoami     Open the Who Am I window", tone: "muted" },
  { text: "  contact    Open the Contact window", tone: "muted" },
  {
    text: "  toasters   Launch the Flying Toasters screensaver",
    tone: "muted",
  },
  { text: "  clear      Clear the terminal", tone: "muted" },
  { text: "" },
];

const STACK_ITEMS = [
  {
    name: "Cursor",
    blurb: "AI-native coding environment for shipping product fast",
  },
  {
    name: "Figma",
    blurb:
      "UI design and prototyping, including Figma MCP to bridge designs into AI coding workflows",
  },
  {
    name: "Google Stitch",
    blurb: "AI-assisted UI generation and design exploration from prompts",
  },
  {
    name: "IAM",
    blurb: "Identity and access management for secure cloud permissions",
  },
  {
    name: "Postman",
    blurb: "API design, testing, and documentation workflows",
  },
  {
    name: "AWS",
    blurb: "Cloud infrastructure for scalable backends and services",
  },
  {
    name: "Firebase",
    blurb: "Auth, data, and hosting for rapid app backends",
  },
  {
    name: "Zapier",
    blurb: "Automation that connects tools without custom glue code",
  },
  {
    name: "GraphQL",
    blurb: "Flexible APIs that let clients ask for exactly what they need",
  },
  {
    name: "REST APIs",
    blurb: "Reliable HTTP interfaces for integrating systems",
  },
] as const;

const STACK_LINES: Line[] = [
  { text: "Tech stack:", tone: "accent" },
  { text: "" },
  ...STACK_ITEMS.flatMap(({ name, blurb }) => [
    { text: `  ${name}`, tone: "default" as const },
    { text: `    ${blurb}`, tone: "muted" as const },
    { text: "" },
  ]),
];

const BOOT_LINES: Line[] = [
  { text: "Portfolio OS Terminal v0.1.0" },
  { text: "Welcome. Type `help` to see available commands.", tone: "muted" },
  { text: "" },
  ...HELP_LINES,
];

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobileLayout } = useResponsiveOS();

  const openWindow = useOSStore((s) => s.openWindow);
  const startScreensaver = useOSStore((s) => s.startScreensaver);
  const isTerminalTop = useOSStore((s) => {
    const win = s.windows.terminal;
    const mobileOpen = s.activeMobileApp === "terminal";
    return (
      !s.isScreensaverActive &&
      ((win.isOpen && !win.isMinimized && win.zIndex === s.topZ) || mobileOpen)
    );
  });

  useEffect(() => {
    const id = window.setInterval(() => setShowCursor((v) => !v), 530);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (!isTerminalTop) return;
    const el = inputRef.current;
    if (!el) return;

    const focusInput = () => {
      el.focus({ preventScroll: true });
    };

    focusInput();

    // Desktop: keep focus captured. Mobile: don't fight the OS keyboard
    // (blur→refocus dismisses it / blocks typing).
    if (isMobileLayout) return;

    const onBlur = () => {
      requestAnimationFrame(() => {
        const stillTop = (() => {
          const s = useOSStore.getState();
          const win = s.windows.terminal;
          return (
            !s.isScreensaverActive &&
            win.isOpen &&
            !win.isMinimized &&
            win.zIndex === s.topZ
          );
        })();
        if (stillTop) focusInput();
      });
    };

    el.addEventListener("blur", onBlur);
    return () => el.removeEventListener("blur", onBlur);
  }, [isTerminalTop, isMobileLayout, lines]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    const command = trimmed.toLowerCase();
    const echoed: Line[] = [
      {
        text: `matt@portfolio ~ % ${trimmed}`,
        tone: "default",
      },
    ];

    if (!command) {
      setLines((prev) => [...prev, ...echoed]);
      return;
    }

    let output: Line[] = [];

    switch (command) {
      case "help":
        output = HELP_LINES;
        break;
      case "stack":
      case "tech":
      case "techstack":
        output = STACK_LINES;
        break;
      case "clear":
        setLines([]);
        return;
      case "contact":
        openWindow("contact");
        output = [{ text: "Opening Contact...", tone: "accent" }, { text: "" }];
        break;
      case "whoami":
        openWindow("whoami");
        output = [{ text: "Opening Who Am I...", tone: "accent" }, { text: "" }];
        break;
      case "toasters":
      case "toaster":
      case "screensaver":
        startScreensaver();
        output = [
          { text: "Launching Flying Toasters...", tone: "accent" },
          { text: "Move the mouse or press a key to exit.", tone: "muted" },
          { text: "" },
        ];
        break;
      default:
        output = [
          {
            text: `command not found: ${trimmed}. Type \`help\` for options.`,
            tone: "error",
          },
          { text: "" },
        ];
    }

    setLines((prev) => [...prev, ...echoed, ...output]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const toneClass = (tone: Line["tone"]) => {
    switch (tone) {
      case "muted":
        return "text-[#8b949e]";
      case "accent":
        return "text-[#7ee787]";
      case "error":
        return "text-[#ff7b72]";
      default:
        return "text-[#e5e5e5]";
    }
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-[#0c0c0c] font-mono text-[13px] text-[#e5e5e5]"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollerRef}
        className="terminal-scroll min-h-0 flex-1 overflow-auto px-4 py-3 leading-relaxed"
      >
        {lines.map((line, i) => (
          <p
            key={`${i}-${line.text}`}
            className={`whitespace-pre-wrap ${toneClass(line.tone)}`}
          >
            {line.text || "\u00a0"}
          </p>
        ))}

        <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-[#7ee787]">matt@portfolio</span>
          <span className="shrink-0 text-[#8b949e]">~</span>
          <span className="shrink-0 text-[#79c0ff]">%</span>
          <div className="relative min-w-0 flex-1 self-stretch">
            <input
              id={TERMINAL_INPUT_ID}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-full w-full bg-transparent text-[#e5e5e5] caret-transparent outline-none"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              inputMode="text"
              enterKeyHint="go"
              aria-label="Terminal input"
            />
            <span
              className={`pointer-events-none absolute top-[0.2em] left-0 h-[1.05em] w-[0.55ch] bg-[#e5e5e5] ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateX(${input.length}ch)`,
              }}
              aria-hidden
            />
          </div>
        </form>
      </div>
      <div className="shrink-0 border-t border-white/10 px-4 py-2 text-[11px] text-[#8b949e]">
        tip: try <span className="text-[#7ee787]">stack</span>,{" "}
        <span className="text-[#7ee787]">whoami</span>,{" "}
        <span className="text-[#7ee787]">toasters</span>, or{" "}
        <span className="text-[#7ee787]">contact</span>
      </div>
    </div>
  );
}
