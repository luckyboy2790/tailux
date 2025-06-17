// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  TotalCell,
} from "./rows";
import dayjs from "dayjs";
import { RowActions } from "./RowActions";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const getColumns = (t) => [
  columnHelper.accessor((row) => row?.company_name, {
    id: "company",
    label: t("nav.notification.company"),
    header: t("nav.notification.company"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.company_name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.name, {
    id: "name",
    label: t("nav.notification.message"),
    header: t("nav.notification.message"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {t(`nav.notification.${props.row.original?.message}`)}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    label: t("nav.notification.reference_no"),
    header: t("nav.notification.reference_no"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.supplier, {
    id: "supplier",
    label: t("nav.notification.supplier"),
    header: t("nav.notification.supplier"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.supplier}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.amount, {
    id: "amount",
    label: t("nav.notification.amount"),
    header: t("nav.notification.amount"),
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.created_at, {
    id: "created_at",
    label: t("nav.notification.time"),
    header: t("nav.notification.time"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {dayjs(props.row.original?.created_at).format("DD/MM/YYYY HH:mm:ss")}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    label: t("nav.table_fields.actions"),
    header: t("nav.table_fields.actions"),
    cell: RowActions,
  }),
];
