// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { ensureString } from "utils/ensureString";
import { Highlight } from "../Highlight";

// ----------------------------------------------------------------------

export function HighlightableCell({ getValue, table }) {
  const query = ensureString(table.getState()?.globalFilter);

  return (
    <span>
      <Highlight query={query}>{getValue()}</Highlight>
    </span>
  );
}

HighlightableCell.propTypes = {
  getValue: PropTypes.func,
  table: PropTypes.object,
};
