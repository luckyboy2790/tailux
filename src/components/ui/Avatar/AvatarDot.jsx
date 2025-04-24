// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "utils/setThisClass";
import { COLORS } from "constants/app.constant";

// ----------------------------------------------------------------------

const AvatarDot = forwardRef((props, ref) => {
  const { color = "neutral", isPing, className, children, ...rest } = props;

  return (
    <div
      className={clsx(
        "avatar-dot absolute rounded-full",
        color === "neutral"
          ? "bg-gray-300 dark:bg-dark-200"
          : [setThisClass(color), "bg-this dark:bg-this-light"],
        className,
      )}
      {...rest}
      ref={ref}
    >
      {isPing && (
        <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-inherit opacity-80" />
      )}
      {children}
    </div>
  );
});

AvatarDot.displayName = "AvatarDot";

AvatarDot.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  isPing: PropTypes.bool,
  children: PropTypes.node,
};

export { AvatarDot };
