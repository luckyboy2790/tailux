// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------

function createSwapComponent({ currentVal }) {
  const Component = forwardRef((props, ref) => {
    const { children, className, component, ...rest } = props;
    const Component = component || "div";
    return (
      <Component
        {...{ [`data-swap-${currentVal}`]: true }}
        ref={ref}
        className={clsx(
          "z-10 col-start-1 row-start-1 fill-current transition-[transform,opacity] duration-300 ease-out",
          `swap-${currentVal}`,
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  });

  Component.displayName = "Swap" + currentVal;

  Component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
  };

  return Component;
}

export const SwapOn = createSwapComponent({ currentVal: "on" });
export const SwapOff = createSwapComponent({ currentVal: "off" });
