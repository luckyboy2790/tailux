// Import Dependencies
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { Spinner } from "components/ui";

// ----------------------------------------------------------------------

export const StyledSwitch = ({
  loading,
  srText,
  thumbBorder = "2px",
  style,
  size = 5,
  className,
  classNames,
  disabled,
  ...rest
}) => {
  return (
    <Switch
      className={({ checked }) =>
        clsx(
          `styled-switch relative flex shrink-0 cursor-pointer items-center rounded-full p-(--thumb-border) outline-hidden transition-colors duration-200 ease-in-out focus:outline-hidden`,
          disabled
            ? "pointer-events-none select-none bg-gray-150 opacity-70 ring-1 ring-gray-200 dark:bg-dark-450 dark:opacity-60 dark:ring-dark-450"
            : checked
              ? "this:primary bg-this dark:bg-this-light"
              : "bg-gray-300 dark:bg-surface-1",
          className,
          classNames?.switch,
        )
      }
      style={{
        "--thumb-border": thumbBorder,
        width: `${size / 2}rem`,
        height: `${size / 4}rem`,
        ...style,
      }}
      disabled={loading || disabled}
      {...rest}
    >
      {({ checked }) => (
        <>
          <span className="sr-only">{srText}</span>
          <span
            aria-hidden="true"
            className={clsx(
              "styled-switch-thumb pointer-events-none flex h-full w-[calc(100%/2-var(--thumb-border))] transform items-center justify-center rounded-full p-0.5 shadow-lg ring-0 transition duration-200 ease-in-out",
              checked
                ? "translate-x-[calc(100%+var(--thumb-border)*2)] rtl:-translate-x-[calc(100%+var(--thumb-border)*2)]"
                : "translate-x-0 bg-white dark:bg-dark-50",
              disabled
                ? "bg-gray-400 dark:bg-dark-800"
                : checked
                  ? "bg-white"
                  : "bg-white dark:bg-dark-50",
              classNames?.thumb,
            )}
          >
            {loading && (
              <Spinner
                isElastic
                color={clsx(checked ? "primary" : "neutral")}
                className={clsx("h-full w-full border-2", classNames?.spinner)}
              />
            )}
          </span>
        </>
      )}
    </Switch>
  );
};

StyledSwitch.propTypes = {
  loading: PropTypes.bool,
  srText: PropTypes.string,
  thumbBorder: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.number,
  className: PropTypes.string,
  classNames: PropTypes.object,
  disabled: PropTypes.bool,
};
