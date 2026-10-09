"use client";

import FadeImage from "@/components/ui/FadeImage";

export const INTRO_TIPS = [
  "Click or tap the icons to open apps and explore.",
  "Use the dock for Projects, Who Am I, and Contact.",
  "Open Terminal and type help. Try toasters or contact.",
  "Swap wallpapers from the Wallpapers folder.",
] as const;

interface IntroductionContentProps {
  /** Mobile: drop the decorative footer strip (CTA lives outside) */
  hideFooter?: boolean;
}

export default function IntroductionContent({
  hideFooter = false,
}: IntroductionContentProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--os-window)]">
      <div className="intro-hero relative overflow-hidden px-5 pt-6 pb-5">
        <div className="intro-hero-glow pointer-events-none absolute inset-0" />
        <div className="relative z-[1] flex items-center gap-4">
          <div className="intro-avatar relative h-24 w-24 shrink-0 rounded-full p-[3px] shadow-lg sm:h-28 sm:w-28">
            <div className="intro-avatar-bg relative h-full w-full overflow-hidden rounded-full">
              <FadeImage
                src="/profile/profilepic.png"
                alt="Matt Szaszko"
                fill
                sizes="112px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-[var(--os-text)] sm:text-2xl">
              Welcome to my website 👋
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--os-muted)]">
              Product &amp; brand design, technology, and prototypes before big
              budgets.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-[var(--os-border)] px-5 py-5 text-[var(--os-text)]">
        <p className="text-sm leading-relaxed text-[var(--os-muted)]">
          My name is Matt Szaszko and I help businesses solve problems through
          product design, brand design, and technology. I partner with you to
          shape the experience and identity, then prototype the solution so you
          can validate before you commit to blowing your budget on a fully
          fledged development team.
        </p>
        <p className="text-sm font-medium text-[var(--os-text)]">
          Explore by using the icons. Here&apos;s what you can do:
        </p>
        <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--os-muted)]">
          {INTRO_TIPS.map((tip) => (
            <li key={tip} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--os-accent)]" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {!hideFooter ? (
        <div className="intro-footer relative h-10 overflow-hidden border-t border-[var(--os-border)]">
          <div className="intro-footer-glow pointer-events-none absolute inset-0" />
        </div>
      ) : null}
    </div>
  );
}
