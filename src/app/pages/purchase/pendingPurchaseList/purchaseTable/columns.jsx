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
  UserCell,
} from "./rows";

import clsx from "clsx";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

// Create a function that returns columns with translations
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
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.supplier.name, {
    id: "user",
    label: t("nav.people.user"),
    header: t("nav.people.user"),
    cell: UserCell,
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
    cell: (props) => {
      const original = props.row.original;

      const total = Number(original?.total_amount) || 0;
      const shipping = Number(original?.shipping) || 0;

      const rawDiscount = original?.discount_string?.toString() || "0";

      const discount = rawDiscount.includes("%")
        ? (total * parseFloat(rawDiscount.replace("%", ""))) / 100
        : Number(rawDiscount);

      const balance = total - discount.toFixed(0) + shipping;
      const formatted = Math.abs(balance).toLocaleString();

      return (
        <p
          className={clsx(
            "text-sm-plus",
            balance < 0
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
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
