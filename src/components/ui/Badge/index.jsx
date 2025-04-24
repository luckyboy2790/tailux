// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { COLORS } from "constants/app.constant";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const variants = {
  filled: "text-white bg-this",
  outlined:
    "border border-this/30 text-this dark:border-this-lighter/30 dark:text-this-lighter",
  soft: "text-this-darker bg-this-darker/[0.07] dark:text-this-lighter dark:bg-this-lighter/10",
};

const neutralVariants = {
  filled: "bg-gray-200 text-gray-900 dark:bg-surface-2 dark:text-dark-50",
  outlined:
    "border border-gray-300 text-gray-900 dark:border-surface-1 dark:text-dark-50",
  soft: "bg-gray-200/30 text-gray-900 dark:bg-dark-500/30 dark:text-dark-50",
};

const Badge = forwardRef((props, ref) => {
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

  const Component = component || "div";
  const mergedColor = color || "neutral";

  return (
    <Component
      className={clsx(
        "badge-base",
        !unstyled
          ? [
              "badge",
              mergedColor === "neutral"
                ? [
                    neutralVariants[variant],
                    isGlow &&
                      "shadow-lg shadow-gray-200/50 dark:shadow-dark-450/50",
                  ]
                : [
                    setThisClass(mergedColor),
                    variants[variant],
                    isGlow &&
                      "shadow-lg shadow-this/50 dark:shadow-this-light/50",
                  ],
            ]
          : color && color !== "neutral" && setThisClass(color),
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  );
});

Badge.displayName = "Badge";

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  variant: PropTypes.oneOf(["filled", "outlined", "soft"]),
  color: PropTypes.oneOf(COLORS),
  unstyled: PropTypes.bool,
  isGlow: PropTypes.bool,
};

export { Badge };
