// Local Imports
import { MainPanel } from "app/layouts/MainLayout/Sidebar/MainPanel";
import { getBaseNavigation } from "app/navigation";
import { SidebarPanel } from "./SidebarPanel";
import { useAuthContext } from "app/contexts/auth/context";

// ----------------------------------------------------------------------

export function Sidebar() {
  const { user } = useAuthContext();
  const role = user?.role;

  const baseNavigation = getBaseNavigation(role);
  return (
    <>
      <MainPanel nav={baseNavigation} activeSegment="/settings" />
      <SidebarPanel />
    </>
  );
}
