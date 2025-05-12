// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  ImageCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.images, {
    id: "attachment",
    label: "",
    header: "",
    cell: ImageCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.code, {
    id: "code",
    label: "Product Code",
    header: "Product Code",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.code}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: "Product Name",
    header: "Product Name",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_quantity, {
    id: "purchased",
    label: "Purchased",
    header: "Purchased",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.sold_quantity, {
    id: "sold",
    label: "Sold",
    header: "Sold",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_amount, {
    id: "purchased_amount",
    label: "Purchase Amount",
    header: "Purchase Amount",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.sold_amount, {
    id: "sold_amount",
    label: "Sold Amount",
    header: "Sold Amount",
    cell: TotalCell,
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
          signDisplay: "always", // This will show + or - sign
        })
          .format(value)
          .replace("+", ""); // Remove + sign if present
      };

      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {formatCurrency(
            Number(props.row.original?.sold_amount) -
              Number(props.row.original?.purchased_amount),
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
];
