// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

/**
 * Get columns with translations
 * @param {function} t - Translation function
 * @returns {Array} Translated columns
 */
export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: t("nav.category.category_name"),
    header: t("nav.category.category_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.ordered_quantity, {
    id: "ordered_quantity",
    label: t("nav.category.ordered_quantity"),
    header: t("nav.category.ordered_quantity"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.ordered_quantity}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.received_quantity, {
    id: "received_quantity",
    label: t("nav.category.received_quantity"),
    header: t("nav.category.received_quantity"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.received_quantity}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.percentage, {
    id: "percentage",
    label: t("nav.category.percentage"),
    header: t("nav.category.percentage"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.received_quantity === 0
            ? 0
            : Math.round(
                (Number(props.row.original?.received_quantity) /
                  Number(props.row.original?.ordered_quantity)) *
                  100,
              )}
          %
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
