"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import FadeImage from "@/components/ui/FadeImage";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import {
  PROJECT_SECTIONS,
  getProjectById,
  type Project,
} from "@/lib/projects";

interface ProjectDetailAppProps {
  projectId: string;
}

function sectionParagraphs(
  project: Project,
  id: (typeof PROJECT_SECTIONS)[number]["id"],
): string[] {
  if (id === "problem") return project.problem;
  if (id === "solution") return project.solution;
  return project.results;
}

export default function ProjectDetailApp({ projectId }: ProjectDetailAppProps) {
  const project = getProjectById(projectId);
  const { isMobileLayout } = useResponsiveOS();
  const [activeSection, setActiveSection] = useState<string>("problem");
  const [showSectionHud, setShowSectionHud] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const hideHudTimer = useRef<number | null>(null);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || !project) return;

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

    for (const { id } of PROJECT_SECTIONS) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [project]);

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

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-[var(--os-muted)]">
        Project not found.
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const activeLabel =
    PROJECT_SECTIONS.find((s) => s.id === activeSection)?.label ?? "Problem";

  return (
    <div className="flex h-full min-h-0 bg-[var(--os-window)] text-[var(--os-text)]">
      {!isMobileLayout ? (
        <nav
          className="flex w-36 shrink-0 flex-col gap-1 border-r border-[var(--os-border)] bg-[var(--os-titlebar)] p-3 md:w-44"
          aria-label="Project sections"
        >
          <p className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-[var(--os-muted)] uppercase">
            Navigate
          </p>
          {PROJECT_SECTIONS.map(({ id, label }) => {
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
                {project.name}
              </h1>
              <p className="mt-0.5 text-sm text-[var(--os-muted)]">
                {project.subtitle}
              </p>
            </div>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--os-accent)] px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Check it out
                <ExternalLink size={14} />
              </a>
            ) : null}
          </header>

          <div className="space-y-10 px-5 py-6">
            {PROJECT_SECTIONS.map(({ id, label }) => (
              <section
                key={id}
                id={id}
                ref={(el) => {
                  sectionRefs.current[id] = el;
                }}
                className="scroll-mt-4"
              >
                <h2 className="text-sm font-semibold tracking-wider text-[var(--os-muted)] uppercase">
                  {label}
                </h2>
                <div className="mt-3 max-w-2xl space-y-3">
                  {sectionParagraphs(project, id).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-sm leading-relaxed text-[var(--os-text)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {id === "solution" && project.solutionMedia ? (
                  <div className="relative mt-5 overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] shadow-sm">
                    <FadeImage
                      src={project.solutionMedia.src}
                      alt={project.solutionMedia.alt}
                      width={1280}
                      height={800}
                      unoptimized
                      className="block h-auto w-full"
                      fadeDurationMs={500}
                    />
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
