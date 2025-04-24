// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";

// ----------------------------------------------------------------------

export function InputErrorMsg({ when, children, className }) {
  return when ? (
    <span
      className={clsx(
        "input-text-error mt-1 text-xs text-error dark:text-error-lighter",
        className,
      )}
    >
      {children}
    </span>
  ) : null;
}

InputErrorMsg.propTypes = {
  when: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
};
