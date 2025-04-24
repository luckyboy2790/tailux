// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { useDataScrollOverflow, mergeRefs } from "hooks";

// ----------------------------------------------------------------------

const ScrollShadow = forwardRef((props, ref) => {
  const {
    component,
    children,
    className,
    size = 10,
    offset = 0,
    isEnabled = true,
    orientation = "vertical",
    style,
    ...rest
  } = props;

  const Component = component || "div";

  const { ref: domRef } = useDataScrollOverflow({
    offset,
    isEnabled,
    overflowCheck: orientation,
  });

  return (
    <Component
      {...{
        ref: mergeRefs(domRef, ref),
        "data-orientation": orientation,
        className: clsx(
          orientation === "vertical" && "overflow-y-auto",
          orientation === "horizontal" && "overflow-x-auto",
          orientation === "both" && "overflow-auto",
          className,
        ),
        style: {
          "--scroll-shadow-size": `${size / 4}rem`,
          ...style,
        },
        ...rest,
      }}
    >
      {children}
    </Component>
  );
});

ScrollShadow.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.number,
  offset: PropTypes.number,
  isEnabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["vertical", "horizontal", "both"]),
  style: PropTypes.object,
};

ScrollShadow.displayName = "ScrollShadow";

export { ScrollShadow };
