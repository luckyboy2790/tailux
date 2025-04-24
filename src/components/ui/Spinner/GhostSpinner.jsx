// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { Spinner } from "..";

// ----------------------------------------------------------------------

const GhostSpinner = forwardRef((props, ref) => {
  const { variant = "default", className, ...rest } = props;
  return (
    <Spinner
      unstyled
      className={clsx(
        "ghost-spinner",
        {
          "border-white border-r-transparent": variant === "default",
          "border-white/30 border-r-white": variant === "soft",
          "text-white": variant === "innerDot",
        },
        className,
      )}
      variant={variant}
      {...rest}
      ref={ref}
    />
  );
});

GhostSpinner.displayName = "GhostSpinner";

GhostSpinner.propTypes = {
  animate: PropTypes.bool,
  isElastic: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "soft", "innerDot"]),
};

export { GhostSpinner };
