// Import Dependencies
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

// Local Imports
import { NAV_TYPE_ITEM } from "constants/app.constant";
import { ScrollShadow } from "components/ui";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { Item } from "./Item";

// ----------------------------------------------------------------------

export function Menu({ nav, setActiveSegment, activeSegment }) {
  const { t } = useTranslation();
  const { isExpanded, open } = useSidebarContext();

  const handleSegmentSelect = (path) => {
    setActiveSegment(path);
    if (!isExpanded) {
      open();
    }
  };

  const getProps = ({ path, type, title, transKey, linkProps }) => {
    const isLink = type === NAV_TYPE_ITEM;

    return {
      component: isLink ? Link : "button",
      ...(isLink && { to: path, ...linkProps }),
      onClick: !isLink ? () => handleSegmentSelect(path) : null,
      isActive: path === activeSegment,
      title: t(transKey) || title,
      path,
    };
  };

  return (
    <ScrollShadow
      data-root-menu
      className="hide-scrollbar flex w-full grow flex-col items-center space-y-4 overflow-y-auto pt-5 lg:space-y-3 xl:pt-5 2xl:space-y-4"
    >
      {nav.map(({ id, Icon, path, type, title, transKey, linkProps }) => {
        return (
          <Item
            key={path}
            {...getProps({ path, type, title, transKey, linkProps })}
            id={id}
            Icon={Icon}
          />
        );
      })}
    </ScrollShadow>
  );
}

Menu.propTypes = {
  nav: PropTypes.array,
  activeSegment: PropTypes.string,
  setActiveSegment: PropTypes.func,
};
