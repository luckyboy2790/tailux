// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { ApplyWrapper } from "components/shared/ApplyWrapper";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const disabledClass =
  "before:bg-gray-400 bg-gray-150 border border-gray-200 pointer-events-none select-none opacity-70 dark:bg-dark-450 dark:border-dark-450 dark:before:bg-dark-800 dark:opacity-60";

const variants = {
  basic:
    "bg-gray-300 before:bg-gray-50 checked:bg-this checked:before:bg-white dark:bg-surface-1 dark:before:bg-dark-50 dark:checked:bg-this-light dark:checked:before:bg-white focus-visible:ring-3 focus-visible:ring-this/50 dark:focus-visible:ring-this-light/50",
  outlined:
    "is-outline border-gray-400/70 border before:bg-gray-300 checked:border-this checked:before:bg-this dark:border-dark-400 dark:before:bg-dark-300 dark:checked:border-this-light dark:checked:before:bg-this-light focus-visible:ring-3 focus-visible:ring-this/50 dark:focus-visible:ring-this-light/50",
};

const Switch = forwardRef((props, ref) => {
  const {
    variant = "basic",
    unstyled,
    color = "primary",
    className,
    classNames = {},
    label,
    role = "switch",
    disabled,
    labelProps,
    ...rest
  } = props;

  return (
    <ApplyWrapper
      when={!!label}
      wrapper={(children) => (
        <label
          className={clsx(
            "input-label inline-flex items-center gap-2",
            classNames?.label,
          )}
          {...labelProps}
        >
          {children}
          <span className={clsx("label", classNames.labelText)}>{label}</span>
        </label>
      )}
    >
      <input
        className={clsx(
          "form-switch",
          !unstyled && [
            setThisClass(color),
            disabled ? disabledClass : variants[variant],
          ],
          className,
          classNames?.input,
        )}
        disabled={disabled}
        type="checkbox"
        role={role}
        ref={ref}
        {...rest}
      />
    </ApplyWrapper>
  );
});

Switch.displayName = "Switch";

Switch.propTypes = {
  variant: PropTypes.oneOf(["outlined", "basic"]),
  unstyled: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  className: PropTypes.string,
  classNames: PropTypes.object,
  role: PropTypes.string,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  labelProps: PropTypes.object,
};

export { Switch };
