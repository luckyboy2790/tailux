// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import invariant from "tiny-invariant";

// Local Imports
import { mergeRefs, useId } from "hooks";
import { InputErrorMsg } from "./InputErrorMsg";
import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

/**
 * Finds the nearest parent element with a non-transparent background color.
 *
 * @param {HTMLElement} element - The starting element to check.
 * @returns {string|null} - The background color of the nearest parent or `null` if none is found.
 */
function findNearestBackgroundColor(element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError("The input must be an HTMLElement.");
  }

  let current = element.parentElement;

  while (current && current !== document.documentElement) {
    const bgColor = window.getComputedStyle(current).backgroundColor;

    // Check if background color is not transparent or unset
    if (
      bgColor &&
      bgColor !== "rgba(0, 0, 0, 0)" &&
      bgColor !== "transparent"
    ) {
      return bgColor;
    }

    current = current.parentElement; // Move to the parent
  }

  return null; // No parent with a background color found
}

const Select = forwardRef((props, ref) => {
  const {
    label,
    prefix,
    suffix = <ChevronDownIcon className="w-2/3" />,
    description,
    classNames,
    className,
    error,
    multiple,
    unstyled,
    disabled,
    rootProps,
    labelProps,
    id,
    data = [],
    children,
    ...rest
  } = props;
  const inputId = useId(id, "select");
  const selectRef = useRef(null);

  const theme = useThemeContext();

  const options = useMemo(
    () =>
      data.map((item) => {
        const formatted =
          typeof item !== "object" ? { label: item, value: item } : item;
        return (
          <option
            key={formatted.value}
            value={formatted.value}
            disabled={formatted.disabled}
          >
            {formatted.label}
          </option>
        );
      }),
    [data],
  );

  const affixClass = clsx(
    "pointer-events-none absolute top-0 flex h-full w-9 items-center justify-center transition-colors",
    error
      ? "text-error dark:text-error-light"
      : "text-gray-400 peer-focus:text-primary-600 dark:text-dark-300 dark:peer-focus:text-primary-500",
  );

  useEffect(() => {
    const el = selectRef.current;
    invariant(el);
    const color = findNearestBackgroundColor(el);
    el.style.setProperty("--bg-color", color);
  }, [theme]);

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
        <select
          className={clsx(
            multiple ? "form-multiselect" : "form-select-base",
            !unstyled && [
              !multiple && "form-select",
              suffix && "ltr:pr-9 rtl:pl-9",
              prefix && "ltr:pl-9 rtl:pr-9",
              error
                ? "border-error dark:border-error-lighter"
                : [
                    disabled
                      ? "cursor-not-allowed border-gray-300 bg-gray-150 opacity-60 dark:border-dark-500 dark:bg-dark-600"
                      : "peer border-gray-300 hover:border-gray-400 focus:border-primary-600 dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500",
                  ],
            ],
            className,
            classNames?.select,
          )}
          id={id}
          ref={mergeRefs(ref, selectRef)}
          disabled={disabled}
          data-disabled={disabled}
          multiple={multiple}
          {...rest}
        >
          {children || options}
        </select>
        {!multiple && !unstyled && prefix && (
          <div
            className={clsx(
              "prefix ltr:left-0 rtl:right-0",
              affixClass,
              classNames?.prefix,
            )}
          >
            {prefix}
          </div>
        )}

        {!multiple && !unstyled && (
          <div
            className={clsx(
              "suffix ltr:right-0 rtl:left-0",
              affixClass,
              classNames?.suffix,
            )}
          >
            {suffix}
          </div>
        )}
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
});

Select.displayName = "Select";

Select.propTypes = {
  component: PropTypes.elementType,
  label: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  classNames: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  unstyled: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  rootProps: PropTypes.object,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  multiple: PropTypes.bool,
  data: PropTypes.array,
};

export { Select };
