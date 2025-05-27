// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { OrderStatusCell } from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.username, {
    id: "username",
    label: t("nav.user.username"),
    header: t("nav.user.username"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.username}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.first_name, {
    id: "first_name",
    label: t("nav.user.first_name"),
    header: t("nav.user.first_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.first_name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.last_name, {
    id: "last_name",
    label: t("nav.user.last_name"),
    header: t("nav.user.last_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.last_name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.company?.name, {
    id: "company_name",
    label: t("nav.user.company_name"),
    header: t("nav.user.company_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.company?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.phone_number, {
    id: "phone_number",
    label: t("nav.user.phone_number"),
    header: t("nav.user.phone_number"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.phone_number}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.role, {
    id: "role",
    label: t("nav.user.role"),
    header: t("nav.user.role"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800 capitalize">
          {props.row.original?.role ? t(`nav.user.${props.row.original.role.toLowerCase()}`) : ''}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row, {
    id: "total_sales",
    label: t("nav.user.total_sales"),
    header: t("nav.user.total_sales"),
    cell: OrderStatusCell,
    filterFn: "inNumberRange",
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
];
