// Import Dependencies
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

// Local Imports
import { Collapse } from "components/ui";
import { NAV_TYPE_COLLAPSE, NAV_TYPE_ITEM } from "constants/app.constant";
import { useDisclosure } from "hooks";
import { CollapsibleItem } from "./CollapsibleItem";
import { MenuItem } from "./MenuItem";
import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

export function Group({ data }) {
  const [isOpened, { toggle }] = useDisclosure(true);
  const { t } = useTranslation();
  const { cardSkin } = useThemeContext();

  return (
    <div className="pt-3">
      <div
        className={clsx(
          "sticky top-0 z-10 bg-white px-6",
          cardSkin === "bordered" ? "dark:bg-dark-900" : "dark:bg-dark-750",
        )}
      >
        <button
          onClick={toggle}
          className="flex cursor-pointer items-center gap-3 pt-2 mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 outline-hidden hover:text-gray-900 focus:text-gray-900 dark:text-dark-300 dark:hover:text-dark-50 dark:focus:text-dark-50"
        >
          <span>{t(data.transKey)}</span>
        </button>
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-0 -bottom-3 h-3 bg-linear-to-b from-white to-transparent",
            cardSkin === "bordered"
              ? "dark:from-dark-900"
              : "dark:from-dark-750",
          )}
        ></div>
      </div>
      <Collapse in={isOpened}>
        <div className="flex flex-col space-y-1.5">
          {data.childs.map((item) => {
            switch (item.type) {
              case NAV_TYPE_COLLAPSE:
                return <CollapsibleItem key={item.path} data={item} />;
              case NAV_TYPE_ITEM:
                return <MenuItem key={item.path} data={item} />;
              default:
                return null;
            }
          })}
        </div>
      </Collapse>
    </div>
  );
}

Group.propTypes = {
  data: PropTypes.object,
};
