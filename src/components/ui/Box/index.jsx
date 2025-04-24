// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// ----------------------------------------------------------------------

const Box = forwardRef(({ component, className, ...rest }, ref) => {
  const Component = component || "div";

  return (
    <Component
      ref={ref}
      className={clsx("relative break-words print:border", className)}
      {...rest}
    />
  );
});

Box.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
};

Box.displayName = "Box";

export { Box };
