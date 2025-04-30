// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
// import {
//   //   AddressCell,
//   CustomerCell,
//   DateCell,
//   //   OrderIdCell,
//   OrderStatusCell,
//   ProfitCell,
//   TotalCell,
// } from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "name",
    label: "Name",
    header: "Name",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">aym</span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "company",
    label: "Company",
    header: "Company",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">aym</span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "phone_number",
    label: "Phone Number",
    header: "Phone Number",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">no</span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "email",
    label: "Email",
    header: "Email",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">
            jairo.visionam@gmail.com
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "phone_number",
    label: "Phone Number",
    header: "Phone Number",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">3702476</span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "city",
    label: "City",
    header: "City",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">BOGOTA</span>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "address",
    label: "Address",
    header: "Address",
    cell: () => {
      return (
        <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
          <span className="text-sm-plus font-medium">3702476</span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Actions",
    cell: RowActions,
  }),
];
