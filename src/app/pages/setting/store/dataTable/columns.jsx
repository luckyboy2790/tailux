// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.name, {
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
  columnHelper.accessor((row) => row?.company?.name, {
    id: "company",
    label: "Company",
    header: "Company",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.company?.name}
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
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
