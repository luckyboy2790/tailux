// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

import clsx from "clsx";

import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  //   OrderIdCell,
  OrderStatusCell,
  ProfitCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    label: t("nav.purchase.purchase_date"),
    header: t("nav.date"),
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
  columnHelper.accessor((row) => row?.company.name, {
    id: "company",
    label: t("nav.detail.company"),
    header: t("nav.detail.company"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.store.name, {
    id: "store",
    label: t("nav.detail.store"),
    header: t("nav.detail.store"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.supplier.name, {
    id: "supplier",
    label: t("nav.supplier"),
    header: t("nav.supplier"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "products",
    label: t("nav.product.product"),
    header: t("nav.product.product"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.orders
            ?.map((order) => `${order.product.name}(${order.quantity})`)
            .join(", ")}
        </p>
      );
    },
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

      const balance = total - discount.toFixed(0) + shipping - paid;
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
  //   columnHelper.accessor(
  //     (row) => `${row.shipping_address?.street}, ${row.shipping_address?.line}`,
  //     {
  //       id: "address",
  //       label: "Address",
  //       header: "Address",
  //       cell: AddressCell,
  //     },
  //   ),
];
