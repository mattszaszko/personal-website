"use client";

import type { AppId } from "@/types/os";

/** 16×16 pixel glyphs — crispEdges keeps the chunky look when scaled up */
function PixelSvg({
  size = 22,
  className,
  children,
}: {
  size?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {children}
    </svg>
  );
}

type PixelProps = { size?: number; className?: string };

function PixelFolder({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="1" y="3" width="5" height="2" fill="currentColor" />
      <rect x="6" y="4" width="1" height="1" fill="currentColor" />
      <rect x="1" y="5" width="14" height="9" fill="currentColor" />
      <rect x="3" y="7" width="2" height="4" fill="#000" opacity="0.28" />
      <rect x="7" y="7" width="2" height="2" fill="#000" opacity="0.28" />
      <rect x="11" y="7" width="2" height="3" fill="#000" opacity="0.28" />
    </PixelSvg>
  );
}

function PixelBriefcase({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="5" y="2" width="6" height="2" fill="currentColor" />
      <rect x="1" y="4" width="14" height="2" fill="currentColor" />
      <rect x="1" y="6" width="14" height="8" fill="currentColor" />
      <rect x="7" y="7" width="2" height="2" fill="#000" opacity="0.3" />
      <rect x="6" y="9" width="4" height="1" fill="#000" opacity="0.22" />
    </PixelSvg>
  );
}

function PixelUser({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="6" y="2" width="4" height="1" fill="currentColor" />
      <rect x="5" y="3" width="6" height="4" fill="currentColor" />
      <rect x="6" y="7" width="4" height="1" fill="currentColor" />
      <rect x="4" y="9" width="8" height="1" fill="currentColor" />
      <rect x="3" y="10" width="10" height="1" fill="currentColor" />
      <rect x="2" y="11" width="12" height="3" fill="currentColor" />
    </PixelSvg>
  );
}

function PixelMail({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="1" y="3" width="14" height="10" fill="currentColor" />
      <rect x="2" y="4" width="12" height="1" fill="#000" opacity="0.22" />
      <rect x="2" y="5" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="13" y="5" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="3" y="6" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="12" y="6" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="4" y="7" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="11" y="7" width="1" height="1" fill="#000" opacity="0.22" />
      <rect x="5" y="8" width="6" height="1" fill="#000" opacity="0.22" />
    </PixelSvg>
  );
}

function PixelImages({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      {/* back frame */}
      <rect x="1" y="4" width="11" height="11" fill="currentColor" opacity="0.55" />
      {/* front frame */}
      <rect x="4" y="1" width="11" height="11" fill="currentColor" />
      <rect x="6" y="3" width="2" height="2" fill="#000" opacity="0.3" />
      <rect x="5" y="9" width="3" height="2" fill="#000" opacity="0.28" />
      <rect x="8" y="7" width="2" height="4" fill="#000" opacity="0.28" />
      <rect x="10" y="5" width="3" height="6" fill="#000" opacity="0.22" />
    </PixelSvg>
  );
}

function PixelTerminal({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="1" y="2" width="14" height="12" fill="currentColor" />
      <rect x="3" y="5" width="2" height="1" fill="#000" opacity="0.4" />
      <rect x="4" y="6" width="2" height="1" fill="#000" opacity="0.4" />
      <rect x="3" y="7" width="2" height="1" fill="#000" opacity="0.4" />
      <rect x="7" y="9" width="5" height="2" fill="#000" opacity="0.4" />
    </PixelSvg>
  );
}

function PixelToaster({ size, className }: PixelProps) {
  return (
    <PixelSvg size={size} className={className}>
      <rect x="0" y="6" width="3" height="3" fill="currentColor" opacity="0.8" />
      <rect x="13" y="6" width="3" height="3" fill="currentColor" opacity="0.8" />
      <rect x="3" y="4" width="10" height="9" fill="currentColor" />
      <rect x="5" y="5" width="2" height="5" fill="#000" opacity="0.4" />
      <rect x="9" y="5" width="2" height="5" fill="#000" opacity="0.4" />
      <rect x="12" y="6" width="1" height="3" fill="#f87171" />
    </PixelSvg>
  );
}

const PIXEL_ICONS: Record<AppId, (props: PixelProps) => React.ReactNode> = {
  projects: PixelFolder,
  services: PixelBriefcase,
  whoami: PixelUser,
  contact: PixelMail,
  wallpapers: PixelImages,
  terminal: PixelTerminal,
  toasters: PixelToaster,
};

interface AppIconProps {
  appId: AppId;
  className?: string;
  size?: number;
}

export function AppIcon({ appId, className, size = 22 }: AppIconProps) {
  const Icon = PIXEL_ICONS[appId];
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
      className={`flex items-center justify-center rounded-md text-white shadow-sm ${ACCENT[appId]} ${className}`}
    >
      <AppIcon appId={appId} size={iconSize} />
    </div>
  );
}
