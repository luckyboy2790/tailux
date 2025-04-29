// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
  //   AddressCell,
  CustomerCell,
  DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  // TotalCell,
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
    cell: () => <div></div>,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "product_code",
    label: "Product Code",
    header: "Product Code",
    cell: () => (
      <div className="dark:text-dark-100 flex items-center gap-2 text-gray-800">
        <span className="text-sm-plus font-medium">1</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "product_name",
    label: "Product Name",
    header: "Product Name",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => row.customer.name, {
    id: "reference_no",
    label: "Reference No",
    header: "Reference No",
    cell: CustomerCell,
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "expiry_date",
    label: "Expiry Date",
    header: "Expiry Date",
    cell: DateCell,
  }),
  columnHelper.accessor((row) => Number(row.created_at), {
    id: "purchase_date",
    label: "Purchase Date",
    header: "Purchase Date",
    cell: DateCell,
  }),
];
