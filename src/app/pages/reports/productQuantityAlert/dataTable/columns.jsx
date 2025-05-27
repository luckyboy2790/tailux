// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { RowActions } from "./RowActions";
// import {
//   SelectCell,
//   SelectHeader,
// } from "components/shared/table/SelectCheckbox";
import {
  //   AddressCell,
  // CustomerCell,
  ImageCell,
  // DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  // TotalCell,
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
    label: t("nav.product.product_code"),
    header: t("nav.product.product_code"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.code}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    label: t("nav.product.product_name"),
    header: t("nav.product.product_name"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.name}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.quantity, {
    id: "quantity",
    label: t("nav.product.quantity"),
    header: t("nav.product.quantity"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {Number(props.row.original?.quantity).toLocaleString()}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.alert_quantity, {
    id: "alert_quantity",
    label: t("nav.product.alert_quantity"),
    header: t("nav.product.alert_quantity"),
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {Number(props.row.original?.alert_quantity).toLocaleString()}
        </p>
      );
    },
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
];
