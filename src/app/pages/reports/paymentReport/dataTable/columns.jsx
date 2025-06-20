// table/columns.js

import { createColumnHelper } from "@tanstack/react-table";
import { CustomerCell, DateCell, TotalCell } from "./rows";

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    header: t("nav.table_fields.date"),
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    header: t("nav.table_fields.reference_no"),
    cell: (props) => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        {props.row.original?.reference_no}
      </p>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paymentable?.reference_no, {
    id: "paymentable_reference",
    header: t("nav.payment.purchase_reference"),
    cell: (props) => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        {props.row.original?.paymentable?.reference_no}
      </p>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paymentable?.supplier_company, {
    id: "party_company",
    header: t("nav.table_fields.supplier"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.amount, {
    id: "amount",
    header: t("nav.table_fields.amount"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
];
