// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.company, {
    id: "company",
    label: t("nav.customer_table.company"),
    header: t("nav.customer_table.company"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.company}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: t("nav.customer_table.name"),
    header: t("nav.customer_table.name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.phone_number, {
    id: "phone_number",
    label: t("nav.customer_table.phone_number"),
    header: t("nav.customer_table.phone_number"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.phone_number}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.email, {
    id: "email",
    label: t("nav.customer_table.email"),
    header: t("nav.customer_table.email"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.email}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_sales, {
    id: "total_sales",
    label: t("nav.total_purchase"),
    header: t("nav.total_purchase"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.total_amount, {
    id: "total_amount",
    label: t("nav.customer_table.total_amount"),
    header: t("nav.customer_table.total_amount"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.paid_amount, {
    id: "paid_amount",
    label: t("nav.customer_table.paid"),
    header: t("nav.customer_table.paid"),
    cell: ProfitCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_amount, {
    id: "quantity",
    label: t("nav.customer_table.balance"),
    header: t("nav.customer_table.balance"),
    cell: (props) => {
      const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          signDisplay: "always",
        })
          .format(value)
          .replace("+", "");
      };

      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {formatCurrency(
            Number(props.row.original?.total_amount) -
              Number(props.row.original?.paid_amount),
          )}
        </p>
      );
    },
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
