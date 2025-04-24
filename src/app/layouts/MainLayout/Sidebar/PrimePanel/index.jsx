// Import Dependencies
import clsx from "clsx";
import PropTypes from "prop-types";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

// Local Imports
import { useThemeContext } from "app/contexts/theme/context";
import { Button } from "components/ui";
import { Menu } from "./Menu";

// ----------------------------------------------------------------------

export function PrimePanel({
  currentSegment,
  pathname,
  close,
}) {
  const { cardSkin } = useThemeContext();
  const { t } = useTranslation();

  const title = t(currentSegment?.transKey) || currentSegment?.title;

  return (
    <div
      className={clsx(
        "prime-panel flex h-full flex-col",
        cardSkin === "shadow-sm"
          ? "shadow-soft dark:shadow-dark-900/60"
          : "dark:border-dark-600/80 ltr:border-r rtl:border-l",
      )}
    >
      <div
        className={clsx(
          "flex h-full grow flex-col bg-white ltr:pl-(--main-panel-width) rtl:pr-(--main-panel-width)",
          cardSkin === "shadow-sm" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        <div className="relative flex h-16 w-full shrink-0 items-center justify-between pl-4 pr-1 rtl:pl-1 rtl:pr-4">
          <p className="truncate text-base tracking-wider text-gray-800 dark:text-dark-100">
            {title}
          </p>
          <Button
            onClick={close}
            isIcon
            variant="flat"
            className="size-7 rounded-full xl:hidden"
          >
            <ChevronLeftIcon className="size-6 rtl:rotate-180" />
          </Button>
        </div>
        {currentSegment?.childs && (
          <Menu
            nav={currentSegment?.childs}
            pathname={pathname}
          />
        )}
      </div>
    </div>
  );
}

PrimePanel.propTypes = {
  currentSegment: PropTypes.object,
  close: PropTypes.func,
};
