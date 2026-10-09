"use client";

import { Folder, Inbox } from "lucide-react";
import FadeImage from "@/components/ui/FadeImage";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import { PROJECTS } from "@/lib/projects";
import { useOSStore } from "@/stores/useOSStore";

const PREVIEW_WIDTH = 240;
const PREVIEW_HEIGHT = 150;

export default function ProjectsApp() {
  const openProjectWindow = useOSStore((s) => s.openProjectWindow);
  const openMobileProject = useOSStore((s) => s.openMobileProject);
  const { isMobileLayout } = useResponsiveOS();

  const openProject = (projectId: string) => {
    if (isMobileLayout) {
      openMobileProject(projectId);
      return;
    }
    openProjectWindow(projectId);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--os-window)] text-[var(--os-text)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--os-border)] bg-[var(--os-titlebar)] px-3 py-2">
        <Folder size={14} className="text-[var(--os-accent)]" />
        <p className="text-xs font-medium tracking-wide text-[var(--os-muted)]">
          projects
        </p>
        <span className="text-xs text-[var(--os-muted)]/70">
          {PROJECTS.length} {PROJECTS.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div
          className={`grid grid-cols-2 gap-4 ${
            isMobileLayout ? "" : "sm:grid-cols-3"
          }`}
        >
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => openProject(project.id)}
              className="group flex flex-col gap-2 rounded-lg p-2 text-left transition outline-none hover:bg-[var(--os-surface)] focus-visible:ring-2 focus-visible:ring-[var(--os-accent)]"
            >
              <div className="relative aspect-[8/5] w-full overflow-hidden rounded-md bg-[var(--os-surface)] shadow-sm ring-1 ring-[var(--os-border)]">
                <FadeImage
                  src={project.thumbnail}
                  alt={project.name}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  quality={75}
                  sizes={`${PREVIEW_WIDTH}px`}
                  className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <div className="min-w-0 px-0.5">
                <p className="truncate text-xs font-medium">{project.name}</p>
                <p className="truncate text-[10px] text-[var(--os-muted)]">
                  {project.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div
          className="mt-6 flex flex-col items-center gap-3 border-t border-dashed border-[var(--os-border)] pt-5 text-center"
          aria-label="More projects coming soon"
        >
          <div className="flex items-end gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-md border border-dashed border-[var(--os-border)] bg-[var(--os-surface)]/60"
                style={{
                  width: `${2.75 - i * 0.2}rem`,
                  height: `${2.1 - i * 0.15}rem`,
                  opacity: 1 - i * 0.22,
                }}
              />
            ))}
            <Inbox
              size={18}
              className="mb-0.5 text-[var(--os-muted)]"
              strokeWidth={1.75}
            />
          </div>
          <div className="max-w-xs space-y-1">
            <p className="text-xs font-medium text-[var(--os-text)]">
              Working through the backlog
            </p>
            <p className="text-[11px] leading-relaxed text-[var(--os-muted)]">
              More projects are queued up and will land here as I write them up
              and upload the case studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
