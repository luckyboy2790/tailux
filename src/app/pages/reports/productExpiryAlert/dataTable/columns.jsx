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

export const columns = [
  columnHelper.accessor((row) => row?.images, {
    id: "attachment",
    label: "",
    header: "",
    cell: ImageCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.product.code, {
    id: "code",
    label: "Code",
    header: "Code",
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
    label: "Product Name",
    header: "Product Name",
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
    label: "Reference No",
    header: "Reference No",
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
    label: "Expiry Date",
    header: "Expiry Date",
    cell: DateCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.orderable.timestamp, {
    id: "purchase_date",
    label: "Purchase Date",
    header: "Purchase Date",
    cell: DateCell,
    enableSorting: false,
  }),
];
