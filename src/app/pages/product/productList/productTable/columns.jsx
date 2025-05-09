// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
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

export const columns = [
  columnHelper.display({
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
  }),
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
  columnHelper.accessor((row) => row?.cost, {
    id: "cost",
    label: "Cost",
    header: "Cost",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.price, {
    id: "price",
    label: "Price",
    header: "Price",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.unit, {
    id: "product_unit",
    label: "Product Unit",
    header: "Product Unit",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.unit}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.quantity, {
    id: "quantity",
    label: "Quantity",
    header: "Quantity",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          - ${Number(props.row.original?.quantity).toLocaleString()}
        </p>
      );
    },
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
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
