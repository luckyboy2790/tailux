// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { COLORS } from "constants/app.constant";

// ----------------------------------------------------------------------

const variants = {
  filled:
    "bg-this text-white hover:bg-this-darker focus:bg-this-darker active:bg-this-darker/90 disabled:bg-this-light dark:disabled:bg-this-darker",
  outlined:
    "border border-gray-300 dark:border-dark-450 text-this hover:border-this focus:border-this dark:border-this-lighter/30 dark:text-this-lighter dark:hover:border-this-lighter dark:focus:border-this-lighter",
  soft: "text-this-darker bg-this-darker/[0.07] hover:text-white hover:bg-this-darker focus:text-white focus:bg-this-darker dark:text-this-lighter dark:bg-this-lighter/[.13] dark:hover:bg-this dark:hover:text-white dark:focus:bg-this dark:focus:text-white",
};

const neutralVariants = {
  filled:
    "bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-100 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
  outlined:
    "border border-gray-300 text-gray-800 hover:border-gray-800 focus:border-gray-800 dark:border-surface-2 dark:text-dark-100 dark:hover:border-dark-100 dark:focus:border-dark-100",
  soft: "text-this-darker bg-gray-150/10 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-150 focus:bg-gray-150 active:bg-gray-150/80 dark:text-dark-100 dark:bg-dark-500/10 dark:hover:bg-dark-500 dark:focus:bg-dark-500 dark:active:bg-dark-500/80",
};

const Tag = forwardRef((props, ref) => {
  const {
    component,
    className,
    unstyled,
    variant = "filled",
    color,
    isGlow,
    children,
    ...rest
  } = props;

  const Element = component || "a";
  const resolvedColor = color || "neutral";

  return (
    <Element
      className={clsx(
        "tag-base",
        !unstyled
          ? [
              "tag",
              resolvedColor === "neutral"
                ? [
                    neutralVariants[variant],
                    isGlow &&
                      "shadow-lg shadow-gray-200/50 dark:shadow-dark-450/50",
                  ]
                : [
                    setThisClass(resolvedColor),
                    variants[variant],
                    isGlow &&
                      "shadow-soft shadow-this/50 dark:shadow-this-light/50",
                  ],
            ]
          : color && color !== "neutral" && setThisClass(color),
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
});

Tag.displayName = "Tag";

Tag.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["filled", "outlined", "soft"]),
  color: PropTypes.oneOf(COLORS),
  unstyled: PropTypes.bool,
  isGlow: PropTypes.bool,
};

export { Tag };
