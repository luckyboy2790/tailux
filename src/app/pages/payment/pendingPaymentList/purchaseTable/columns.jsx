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
  // OrderStatusCell,
  // ProfitCell,
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
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "created_at",
    label: "Payment Date",
    header: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "reference_no",
    label: "Reference No",
    header: "Reference No",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "type",
    label: "Type",
    header: "Type",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "supplier",
    label: "Supplier / Customer",
    header: "Supplier / Customer",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.total, {
    id: "total",
    label: "Total",
    header: "Total",
    cell: TotalCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "note",
    label: "Note",
    header: "Note",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800"></p>
    ),
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
