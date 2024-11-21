import { ReactNode } from "react";

export interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export interface MainLayoutProps {
  children: ReactNode;
}

export interface SidebarContainerProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}