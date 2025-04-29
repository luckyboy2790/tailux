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
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "attachment",
    label: "Attachment",
    header: "",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800"></p>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "code",
    label: "Code",
    header: "Code",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        101010
      </p>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "name",
    label: "Name",
    header: "Name",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        Test Product
      </p>
    ),
  }),
  columnHelper.accessor((row) => row.total, {
    id: "cost",
    label: "Cost",
    header: "Cost",
    cell: TotalCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.total, {
    id: "price",
    label: "Price",
    header: "Price",
    cell: TotalCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "product_unit",
    label: "Product Unit",
    header: "Product Unit",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
        Test Unit 01
      </p>
    ),
  }),
  columnHelper.accessor((row) => row.total, {
    id: "quantity",
    label: "Quantity",
    header: "Quantity",
    cell: TotalCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "note",
    label: "Note",
    header: "Note",
    cell: () => (
      <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800"></p>
    ),
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
