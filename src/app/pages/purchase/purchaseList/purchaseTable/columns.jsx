// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

import clsx from "clsx";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
  CustomerCell,
  DateCell,
  OrderStatusCell,
  ProfitCell,
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
  columnHelper.accessor((row) => row?.timestamp, {
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
      const formatText = (text) => {
        return text
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
      };

      return (
        <p
          className={clsx(
            "text-sm-plus",
            props.row.original?.status === 0
              ? "text-red-600"
              : "dark:text-dark-100 font-medium text-gray-800",
          )}
        >
          {props.row.original?.reference_no
            ? formatText(props.row.original?.reference_no)
            : ""}
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
  columnHelper.accessor((row) => row?.grand_total, {
    id: "total",
    label: t("nav.table_fields.grand_total"),
    header: t("nav.table_fields.grand_total"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paid_amount, {
    id: "paid",
    label: t("nav.table_fields.paid"),
    header: t("nav.table_fields.paid"),
    cell: ProfitCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_amount - row?.paid_amount, {
    id: "balance",
    label: t("nav.table_fields.balance"),
    header: t("nav.table_fields.balance"),
    cell: (props) => {
      const original = props.row.original;

      const total = Number(original?.total_amount) || 0;
      const shipping = Number(original?.shipping) || 0;
      const paid = Number(original?.paid_amount) || 0;

      const rawDiscount = original?.discount_string?.toString() || "0";

      const discount = rawDiscount.includes("%")
        ? (total * parseFloat(rawDiscount.replace("%", ""))) / 100
        : Number(rawDiscount);

      const balance = total - discount + shipping - paid;
      const formatted = Math.abs(balance).toLocaleString();

      return (
        <p
          className={clsx(
            "text-sm-plus",
            original?.status === 0
              ? "text-red-600"
              : balance < 0
                ? "font-medium text-orange-600"
                : "dark:text-dark-100 font-medium text-gray-800",
          )}
        >
          {`${balance < 0 ? "-" : ""}$${formatted}`}
        </p>
      );
    },
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row, {
    id: "order_status",
    label: t("nav.table_fields.order_status"),
    header: t("nav.table_fields.order_status"),
    cell: OrderStatusCell,
    filterFn: "arrIncludesSome",
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
