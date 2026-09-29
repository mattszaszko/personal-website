import { create } from "zustand";
import {
  DEFAULT_WALLPAPER_ID,
  getWallpaperById,
} from "@/lib/wallpapers";
import {
  PROJECT_DETAIL_SIZE,
  getProjectById,
} from "@/lib/projects";
import {
  APP_IDS,
  APP_META,
  type AppId,
  type Language,
  type ProjectWindowConfig,
  type Theme,
  type WindowConfig,
} from "@/types/os";

/** Desktop stacking: icons ~1, windows 100+, dock 1000, top bar 1100 */
export const WINDOW_Z_BASE = 100;

/** Intro starts above idle window defaults so it appears on top at load */
const INITIAL_TOP_Z = WINDOW_Z_BASE + 50;

interface OSState {
  language: Language;
  theme: Theme;
  wallpaperId: string;
  isMobilePreviewForced: boolean;
  isScreensaverActive: boolean;
  isIntroductionOpen: boolean;
  introductionZIndex: number;
  /** Monotonic counter: every open/focus claims topZ + 1 */
  topZ: number;
  activeMobileApp: AppId | null;
  activeMobileProjectId: string | null;
  windows: Record<AppId, WindowConfig>;
  projectWindows: Record<string, ProjectWindowConfig>;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  setWallpaper: (id: string) => void;
  toggleMobilePreview: () => void;
  startScreensaver: () => void;
  stopScreensaver: () => void;
  closeIntroduction: () => void;
  focusIntroduction: () => void;
  openMobileApp: (id: AppId) => void;
  closeMobileApp: () => void;
  openMobileProject: (projectId: string) => void;
  closeMobileProject: () => void;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, pos: { x: number; y: number }) => void;
  openProjectWindow: (projectId: string) => void;
  closeProjectWindow: (projectId: string) => void;
  minimizeProjectWindow: (projectId: string) => void;
  toggleMaximizeProjectWindow: (projectId: string) => void;
  focusProjectWindow: (projectId: string) => void;
  updateProjectWindowPosition: (
    projectId: string,
    pos: { x: number; y: number },
  ) => void;
}

const INITIAL_POSITIONS: Record<AppId, { x: number; y: number }> = {
  projects: { x: 80, y: 72 },
  services: { x: 100, y: 90 },
  whoami: { x: 140, y: 110 },
  contact: { x: 48, y: 48 },
  wallpapers: { x: 220, y: 100 },
  terminal: { x: 160, y: 160 },
  toasters: { x: 0, y: 0 },
};

function createInitialWindows(): Record<AppId, WindowConfig> {
  return APP_IDS.reduce(
    (acc, id, index) => {
      const meta = APP_META[id];
      acc[id] = {
        id,
        title: meta.title,
        iconName: meta.iconName,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: WINDOW_Z_BASE + index,
        position: INITIAL_POSITIONS[id],
        size: { ...meta.defaultSize },
        restoreBounds: null,
      };
      return acc;
    },
    {} as Record<AppId, WindowConfig>,
  );
}

function projectWindowOffset(existingCount: number) {
  return {
    x: 120 + existingCount * 28,
    y: 88 + existingCount * 24,
  };
}

export const useOSStore = create<OSState>((set, get) => {
  const claimTopZ = (): number => {
    const next = get().topZ + 1;
    set({ topZ: next });
    return next;
  };

  return {
    language: "EN",
    theme: "light",
    wallpaperId: DEFAULT_WALLPAPER_ID,
    isMobilePreviewForced: false,
    isScreensaverActive: false,
    isIntroductionOpen: true,
    introductionZIndex: INITIAL_TOP_Z,
    topZ: INITIAL_TOP_Z,
    activeMobileApp: null,
    activeMobileProjectId: null,
    windows: createInitialWindows(),
    projectWindows: {},

    toggleLanguage: () =>
      set((state) => ({
        language: state.language === "EN" ? "NL" : "EN",
      })),

    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === "light" ? "dark" : "light",
      })),

    setWallpaper: (id) => {
      const wallpaper = getWallpaperById(id);
      set({ wallpaperId: wallpaper.id });
    },

    toggleMobilePreview: () =>
      set((state) => ({
        isMobilePreviewForced: !state.isMobilePreviewForced,
      })),

    startScreensaver: () => set({ isScreensaverActive: true }),

    stopScreensaver: () => set({ isScreensaverActive: false }),

    closeIntroduction: () => set({ isIntroductionOpen: false }),

    focusIntroduction: () => {
      const { isIntroductionOpen, introductionZIndex, topZ } = get();
      if (!isIntroductionOpen) return;
      if (introductionZIndex === topZ) return;
      set({ introductionZIndex: claimTopZ() });
    },

    openMobileApp: (id) => {
      if (id === "toasters") return;
      set({ activeMobileApp: id, activeMobileProjectId: null });
    },

    closeMobileApp: () =>
      set({ activeMobileApp: null, activeMobileProjectId: null }),

    openMobileProject: (projectId) => {
      if (!getProjectById(projectId)) return;
      set({ activeMobileProjectId: projectId });
    },

    closeMobileProject: () => set({ activeMobileProjectId: null }),

    openWindow: (id) => {
      if (id === "toasters") {
        set({ isScreensaverActive: true });
        return;
      }
      const { windows } = get();
      const zIndex = claimTopZ();
      set({
        windows: {
          ...windows,
          [id]: {
            ...windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex,
          },
        },
      });
    },

    closeWindow: (id) => {
      const { windows } = get();
      const win = windows[id];
      const restored = win.restoreBounds;
      set({
        windows: {
          ...windows,
          [id]: {
            ...win,
            isOpen: false,
            isMaximized: false,
            position: restored?.position ?? win.position,
            size: restored?.size ?? win.size,
            restoreBounds: null,
          },
        },
      });
    },

    minimizeWindow: (id) => {
      const { windows } = get();
      set({
        windows: {
          ...windows,
          [id]: { ...windows[id], isMinimized: true },
        },
      });
    },

    toggleMaximizeWindow: (id) => {
      const { windows } = get();
      const win = windows[id];
      const zIndex = claimTopZ();

      if (win.isMaximized && win.restoreBounds) {
        set({
          windows: {
            ...windows,
            [id]: {
              ...win,
              isMaximized: false,
              isMinimized: false,
              position: win.restoreBounds.position,
              size: win.restoreBounds.size,
              restoreBounds: null,
              zIndex,
            },
          },
        });
        return;
      }

      set({
        windows: {
          ...windows,
          [id]: {
            ...win,
            isMaximized: true,
            isMinimized: false,
            restoreBounds: {
              position: { ...win.position },
              size: { ...win.size },
            },
            zIndex,
          },
        },
      });
    },

    focusWindow: (id) => {
      const { windows, topZ } = get();
      const current = windows[id];
      if (!current?.isOpen || current.isMinimized) return;
      if (current.zIndex === topZ) return;
      const zIndex = claimTopZ();
      set({
        windows: {
          ...get().windows,
          [id]: { ...get().windows[id], zIndex },
        },
      });
    },

    updateWindowPosition: (id, pos) => {
      const { windows } = get();
      const win = windows[id];
      if (win.isMaximized) return;
      set({
        windows: {
          ...windows,
          [id]: { ...win, position: pos },
        },
      });
    },

    openProjectWindow: (projectId) => {
      const project = getProjectById(projectId);
      if (!project) return;

      const { projectWindows } = get();
      const existing = projectWindows[projectId];
      const zIndex = claimTopZ();

      if (existing) {
        set({
          projectWindows: {
            ...projectWindows,
            [projectId]: {
              ...existing,
              isOpen: true,
              isMinimized: false,
              zIndex,
            },
          },
        });
        return;
      }

      const openCount = Object.values(projectWindows).filter(
        (w) => w.isOpen,
      ).length;

      set({
        projectWindows: {
          ...projectWindows,
          [projectId]: {
            projectId,
            title: project.name,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex,
            position: projectWindowOffset(openCount),
            size: { ...PROJECT_DETAIL_SIZE },
            restoreBounds: null,
          },
        },
      });
    },

    closeProjectWindow: (projectId) => {
      const { projectWindows } = get();
      const win = projectWindows[projectId];
      if (!win) return;
      const restored = win.restoreBounds;
      set({
        projectWindows: {
          ...projectWindows,
          [projectId]: {
            ...win,
            isOpen: false,
            isMaximized: false,
            position: restored?.position ?? win.position,
            size: restored?.size ?? win.size,
            restoreBounds: null,
          },
        },
      });
    },

    minimizeProjectWindow: (projectId) => {
      const { projectWindows } = get();
      const win = projectWindows[projectId];
      if (!win) return;
      set({
        projectWindows: {
          ...projectWindows,
          [projectId]: { ...win, isMinimized: true },
        },
      });
    },

    toggleMaximizeProjectWindow: (projectId) => {
      const { projectWindows } = get();
      const win = projectWindows[projectId];
      if (!win) return;
      const zIndex = claimTopZ();

      if (win.isMaximized && win.restoreBounds) {
        set({
          projectWindows: {
            ...projectWindows,
            [projectId]: {
              ...win,
              isMaximized: false,
              isMinimized: false,
              position: win.restoreBounds.position,
              size: win.restoreBounds.size,
              restoreBounds: null,
              zIndex,
            },
          },
        });
        return;
      }

      set({
        projectWindows: {
          ...projectWindows,
          [projectId]: {
            ...win,
            isMaximized: true,
            isMinimized: false,
            restoreBounds: {
              position: { ...win.position },
              size: { ...win.size },
            },
            zIndex,
          },
        },
      });
    },

    focusProjectWindow: (projectId) => {
      const { projectWindows, topZ } = get();
      const current = projectWindows[projectId];
      if (!current?.isOpen || current.isMinimized) return;
      if (current.zIndex === topZ) return;
      const zIndex = claimTopZ();
      set({
        projectWindows: {
          ...get().projectWindows,
          [projectId]: { ...get().projectWindows[projectId], zIndex },
        },
      });
    },

    updateProjectWindowPosition: (projectId, pos) => {
      const { projectWindows } = get();
      const win = projectWindows[projectId];
      if (!win || win.isMaximized) return;
      set({
        projectWindows: {
          ...projectWindows,
          [projectId]: { ...win, position: pos },
        },
      });
    },
  };
});
