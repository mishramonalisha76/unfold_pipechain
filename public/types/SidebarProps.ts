import Application from "./Application";

export default interface SidebarProps {
  onApplicationClick: (application: Application) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
  }