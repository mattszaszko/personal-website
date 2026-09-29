import type { ComponentType } from "react";
import type { AppId } from "@/types/os";
import ContactApp from "./ContactApp";
import ProjectsApp from "./ProjectsApp";
import ServicesApp from "./ServicesApp";
import TerminalApp from "./TerminalApp";
import WallpapersApp from "./WallpapersApp";
import WhoAmIApp from "./WhoAmIApp";

export type WindowAppId = Exclude<AppId, "toasters">;

export function isWindowAppId(id: AppId): id is WindowAppId {
  return id !== "toasters";
}

export const APP_COMPONENTS: Record<WindowAppId, ComponentType> = {
  projects: ProjectsApp,
  services: ServicesApp,
  whoami: WhoAmIApp,
  contact: ContactApp,
  wallpapers: WallpapersApp,
  terminal: TerminalApp,
};
