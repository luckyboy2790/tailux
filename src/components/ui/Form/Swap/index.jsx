// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { useUncontrolled } from "hooks";

// ----------------------------------------------------------------------

const Swap = forwardRef((props, ref) => {
  const {
    children,
    component,
    effect = "fade",
    value,
    className,
    defaultValue,
    onChange,
    disabled,
    onClick,
    ...rest
  } = props;

  const Component = component || "div";

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "on",
    onChange,
  });

  return (
    <Component
      data-swap-value={_value}
      ref={ref}
      disabled={disabled}
      data-disabled
      data-swap-effect={effect}
      className={clsx(
        "swap relative inline-grid select-none place-content-center",
        effect === "flip" && "swap-flip",
        effect === "rotate" && "swap-rotate",
        _value === "on"
          ? "swap-active **:data-swap-on:z-11"
          : "**:data-swap-off:z-11",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
      onClick={(e) => {
        !disabled && handleChange(_value === "on" ? "off" : "on");
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Swap.displayName = "Swap";

Swap.propTypes = {
  value: PropTypes.oneOf(["on", "off"]),
  defaultValue: PropTypes.oneOf(["on", "off"]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  effect: PropTypes.oneOf(["fade", "flip", "rotate"]),
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  component: PropTypes.elementType,
};

export { SwapOff, SwapOn } from "./createSwapComponent";
export { Swap };
