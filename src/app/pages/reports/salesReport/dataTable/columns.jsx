// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  OrderStatusCell,
  //   OrderIdCell,
  ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    label: "Order Date",
    header: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    label: "Reference No",
    header: "Reference No",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.company.name, {
    id: "company",
    label: "Company",
    header: "Company",
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.store.name, {
    id: "store",
    label: "Store",
    header: "Store",
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.user?.username, {
    id: "user",
    label: "User",
    header: "User",
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.customer.company, {
    id: "customer",
    label: "Customer",
    header: "Customer",
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.grand_total, {
    id: "total",
    label: "Total",
    header: "Grand Total",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paid_amount, {
    id: "paid",
    label: "Paid",
    header: "Paid",
    cell: ProfitCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row, {
    id: "order_status",
    label: "Order Status",
    header: "Order Status",
    cell: OrderStatusCell,
    filterFn: "arrIncludesSome",
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
