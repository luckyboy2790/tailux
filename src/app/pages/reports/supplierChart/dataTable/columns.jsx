// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.company, {
    id: "company",
    label: "Company",
    header: "Company",
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
    label: "Name",
    header: "Name",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
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
  columnHelper.accessor((row) => row?.email, {
    id: "email",
    label: "Email",
    header: "Email",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.email}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_sales, {
    id: "total_sales",
    label: "Total Sales",
    header: "Total Sales",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_amount, {
    id: "total_amount",
    label: "Total Amount",
    header: "Total Amount",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paid_amount, {
    id: "paid_amount",
    label: "Paid Amount",
    header: "Paid Amount",
    cell: ProfitCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_amount, {
    id: "quantity",
    label: "Quantity",
    header: "Quantity",
    cell: (props) => {
      const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          signDisplay: "always",
        })
          .format(value)
          .replace("+", "");
      };

      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {formatCurrency(
            Number(props.row.original?.total_amount) -
              Number(props.row.original?.paid_amount),
          )}
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
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
