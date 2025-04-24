// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { COLORS } from "constants/app.constant";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const Progress = forwardRef((props, ref) => {
  const {
    children,
    value = 0,
    showRail = true,
    isActive = false,
    isIndeterminate = false,
    unstyled = false,
    color = "neutral",
    variant = "default",
    className,
    classNames,
    animationDuration,
    style = {},
    rootProps = {},
    ...rest
  } = props;

  return (
    <div
      {...rootProps}
      className={clsx(
        "progress-rail",
        showRail &&
          !unstyled && [
            color === "neutral" || variant !== "soft"
              ? "bg-gray-150 dark:bg-dark-500"
              : [setThisClass(color), "bg-this/[.15] dark:bg-this-light/25"],
          ],
        className,
        classNames?.root,
      )}
    >
      <div
        {...rest}
        ref={ref}
        className={clsx(
          "progress relative rounded-full transition-[width] ease-out",
          !unstyled && [
            color === "neutral"
              ? "bg-gray-500 dark:bg-dark-400"
              : [setThisClass(color), "bg-this dark:bg-this-light"],
          ],
          isActive && "is-active",
          isIndeterminate
            ? "is-indeterminate"
            : "flex items-center justify-end leading-none",
          classNames?.bar,
        )}
        style={{
          width: isIndeterminate ? "100%" : `${value}%`,
          animationDuration,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
});

Progress.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  showRail: PropTypes.bool,
  isActive: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  unstyled: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  variant: PropTypes.oneOf(["default", "soft"]),
  className: PropTypes.string,
  classNames: PropTypes.object,
  animationDuration: PropTypes.string,
  style: PropTypes.object,
  rootStyle: PropTypes.object,
  rootProps: PropTypes.object,
};

Progress.displayName = "Progress";

export { Progress };
