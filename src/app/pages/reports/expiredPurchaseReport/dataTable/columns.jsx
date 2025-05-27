// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  //   OrderIdCell,
  OrderStatusCell,
  ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    label: t("nav.purchase.purchase_date"),
    header: t("nav.table_fields.date"),
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row?.expiry_date, {
    id: "expiry_date",
    label: t("nav.purchase.expiry_date"),
    header: t("nav.purchase.expiry_date"),
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
  columnHelper.accessor((row) => row?.company.name, {
    id: "company",
    label: t("nav.company"),
    header: t("nav.company"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.store.name, {
    id: "store",
    label: t("nav.purchase.store"),
    header: t("nav.purchase.store"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.supplier.company, {
    id: "supplier",
    label: t("nav.table_fields.supplier"),
    header: t("nav.table_fields.supplier"),
    cell: CustomerCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_amount, {
    id: "grand_total",
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
        $
        {(
          (props.row.original?.grand_total || 0) -
          (props.row.original?.paid_amount || 0)
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
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
