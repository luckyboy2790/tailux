// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import { OrderStatusCell } from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.username, {
    id: "username",
    label: "Username",
    header: "Username",
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
    label: "First Name",
    header: "First Name",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.first_name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.first_name, {
    id: "last_name",
    label: "Last Name",
    header: "Last Name",
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
    label: "Company Name",
    header: "Company Name",
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
    label: "Phone number",
    header: "Phone number",
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
    label: "Role",
    header: "Role",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800 capitalize">
          {props.row.original?.role}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row, {
    id: "total_sales",
    label: "Total Sales",
    header: "Total Sales",
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
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
