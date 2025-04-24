// Local Imports
import { MainPanel } from "app/layouts/MainLayout/Sidebar/MainPanel";
import { baseNavigation } from "app/navigation";
import { SidebarPanel } from "./SidebarPanel";

// ----------------------------------------------------------------------

export function Sidebar() {
  return (
    <>
      <MainPanel nav={baseNavigation} activeSegment="/settings" />
      <SidebarPanel />
    </>
  );
}
