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
  // DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
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
  columnHelper.accessor((row) => row.customer.name, {
    id: "attachment",
    label: "Attachment",
    header: "",
    cell: () => <div></div>,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "code",
    label: "Product Code",
    header: "Product Code",
    cell: () => <div>10524</div>,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "product_name",
    label: "Product Name",
    header: "Product Name",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "purchased",
    label: "Purchased",
    header: "Purchased",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "sold",
    label: "Sold",
    header: "Sold",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "purchased_amound",
    label: "Purchased Amount",
    header: "Purchased Amound",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "sold_amount",
    label: "Sold Amount",
    header: "Sold Amount",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "profit_loss",
    label: "Profit(Loss)",
    header: "Profit(Loss)",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
];
