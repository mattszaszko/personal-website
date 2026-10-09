export type AppId =
  | "projects"
  | "services"
  | "whoami"
  | "contact"
  | "wallpapers"
  | "terminal"
  | "toasters";
export type Language = "EN" | "NL";
export type OSMode = "desktop" | "mobile";
export type Theme = "light" | "dark";

export interface WindowBounds {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface WindowConfig {
  id: AppId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  /** Saved bounds used to restore after leaving maximized mode */
  restoreBounds: WindowBounds | null;
}

/** Desktop window opened from a project thumbnail */
export interface ProjectWindowConfig {
  projectId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  restoreBounds: WindowBounds | null;
}

export interface AppMeta {
  title: string;
  iconName:
    | "FolderKanban"
    | "Briefcase"
    | "User"
    | "Mail"
    | "Images"
    | "Terminal"
    | "Toaster";
  defaultSize: { width: number; height: number };
}

/** Apps that open real windows */
export const WINDOW_APP_IDS = [
  "projects",
  "services",
  "whoami",
  "contact",
  "wallpapers",
  "terminal",
] as const satisfies readonly AppId[];

/** All ids that participate in OS state (includes screensaver launcher) */
export const APP_IDS: AppId[] = [...WINDOW_APP_IDS, "toasters"];

/** Main portfolio apps shown in the dock / mobile home */
export const DOCK_APP_IDS: AppId[] = [
  "projects",
  "whoami",
  "contact",
];

/** Icons shown on the desktop launcher (desktop only extras included) */
export const DESKTOP_ICON_IDS: AppId[] = [
  "projects",
  "whoami",
  "contact",
  "wallpapers",
  "terminal",
  "toasters",
];

/** Apps available on mobile home (no screensaver) */
export const MOBILE_APP_IDS: AppId[] = [
  "projects",
  "whoami",
  "contact",
  "wallpapers",
  "terminal",
];

export const APP_META: Record<AppId, AppMeta> = {
  projects: {
    title: "Projects",
    iconName: "FolderKanban",
    defaultSize: { width: 560, height: 420 },
  },
  services: {
    title: "Services",
    iconName: "Briefcase",
    defaultSize: { width: 640, height: 480 },
  },
  whoami: {
    title: "Who Am I",
    iconName: "User",
    defaultSize: { width: 640, height: 480 },
  },
  contact: {
    title: "Contact",
    iconName: "Mail",
    defaultSize: { width: 1040, height: 820 },
  },
  wallpapers: {
    title: "Wallpapers",
    iconName: "Images",
    defaultSize: { width: 560, height: 420 },
  },
  terminal: {
    title: "Terminal",
    iconName: "Terminal",
    defaultSize: { width: 640, height: 400 },
  },
  toasters: {
    title: "Toasters",
    iconName: "Toaster",
    defaultSize: { width: 0, height: 0 },
  },
};
