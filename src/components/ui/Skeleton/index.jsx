// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------

const Skeleton = forwardRef((props, ref) => {
  const { animate = true, className, ...rest } = props;
  return (
    <div
      className={clsx(
        "skeleton relative overflow-hidden",
        animate && "animate-wave before:absolute before:inset-0",
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

Skeleton.propTypes = {
  animate: PropTypes.bool,
  className: PropTypes.string,
};

Skeleton.displayName = "Skeleton";

export { Skeleton };
