"use client";

import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { useResponsiveOS } from "@/hooks/useResponsiveOS";
import CalBookingEmbed from "./CalBookingEmbed";

const LINKS = [
  {
    label: "Email",
    href: "mailto:hello@mattszaszko.com",
    icon: Mail,
    detail: "hello@mattszaszko.com",
  },
  {
    label: "Phone",
    href: "tel:+31615241100",
    icon: Phone,
    detail: "+31 6 1524 1100",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mattszaszko/",
    icon: Briefcase,
    detail: "linkedin.com/in/mattszaszko",
  },
  {
    label: "Location",
    href: "https://maps.google.com/?q=Utrecht",
    icon: MapPin,
    detail: "Utrecht, Netherlands",
  },
];

export default function ContactApp() {
  const { isMobileLayout } = useResponsiveOS();

  return (
    <div
      className={`flex h-full min-h-0 gap-4 p-5 ${
        isMobileLayout
          ? "flex-col overflow-y-auto"
          : "flex-col overflow-hidden md:flex-row md:gap-5"
      }`}
    >
      <aside
        className={`flex w-full shrink-0 flex-col gap-4 ${
          isMobileLayout ? "" : "md:w-56 lg:w-64"
        }`}
      >
        <header>
          <h1
            className={`font-semibold tracking-tight text-[var(--os-text)] ${
              isMobileLayout ? "text-xl" : "text-xl md:text-2xl"
            }`}
          >
            Contact
          </h1>
          <p className="mt-1 text-sm text-[var(--os-muted)]">
            Reach out or book a coffee chat.
          </p>
        </header>

        <section className="space-y-2">
          {LINKS.map(({ label, href, icon: Icon, detail }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] px-3 py-2.5 transition hover:bg-[var(--os-surface-hover)]"
            >
              <Icon className="h-4 w-4 shrink-0 text-[var(--os-accent)]" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--os-text)]">
                  {label}
                </p>
                <p className="truncate text-xs text-[var(--os-muted)]">
                  {detail}
                </p>
              </div>
            </a>
          ))}
        </section>
      </aside>

      <section
        className={`flex min-h-[420px] min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] p-3 ${
          isMobileLayout ? "" : "md:min-h-0 md:p-4"
        }`}
      >
        <h2 className="shrink-0 font-medium text-[var(--os-text)]">
          Book a coffee chat
        </h2>
        <p className="mt-0.5 mb-2 shrink-0 text-sm text-[var(--os-muted)]">
          Pick a time that works for you.
        </p>
        <CalBookingEmbed />
      </section>
    </div>
  );
}
