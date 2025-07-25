// Import Dependencies
import { Portal } from "@headlessui/react";
import { clsx } from "clsx";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useThemeContext } from "app/contexts/theme/context";
import { useDidUpdate } from "hooks";
import { Header } from "./Header";
import { Menu } from "./Menu";

// ----------------------------------------------------------------------

export function Sidebar() {
  const { name, lgAndDown } = useBreakpointsContext();
  const { isExpanded: isSidebarExpanded, close: closeSidebar } =
    useSidebarContext();

  const { cardSkin } = useThemeContext();

  useDidUpdate(() => {
    isSidebarExpanded && closeSidebar();
  }, [name]);

  return (
    <div className={clsx("sidebar-panel", "dark")}>
      <div
        className={clsx(
          "flex h-full grow flex-col",
          cardSkin === "shadow-sm" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        <Header />
        <Menu />
      </div>

      {lgAndDown && isSidebarExpanded && (
        <Portal>
          <div
            onClick={closeSidebar}
            className="fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
          />
        </Portal>
      )}
    </div>
  );
}
