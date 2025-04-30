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
    id: "sale_reference",
    label: "Sale Reference",
    header: "Sale Reference",
    cell: () => (
      <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
        <span className="text-sm-plus font-medium">0503</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "customer",
    label: "Customer",
    header: "Customer",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.profit, {
    id: "amount",
    label: "Amount",
    header: "Amount",
    cell: ProfitCell,
    filterFn: "inNumberRange",
  }),
];
