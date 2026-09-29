"use client";

import {
  Briefcase,
  FolderKanban,
  Images,
  Mail,
  Terminal,
  User,
  type LucideIcon,
} from "lucide-react";
import type { AppId } from "@/types/os";
import { APP_META } from "@/types/os";

function ToasterGlyph({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <ellipse cx="5" cy="9" rx="4" ry="2.2" fill="currentColor" opacity="0.85" />
      <ellipse cx="19" cy="9" rx="4" ry="2.2" fill="currentColor" opacity="0.85" />
      <rect x="6" y="8" width="12" height="9" rx="1.5" fill="currentColor" />
      <rect x="8" y="9.5" width="2.5" height="4" rx="0.5" fill="#111" opacity="0.45" />
      <rect x="13.5" y="9.5" width="2.5" height="4" rx="0.5" fill="#111" opacity="0.45" />
      <rect x="17.5" y="10" width="1.5" height="3.5" rx="0.4" fill="#f87171" />
    </svg>
  );
}

const ICON_MAP: Record<Exclude<AppMetaIcon, "Toaster">, LucideIcon> = {
  FolderKanban,
  Briefcase,
  User,
  Mail,
  Images,
  Terminal,
};

type AppMetaIcon = (typeof APP_META)[AppId]["iconName"];

interface AppIconProps {
  appId: AppId;
  className?: string;
  size?: number;
}

export function AppIcon({ appId, className, size = 22 }: AppIconProps) {
  const iconName = APP_META[appId].iconName;
  if (iconName === "Toaster") {
    return <ToasterGlyph size={size} className={className} />;
  }
  const Icon = ICON_MAP[iconName];
  return <Icon className={className} size={size} />;
}

const ACCENT: Record<AppId, string> = {
  projects: "bg-sky-500",
  services: "bg-emerald-500",
  whoami: "bg-teal-500",
  contact: "bg-amber-500",
  wallpapers: "bg-violet-500",
  terminal: "bg-neutral-800",
  toasters: "bg-orange-500",
};

interface AppIconTileProps {
  appId: AppId;
  className?: string;
  iconSize?: number;
}

export function AppIconTile({
  appId,
  className = "",
  iconSize = 28,
}: AppIconTileProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl text-white shadow-sm ${ACCENT[appId]} ${className}`}
    >
      <AppIcon appId={appId} size={iconSize} />
    </div>
  );
}
