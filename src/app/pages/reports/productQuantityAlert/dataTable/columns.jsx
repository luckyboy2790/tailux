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
    id: "code",
    label: "Code",
    header: "",
    cell: () => <div></div>,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "code",
    label: "Code",
    header: "Code",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "name",
    label: "Name",
    header: "Name",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "quantity",
    label: "Quantity",
    header: "Quantity",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "alert_quantity",
    label: "Alert Quantity",
    header: "Alert Quantity",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
];
