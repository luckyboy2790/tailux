// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// Local Imports
import { useId } from "hooks";
import { InputErrorMsg } from "./InputErrorMsg";

// ----------------------------------------------------------------------

const Textarea = forwardRef(
  (
    {
      component,
      label,
      description,
      className,
      classNames,
      error,
      unstyled,
      disabled,
      rootProps,
      labelProps,
      id,
      ...rest
    },
    ref,
  ) => {
    const Component = component || "textarea";
    const inputId = useId(id, "textarea");

    return (
      <div className={`input-root ${classNames?.root}`} {...rootProps}>
        {label && (
          <label
            htmlFor={inputId}
            className={`input-label ${classNames?.label}`}
            {...labelProps}
          >
            <span className={`input-label ${classNames?.labelText}`}>
              {label}
            </span>
          </label>
        )}

        <div
          className={clsx(
            "input-wrapper relative",
            label && "mt-1.5",
            classNames?.wrapper,
          )}
        >
          <Component
            className={clsx(
              "form-textarea-base",
              !unstyled && [
                "form-textarea",
                error
                  ? "border-error dark:border-error-lighter"
                  : [
                      disabled
                        ? "cursor-not-allowed border-gray-300 bg-gray-150 opacity-60 dark:border-dark-500 dark:bg-dark-600"
                        : "peer border-gray-300 hover:border-gray-400 focus:border-primary-600 dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500",
                    ],
              ],
              className,
              classNames?.input,
            )}
            id={inputId}
            ref={ref}
            disabled={disabled}
            {...rest}
          />
        </div>
        <InputErrorMsg
          when={error && typeof error !== "boolean"}
          className={classNames?.error}
        >
          {error}
        </InputErrorMsg>
        {description && (
          <span
            className={clsx(
              "input-description mt-1 text-xs text-gray-400 dark:text-dark-300",
              classNames?.description,
            )}
          >
            {description}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  component: PropTypes.elementType,
  label: PropTypes.node,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  classNames: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  unstyled: PropTypes.bool,
  disabled: PropTypes.bool,
  rootProps: PropTypes.object,
  labelProps: PropTypes.object,
  id: PropTypes.string,
};

export { Textarea };
