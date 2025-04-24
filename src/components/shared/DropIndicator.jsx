// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";

// ----------------------------------------------------------------------

export function DropIndicator({ edge, gap = "0px" }) {
  const lineOffset = `calc(-0.5 * (${gap} + 1px))`;

  return (
    <div
      className={clsx(
        "absolute bg-primary-600 before:absolute before:size-2.5 before:rounded-full before:border-2 before:border-primary-600",
        (edge === "top" || edge === "bottom") &&
          "inset-x-0 h-0.5 w-full before:-left-2.5 before:-translate-y-1/2",
        (edge === "left" || edge === "right") &&
          "inset-y-0 h-full w-0.5 before:-top-2.5 before:-translate-x-1/2",
        edge === "top" && "top-(--llo)",
        edge === "bottom" && "bottom-(--llo)",
        edge === "left" && "left-(--llo)",
        edge === "right" && "right-(--llo)",
      )}
      style={{ "--llo": lineOffset }}
    />
  );
}

DropIndicator.propTypes = {
  edge: PropTypes.string,
  gap: PropTypes.string,
};
