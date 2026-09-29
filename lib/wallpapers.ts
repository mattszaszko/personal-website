export type WallpaperTone = "bright" | "dark";

export interface Wallpaper {
  id: string;
  name: string;
  /** Public URL under /wallpapers */
  src: string;
  /** Bright wallpapers get a dark overlay in dark mode */
  tone: WallpaperTone;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "cat-coffee",
    name: "Cat Coffee",
    src: "/wallpapers/cat-coffee.jpg",
    tone: "bright",
  },
  {
    id: "akira",
    name: "Akira",
    src: "/wallpapers/akira.jpg",
    tone: "bright",
  },
  {
    id: "minimal1",
    name: "Minimal 1",
    src: "/wallpapers/minimal1.png",
    tone: "bright",
  },
  {
    id: "mountains",
    name: "Mountains",
    src: "/wallpapers/mountains.png",
    tone: "bright",
  },
];

export const DEFAULT_WALLPAPER_ID = WALLPAPERS[0].id;

export function getWallpaperById(id: string): Wallpaper {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
}

export function getRandomWallpaperId(): string {
  const index = Math.floor(Math.random() * WALLPAPERS.length);
  return WALLPAPERS[index].id;
}
