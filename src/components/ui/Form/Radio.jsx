// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { ApplyWrapper } from "components/shared/ApplyWrapper";
import { setThisClass } from "utils/setThisClass";

// ----------------------------------------------------------------------

const disabledClass =
  "before:[mask-image:var(--tw-thumb)] before:bg-gray-400 border-gray-150 bg-gray-150 pointer-events-none select-none opacity-70 dark:bg-dark-450 dark:border-dark-450 dark:before:bg-dark-800 dark:opacity-60";

const variants = {
  basic:
    "border-gray-400/70 bg-origin-border before:bg-center before:bg-no-repeat before:[background-size:100%_100%] before:[background-image:var(--tw-thumb)] checked:border-this checked:bg-this hover:border-this focus:border-this dark:border-dark-400 dark:checked:border-this-light dark:checked:bg-this-light dark:hover:border-this-light dark:focus:border-this-light",
  outlined:
    "border-gray-400/70 before:bg-this before:[mask-image:var(--tw-thumb)] checked:border-this hover:border-this focus:border-this dark:border-dark-400 dark:hover:border-this-light dark:focus:border-this-light dark:before:bg-this-light dark:checked:border-this-light",
};

const Radio = forwardRef((props, ref) => {
  const {
    variant = "basic",
    unstyled,
    color = "primary",
    className,
    classNames = {},
    type = "radio",
    label,
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
          <span className={clsx("label", classNames?.labelText)}>{label}</span>
        </label>
      )}
    >
      <input
        className={clsx(
          "form-radio",
          !unstyled && [
            setThisClass(color),
            disabled ? disabledClass : variants[variant],
          ],
          className,
          classNames?.input,
        )}
        disabled={disabled}
        data-disabled={disabled}
        type={type}
        ref={ref}
        {...rest}
      />
    </ApplyWrapper>
  );
});

Radio.displayName = "Radio";

Radio.propTypes = {
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
  type: PropTypes.string,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  labelProps: PropTypes.object,
};

export { Radio };
