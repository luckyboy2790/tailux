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
  TotalCell,
  // TotalCell,
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
  columnHelper.accessor((row) => row?.code, {
    id: "code",
    label: "Code",
    header: "Code",
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
    label: "Name",
    header: "Name",
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
    label: "Quantity",
    header: "Quantity",
    cell: TotalCell,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.alert_quantity, {
    id: "alert_quantity",
    label: "Alert Quantity",
    header: "Alert Quantity",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
];
