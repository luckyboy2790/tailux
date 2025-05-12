// table/columns.js

import { createColumnHelper } from "@tanstack/react-table";
import { CustomerCell, DateCell, TotalCell } from "./rows";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    header: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    header: "Reference No",
    cell: (props) => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        {props.row.original?.reference_no}
      </p>
    ),
  }),
  columnHelper.accessor((row) => row?.paymentable?.reference_no, {
    id: "sale_reference",
    header: "Sale Reference",
    cell: (props) => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        {props.row.original?.paymentable?.reference_no}
      </p>
    ),
  }),
  columnHelper.accessor(
    (row) =>
      row?.paymentable?.supplier?.company ||
      row?.paymentable?.customer?.company,
    {
      id: "party_company",
      header: "Customer",
      cell: CustomerCell,
    },
  ),
  columnHelper.accessor((row) => row?.amount, {
    id: "amount",
    header: "Amount",
    cell: TotalCell,
    filterFn: "inNumberRange",
  }),
];
