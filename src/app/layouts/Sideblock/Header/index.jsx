// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import SearchIcon from "assets/dualicons/search.svg?react";
import { RightSidebar } from "components/template/RightSidebar";
import { LanguageSelector } from "components/template/LaguageSelector";
import { Notifications } from "components/template/Notifications";
import { Button } from "components/ui";
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { Profile } from "../Profile";
import { Search } from "components/template/Search";
import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

export function Header() {
  const { smAndUp } = useBreakpointsContext();
  const { cardSkin } = useThemeContext();

  return (
    <header
      className={clsx(
        "app-header transition-content sticky top-0 z-20 flex h-[65px] items-center gap-1 border-b border-gray-200 bg-white/80 px-(--margin-x) backdrop-blur-sm backdrop-saturate-150 dark:border-dark-600 max-sm:justify-between",
        cardSkin === "bordered" ? "dark:bg-dark-900/80" : "dark:bg-dark-700/80",
      )}
    >
      <div className="contents xl:hidden">
        <SidebarToggleBtn />
      </div>

      <div className="flex items-center gap-2 sm:flex-1">
        <div className="flex-1">
          <Search
            renderButton={(open) => (
              <>
                {smAndUp && (
                  <button
                    onClick={open}
                    className="flex cursor-pointer items-center gap-4 outline-hidden max-sm:hidden"
                  >
                    <div className="flex items-center gap-2">
                      <MagnifyingGlassIcon className="size-5" />
                      <span>Search here...</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="20"
                      aria-hidden="true"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"
                        opacity="0.4"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M11.8 6L8 15.1h-.9L10.8 6h1z"
                      ></path>
                    </svg>
                  </button>
                )}
                <Button
                  onClick={open}
                  variant="flat"
                  isIcon
                  className="relative size-9 rounded-full sm:hidden"
                >
                  <SearchIcon className="size-6 text-gray-900 dark:text-dark-100" />
                </Button>
              </>
            )}
          />
        </div>
        <Notifications />
        <RightSidebar />
        <LanguageSelector />
        <Profile />
      </div>
    </header>
  );
}
