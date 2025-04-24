// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from 'clsx'

// Local Imports
import { COLORS } from "constants/app.constant";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const variants = {
  filled:
    "bg-this text-white hover:bg-this-darker focus:bg-this-darker active:bg-this-darker/90 disabled:bg-this-light dark:disabled:bg-this-darker",
  soft: "text-this-darker bg-this-darker/[.08] hover:bg-this-darker/[.15] focus:bg-this-darker/[.15] active:focus:bg-this-darker/20 dark:bg-this-lighter/10 dark:text-this-lighter dark:hover:bg-this-lighter/20 dark:focus:bg-this-lighter/20 dark:active:bg-this-lighter/25",
  outlined:
    "text-this-darker border border-this-darker hover:bg-this-darker/[.05] focus:bg-this-darker/[.05] active:bg-this-darker/10 dark:border-this-lighter dark:text-this-lighter dark:hover:bg-this-lighter/[.05] dark:focus:bg-this-lighter/[.05] dark:active:bg-this-lighter/10",
  flat: "text-this-darker hover:bg-this-darker/[.08] focus:bg-this-darker/[.08] active:bg-this-darker/[.15] dark:text-this-lighter dark:hover:bg-this-lighter/10 dark:focus:bg-this-lighter/10 dark:active:bg-this-lighter/[.15]",
};

const neutralVariants = {
  filled:
    "bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
  soft: "bg-gray-150/30 text-gray-900 hover:bg-gray-200/[.15] focus:bg-gray-200/[.15] active:bg-gray-200/20 dark:bg-dark-500/30 dark:text-dark-50 dark:hover:bg-dark-450/[.15] dark:focus:bg-dark-450/[.15] dark:active:bg-dark-450/20",
  outlined:
    "border border-gray-300 hover:bg-gray-300/20 focus:bg-gray-300/20 text-gray-900 active:bg-gray-300/25 dark:text-dark-50 dark:hover:bg-dark-300/20 dark:focus:bg-dark-300/20 dark:active:bg-dark-300/25 dark:border-dark-450",
  flat: "hover:bg-gray-300/20 focus:bg-gray-300/20 text-gray-700 active:bg-gray-300/25 dark:text-dark-200 dark:hover:bg-dark-300/10 dark:focus:bg-dark-300/10 dark:active:bg-dark-300/20",
};

const Button = forwardRef((props, ref) => {
  const {
    component,
    className,
    children,
    color,
    isIcon,
    variant = "filled",
    unstyled,
    type = "button",
    isGlow,
    disabled,
    onClick,
    ...rest
  } = props;

  const Component = component || "button";
  const mergedColor = color || "neutral";

  return (
    <Component
      className={clsx(
        "btn-base",
        !unstyled
          ? [
              "btn",
              isIcon && "shrink-0 p-0",
              mergedColor === "neutral"
                ? [
                    neutralVariants[variant],
                    isGlow &&
                      "shadow-lg shadow-gray-200/50 dark:shadow-dark-450/5",
                  ]
                : [
                    setThisClass(mergedColor),
                    variants[variant],
                    isGlow &&
                      "shadow-soft shadow-this/50 dark:shadow-lg dark:shadow-this/50",
                  ],
            ]
          : color && color !== "neutral" && setThisClass(color),
        className,
      )}
      type={type}
      ref={ref}
      disabled={disabled}
      data-disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.string,
  isIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(COLORS),
  variant: PropTypes.oneOf(["filled", "outlined", "soft", "flat"]),
  unstyled: PropTypes.bool,
  isGlow: PropTypes.bool,
};

export { Button };
