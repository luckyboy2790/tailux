// Import Dependencies
import clsx from "clsx";
import { Fragment } from "react";
import PropTypes from "prop-types";

// Local Imports
import { useHighlight } from "hooks";

// ----------------------------------------------------------------------

export function Highlight({
  children,
  query,
  unstyled = false,
  highlightClass,
}) {
  if (!(typeof children === "string" || typeof children === "number")) {
    throw new Error(
      "The children prop of Highlight must be a string or number.",
    );
  }

  const chunks = useHighlight({ query, text: children.toString() });

  return (
    <>
      {chunks.map((chunk, index) => {
        return chunk.match ? (
          <mark
            key={index}
            className={clsx(
              "whitespace-nowrap",
              !unstyled &&
                "inline-block rounded-xs bg-lime-200 dark:bg-lime-300",
              highlightClass,
            )}
          >
            {chunk.text}
          </mark>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        );
      })}
    </>
  );
}

Highlight.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  query: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  unstyled: PropTypes.bool,
  highlightClass: PropTypes.string,
};
