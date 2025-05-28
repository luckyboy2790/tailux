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
    label: t("nav.company_fields.name"),
    header: t("nav.company_fields.name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.stores, {
    id: "stores",
    label: t("nav.company_fields.stores"),
    header: t("nav.company_fields.stores"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.stores.length}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.users, {
    id: "users",
    label: t("nav.company_fields.users"),
    header: t("nav.company_fields.users"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.users.length}
        </p>
      );
    },
    enableSorting: false,
  }),
  //   columnHelper.accessor(
  //     (row) => `${row.shipping_address?.street}, ${row.shipping_address?.line}`,
  //     {
  //       id: "address",
  //       label: "Address",
  //       header: "Address",
  //       cell: AddressCell,
  //     },
  //   ),
  columnHelper.display({
    id: "actions",
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
