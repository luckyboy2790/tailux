// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  OrderStatusCell,
  //   OrderIdCell,
  ProfitCell,
  TotalCell,
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
    label: t("nav.detail.reference_no"),
    header: t("nav.detail.reference_no"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
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
  columnHelper.accessor((row) => row?.user?.username, {
    id: "user",
    label: t("nav.people.user"),
    header: t("nav.people.user"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.customer.company, {
    id: "customer",
    label: t("nav.people.customer"),
    header: t("nav.people.customer"),
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
  columnHelper.accessor((row) => row?.grand_total - row?.paid_amount, {
    id: "balance",
    label: t("nav.table_fields.balance"),
    header: t("nav.table_fields.balance"),
    cell: (props) => (
      <p
        className={`text-sm-plus ${props.row.original?.grand_total < props.row.original?.paid_amount ? "dark:text-red-500" : "dark:text-dark-100"} font-medium text-gray-800`}
      >
        {(() => {
          const diff =
            (props.row.original?.grand_total || 0) -
            (props.row.original?.paid_amount || 0);
          const absValue = Math.abs(diff).toLocaleString();
          return `${diff < 0 ? "-" : ""}$${absValue}`;
        })()}
      </p>
    ),
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
