// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.company, {
    id: "company",
    label: t("nav.suppliers.company"),
    header: t("nav.suppliers.company"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.company}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: t("nav.suppliers.name"),
    header: t("nav.suppliers.name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.email, {
    id: "email",
    label: t("nav.suppliers.email"),
    header: t("nav.suppliers.email"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.email}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.phone_number, {
    id: "phone_number",
    label: t("nav.suppliers.phone_number"),
    header: t("nav.suppliers.phone_number"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.phone_number}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.city, {
    id: "city",
    label: t("nav.suppliers.city"),
    header: t("nav.suppliers.city"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.city}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.address, {
    id: "address",
    label: t("nav.suppliers.address"),
    header: t("nav.suppliers.address"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.address}
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
    label: t("nav.suppliers.action"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
