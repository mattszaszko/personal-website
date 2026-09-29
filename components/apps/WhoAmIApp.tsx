"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import {
  CV_DOWNLOAD_FILENAME,
  CV_DOWNLOAD_HREF,
  EDUCATION,
  EXPERIENCE,
  FUN_INTERESTS,
  LANGUAGES,
  WHOAMI_PROFILE,
  WHOAMI_SECTIONS,
} from "@/lib/whoami";

export default function WhoAmIApp() {
  const { isMobileLayout } = useResponsiveOS();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [showSectionHud, setShowSectionHud] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const hideHudTimer = useRef<number | null>(null);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root, rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35] },
    );

    for (const { id } of WHOAMI_SECTIONS) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || !isMobileLayout) return;

    const onScroll = () => {
      setShowSectionHud(true);
      if (hideHudTimer.current) window.clearTimeout(hideHudTimer.current);
      hideHudTimer.current = window.setTimeout(() => {
        setShowSectionHud(false);
      }, 900);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (hideHudTimer.current) window.clearTimeout(hideHudTimer.current);
    };
  }, [isMobileLayout]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const activeLabel =
    WHOAMI_SECTIONS.find((s) => s.id === activeSection)?.label ?? "About";

  return (
    <div className="flex h-full min-h-0 bg-[var(--os-window)] text-[var(--os-text)]">
      {!isMobileLayout ? (
        <nav
          className="flex w-36 shrink-0 flex-col gap-1 border-r border-[var(--os-border)] bg-[var(--os-titlebar)] p-3 md:w-44"
          aria-label="Who Am I sections"
        >
          <p className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-[var(--os-muted)] uppercase">
            Navigate
          </p>
          {WHOAMI_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`rounded-lg px-2.5 py-2 text-left text-sm transition ${
                  active
                    ? "bg-[var(--os-accent)]/15 font-medium text-[var(--os-accent)]"
                    : "text-[var(--os-muted)] hover:bg-[var(--os-surface)] hover:text-[var(--os-text)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>
      ) : null}

      <div className="relative min-h-0 min-w-0 flex-1">
        {isMobileLayout ? (
          <motion.div
            aria-hidden={!showSectionHud}
            initial={false}
            animate={{
              opacity: showSectionHud ? 1 : 0,
              y: showSectionHud ? 0 : -6,
            }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute top-16 left-1/2 z-20 -translate-x-1/2"
          >
            <div className="rounded-full border border-[var(--os-border)] bg-[var(--os-titlebar)]/95 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--os-text)] shadow-lg backdrop-blur-md">
              {activeLabel}
            </div>
          </motion.div>
        ) : null}

        <div ref={scrollerRef} className="h-full overflow-y-auto">
          <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--os-border)] bg-[var(--os-window)]/95 px-5 py-4 backdrop-blur-md">
            <div className="min-w-0">
              <h1
                className={`font-semibold tracking-tight ${
                  isMobileLayout ? "text-xl" : "text-xl sm:text-2xl"
                }`}
              >
                Who Am I
              </h1>
              <p className="mt-0.5 text-sm text-[var(--os-muted)]">
                {WHOAMI_PROFILE.title} · {WHOAMI_PROFILE.location}
              </p>
            </div>
            <a
              href={CV_DOWNLOAD_HREF}
              download={CV_DOWNLOAD_FILENAME}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--os-accent)] px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Download size={16} />
              {isMobileLayout ? (
                <span>CV</span>
              ) : (
                <>
                  <span className="hidden sm:inline">Download CV</span>
                  <span className="sm:hidden">CV</span>
                </>
              )}
            </a>
          </header>

          <div className="space-y-10 px-5 py-6">
            <section
              id="about"
              ref={(el) => {
                sectionRefs.current.about = el;
              }}
              className="scroll-mt-4"
            >
              <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                About
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--os-text)] sm:text-[15px]">
                {WHOAMI_PROFILE.summary}
              </p>
            </section>

            <section
              id="experience"
              ref={(el) => {
                sectionRefs.current.experience = el;
              }}
              className="scroll-mt-4"
            >
              <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                Experience
              </h2>
              <ol className="mt-4 space-y-5 border-l border-[var(--os-border)] pl-4">
                {EXPERIENCE.map((role) => (
                  <li
                    key={`${role.company}-${role.period}`}
                    className="relative"
                  >
                    <span className="absolute -left-[1.3rem] top-1.5 h-2 w-2 rounded-full bg-[var(--os-accent)]" />
                    <p className="text-xs font-medium text-[var(--os-accent)]">
                      {role.period}
                    </p>
                    <h3 className="mt-0.5 text-sm font-semibold text-[var(--os-text)]">
                      {role.title}
                    </h3>
                    <p className="text-sm text-[var(--os-muted)]">
                      {role.company} · {role.location}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {role.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[var(--os-muted)]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--os-muted)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section
              id="education"
              ref={(el) => {
                sectionRefs.current.education = el;
              }}
              className="scroll-mt-4"
            >
              <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                Education
              </h2>
              <div className="mt-4 space-y-3">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.school}
                    className="rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] px-4 py-3"
                  >
                    <p className="text-xs font-medium text-[var(--os-accent)]">
                      {edu.period}
                    </p>
                    <h3 className="mt-0.5 text-sm font-semibold">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-[var(--os-muted)]">
                      {edu.school} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              id="languages"
              ref={(el) => {
                sectionRefs.current.languages = el;
              }}
              className="scroll-mt-4"
            >
              <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                Languages
              </h2>
              <ul className="mt-4 max-w-md space-y-4">
                {LANGUAGES.map((lang) => (
                  <li key={lang.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-xs text-[var(--os-muted)]">
                        {lang.level}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--os-border)]">
                      <div
                        className="h-full rounded-full bg-[var(--os-accent)]"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="fun"
              ref={(el) => {
                sectionRefs.current.fun = el;
              }}
              className="scroll-mt-4 pb-4"
            >
              <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                Fun
              </h2>
              <p className="mt-2 text-sm text-[var(--os-muted)]">
                Outside of work, you&apos;ll usually find me chasing experiences
                like these:
              </p>
              <div
                className={`mt-4 grid gap-3 ${
                  isMobileLayout ? "" : "sm:grid-cols-2"
                }`}
              >
                {FUN_INTERESTS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] px-4 py-3"
                  >
                    <h3 className="text-sm font-semibold text-[var(--os-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--os-muted)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
