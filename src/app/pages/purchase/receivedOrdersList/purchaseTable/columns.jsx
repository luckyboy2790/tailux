// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
  CustomerCell,
  //   AddressCell,
  DateCell,
  //   OrderIdCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.display({
    id: "select",
    label: t("nav.table_fields.row_selection"),
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_at, {
    id: "timestamp",
    label: t("nav.table_fields.date"),
    header: t("nav.table_fields.date"),
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    label: t("nav.table_fields.reference_no"),
    header: t("nav.table_fields.reference_no"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.po_reference_no, {
    id: "po_reference_no",
    label: t("nav.purchase.purchase_order"),
    header: t("nav.purchase.purchase_order"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.po_reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.supplier.name, {
    id: "supplier",
    label: t("nav.table_fields.supplier"),
    header: t("nav.table_fields.supplier"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.shipping_carrier, {
    id: "shipping_carrier",
    label: t("nav.purchase.shipping_carrier"),
    header: t("nav.purchase.shipping_carrier"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.shipping_carrier}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_amount, {
    id: "total_amount",
    label: t("nav.table_fields.grand_total"),
    header: t("nav.table_fields.grand_total"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
