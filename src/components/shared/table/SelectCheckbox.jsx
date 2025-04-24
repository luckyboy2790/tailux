// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { Checkbox } from "components/ui";

// ----------------------------------------------------------------------

export function SelectHeader({ table }) {
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        className="size-4.5"
        color="error"
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    </div>
  );
}

export function SelectCell({ row }) {
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        className="size-4.5"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  );
}

SelectHeader.propTypes = {
  table: PropTypes.object,
};

SelectCell.propTypes = {
  row: PropTypes.object,
};
