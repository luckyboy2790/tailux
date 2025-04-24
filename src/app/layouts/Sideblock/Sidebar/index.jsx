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
  const { cardSkin } = useThemeContext();
  const { name, lgAndDown } = useBreakpointsContext();

  const { isExpanded: isSidebarExpanded, close: closeSidebar } =
    useSidebarContext();

  useDidUpdate(() => {
    isSidebarExpanded && closeSidebar();
  }, [name]);

  return (
    <div
      className={clsx(
        "sidebar-panel",
        cardSkin === "shadow-sm"
          ? "shadow-soft dark:shadow-dark-900/60"
          : "dark:border-dark-600/80 ltr:border-r rtl:border-l border-gray-200",
      )}
    >
      <div
        className={clsx(
          "flex h-full grow flex-col bg-white",
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
