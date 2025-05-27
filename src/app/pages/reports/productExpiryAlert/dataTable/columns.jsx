// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { RowActions } from "./RowActions";
// import {
//   SelectCell,
//   SelectHeader,
// } from "components/shared/table/SelectCheckbox";
import {
  DateCell,
  //   AddressCell,
  // CustomerCell,
  // DateCell,
  ImageCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
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
  columnHelper.accessor((row) => row?.product.code, {
    id: "code",
    label: t("nav.product.product_code"),
    header: t("nav.product.product_code"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.product.code}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.product.name, {
    id: "product_name",
    label: t("nav.product.product_name"),
    header: t("nav.product.product_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.product.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.orderable.reference_no, {
    id: "reference_no",
    label: t("nav.table_fields.reference_no"),
    header: t("nav.table_fields.reference_no"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.orderable.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.orderable.expiry_date, {
    id: "expiry_date",
    label: t("nav.purchase.expiry_date"),
    header: t("nav.purchase.expiry_date"),
    cell: DateCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.orderable.timestamp, {
    id: "purchase_date",
    label: t("nav.purchase.purchase_date"),
    header: t("nav.purchase.purchase_date"),
    cell: DateCell,
    enableSorting: false,
  }),
];
