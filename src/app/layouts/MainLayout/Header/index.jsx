// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import SearchIcon from "assets/dualicons/search.svg?react";
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { Button } from "components/ui";
import { Notifications } from "components/template/Notifications";
// import { RightSidebar } from "components/template/RightSidebar";
import { LanguageSelector } from "components/template/LaguageSelector";
import { Search } from "components/template/Search";
import { useThemeContext } from "app/contexts/theme/context";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

function SlashIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"
        opacity="0.4"
      />
      <path fill="currentColor" d="M11.8 6L8 15.1h-.9L10.8 6h1z" />
    </svg>
  );
}

export function Header() {
  const { cardSkin } = useThemeContext();

  const { t } = useTranslation();

  return (
    <header
      className={clsx(
        "app-header transition-content dark:border-dark-600 sticky top-0 z-20 flex h-[65px] shrink-0 items-center justify-between border-b border-gray-200 bg-white/80 px-(--margin-x) backdrop-blur-sm backdrop-saturate-150",
        cardSkin === "shadow-sm"
          ? "dark:bg-dark-750/80"
          : "dark:bg-dark-900/80",
      )}
    >
      <SidebarToggleBtn />

      <div className="flex items-center gap-2 ltr:-mr-1.5 rtl:-ml-1.5">
        <Search
          renderButton={(open) => (
            <>
              <Button
                onClick={open}
                unstyled
                className="text-xs-plus dark:border-dark-500 dark:hover:border-dark-400 h-8 w-64 justify-between gap-2 rounded-full border border-gray-200 px-3 hover:border-gray-400 max-sm:hidden"
              >
                <div className="flex items-center gap-2">
                  <MagnifyingGlassIcon className="size-4" />
                  <span className="dark:text-dark-300 text-gray-400">
                    {t("nav.search_here_placeholder")}
                  </span>
                </div>
                <SlashIcon />
              </Button>

              <Button
                onClick={open}
                variant="flat"
                isIcon
                className="relative size-9 rounded-full sm:hidden"
              >
                <SearchIcon className="dark:text-dark-100 size-6 text-gray-900" />
              </Button>
            </>
          )}
        />
        <Notifications />
        {/* <RightSidebar /> */}
        <LanguageSelector />
      </div>
    </header>
  );
}
