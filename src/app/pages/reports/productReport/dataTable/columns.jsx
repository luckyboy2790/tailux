// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  ImageCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  TotalCell,
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.images, {
    id: "attachment",
    label: "",
    header: "",
    cell: ImageCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.code, {
    id: "code",
    label: t("nav.detail.product_code"),
    header: t("nav.detail.product_code"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.code}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: t("nav.detail.product_name"),
    header: t("nav.detail.product_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_quantity, {
    id: "purchased",
    label: t("nav.purchase.purchase"),
    header: t("nav.purchase.purchase"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.sold_quantity, {
    id: "sold",
    label: t("nav.sale.sale"),
    header: t("nav.sale.sale"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_amount, {
    id: "purchased_amount",
    label: t("nav.purchase.purchase"),
    header: t("nav.purchase.purchase") + " " + t("nav.table_fields.amount"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.sold_amount, {
    id: "sold_amount",
    label: t("nav.sale.sale"),
    header: t("nav.sale.sale") + " " + t("nav.table_fields.amount"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.purchased_amount, {
    id: "profit",
    label: t("nav.product.profit"),
    header: t("nav.product.profit"),
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
            Number(props.row.original?.sold_amount) -
              Number(props.row.original?.purchased_amount),
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
];
