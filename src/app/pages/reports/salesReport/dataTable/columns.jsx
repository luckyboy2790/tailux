// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { RowActions } from "./RowActions";
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
  // TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "date",
    label: "Date",
    header: "Date",
    cell: DateCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "reference_no",
    label: "Reference No",
    header: "Reference No",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "company",
    label: "Company",
    header: "Company",
    cell: () => (
      <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
        <span className="text-sm-plus font-medium">1</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "store",
    label: "Store",
    header: "Store",
    cell: () => (
      <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
        <span className="text-sm-plus font-medium">1</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "user",
    label: "User",
    header: "User",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "customer",
    label: "Customer",
    header: "Customer",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "product",
    label: "Product(Qty)",
    header: "Product(Qty)",
    cell: () => (
      <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
        <span className="text-sm-plus font-medium">1</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "grand_total",
    label: "Grand Total",
    header: "Grand Total",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "paid",
    label: "Paid",
    header: "Paid",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "balance",
    label: "Balance",
    header: "Balance",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.order_status, {
    id: "sale_status",
    label: "Sale Status",
    header: "Sale Status",
    cell: OrderStatusCell,
    filterFn: "arrIncludesSome",
  }),
];
