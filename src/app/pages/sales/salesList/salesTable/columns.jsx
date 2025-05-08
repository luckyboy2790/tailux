// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  //   OrderIdCell,
  OrderStatusCell,
  ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
  }),
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
  columnHelper.accessor((row) => row?.grand_total - row?.paid_amount, {
    id: "balance",
    label: "Balance",
    header: "Balance",
    cell: (props) => (
      <p
        className={`text-sm-plus ${props.row.original?.grand_total < props.row.original?.paid_amount ? "dark:text-red-500" : "dark:text-dark-100"} font-medium text-gray-800`}
      >
        $
        {(
          (props.row.original?.grand_total || 0) -
          (props.row.original?.paid_amount || 0)
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    ),
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
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
