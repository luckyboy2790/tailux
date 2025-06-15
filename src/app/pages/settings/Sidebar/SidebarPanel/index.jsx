// Import Dependencies
import clsx from "clsx";
import PropTypes from "prop-types";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

// Local Imports
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button, ScrollShadow } from "components/ui";
import { createScopedKeydownHandler } from "utils/dom/createScopedKeydownHandler";
import { useThemeContext } from "app/contexts/theme/context";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { settings } from "app/navigation/settings";

// ----------------------------------------------------------------------

export function SidebarPanel() {
  const { cardSkin } = useThemeContext();

  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "prime-panel flex flex-col",
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
        <Header />
        <ScrollShadow className="grow">
          <ul className="space-y-1.5 px-2 font-medium" data-menu-list>
            {settings.childs.map((item) => (
              <li key={item.path}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>

          <div className="dark:bg-dark-500 mx-4 my-4 h-px bg-gray-200"></div>

          <ul className="space-y-1.5 px-2 font-medium">
            <li>
              <Button
                component="a"
                href="mailto:jairo.visionam@gmail.com"
                variant="flat"
                className="group text-xs-plus w-full justify-start gap-2 p-2"
              >
                <ChatBubbleBottomCenterIcon className="dark:text-dark-300 dark:group-hover:text-dark-200 dark:group-focus:text-dark-200 size-4.5 text-gray-400 transition-colors group-hover:text-gray-500 group-focus:text-gray-500" />
                <span>{t("nav.settings.ask_question")}</span>
              </Button>
            </li>
          </ul>
        </ScrollShadow>
        <Footer />
      </div>
    </div>
  );
}

function MenuItem({ title, Icon, path, transKey, ...rest }) {
  const { lgAndDown } = useBreakpointsContext();
  const { close } = useSidebarContext();
  const { t } = useTranslation();

  return (
    <NavLink to={path} {...rest}>
      {({ isActive, isPending }) => (
        <Button
          variant="flat"
          color={isActive ? "primary" : "neutral"}
          className={clsx(
            "group text-xs-plus w-full justify-start gap-2 p-2",
            isPending && "opacity-80",
          )}
          onKeyDown={createScopedKeydownHandler({
            siblingSelector: "[data-menu-list-item]",
            parentSelector: "[data-menu-list]",
            activateOnFocus: true,
            loop: true,
            orientation: "vertical",
          })}
          data-menu-list-item
          onClick={() => lgAndDown && close()}
        >
          {Icon && (
            <Icon
              className={clsx(
                isActive
                  ? "text-this dark:text-this-light"
                  : "dark:text-dark-300 dark:group-hover:text-dark-200 dark:group-focus:text-dark-200 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500",
                "size-4.5 transition-colors",
              )}
            />
          )}
          <span>{t(transKey) || title}</span>
        </Button>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  path: PropTypes.string,
};
