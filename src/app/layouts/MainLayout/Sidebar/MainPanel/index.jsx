// Import Dependencies
import PropTypes from "prop-types";
import { Link } from "react-router";
import clsx from "clsx";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import { Menu } from "./Menu";
import { Item } from "./Menu/Item";
import { Profile } from "../../Profile";
import { useThemeContext } from "app/contexts/theme/context";
import { settings } from "app/navigation/settings";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export function MainPanel({ nav, setActiveSegment, activeSegment }) {
  const { cardSkin } = useThemeContext();

  const { t } = useTranslation();

  return (
    <div className="main-panel">
      <div
        className={clsx(
          "border-gray-150 dark:border-dark-600/80 flex h-full w-full flex-col items-center bg-white ltr:border-r rtl:border-l",
          cardSkin === "shadow-sm" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        {/* Application Logo */}
        <div className="flex pt-3.5">
          <Link to="/">
            <Logo className="text-primary-600 dark:text-primary-400 size-10" />
          </Link>
        </div>

        <Menu
          nav={nav}
          activeSegment={activeSegment}
          setActiveSegment={setActiveSegment}
        />

        {/* Bottom Links */}
        <div className="flex flex-col items-center space-y-3 py-2.5">
          <Item
            id={settings.id}
            component={Link}
            to="/settings/appearance"
            title={t("nav.settings.setting_system")}
            isActive={activeSegment === settings.path}
            Icon={settings.Icon}
          />
          <Profile />
        </div>
      </div>
    </div>
  );
}

MainPanel.propTypes = {
  nav: PropTypes.array,
  setActiveSegment: PropTypes.func,
  activeSegment: PropTypes.string,
};
