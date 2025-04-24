// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { COLORS } from "constants/app.constant";

// ----------------------------------------------------------------------

const Range = forwardRef((props, ref) => {
  const {
    className,
    color = "neutral",
    thumbSize,
    trackSize,
    style,
    ...rest
  } = props;

  return (
    <input
      type="range"
      className={clsx(
        "form-range",
        color === "neutral"
          ? "text-gray-500 dark:text-dark-300"
          : [setThisClass(color), "text-this dark:text-this-light"],
        className,
      )}
      ref={ref}
      style={{
        "--thumb-size": thumbSize,
        "--track-h:": trackSize,
        ...style,
      }}
      {...rest}
    />
  );
});

Range.displayName = "Range";

Range.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  thumbSize: PropTypes.string,
  trackSize: PropTypes.string,
  style: PropTypes.object,
};

export { Range };
