// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  //   AddressCell,
  DateCell,
  //   OrderIdCell,
  // OrderStatusCell,
  // ProfitCell,
  TotalCell,
} from "./rows";
import { Image } from "antd";

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row?.timestamp, {
    id: "timestamp",
    label: "Order Date",
    header: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.reference_no, {
    id: "reference_no",
    label: "Reference No",
    header: "Reference No",
    cell: (props) => {
      return (
        <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
          {props.row.original?.reference_no}
        </p>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.amount, {
    id: "amount",
    label: "Amount",
    header: "Amount",
    cell: TotalCell,
    filterFn: "inNumberRange",
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row?.note, {
    id: "note",
    label: "Note",
    header: "Note",
    enableSorting: false,
    cell: (props) => {
      const { note, images = [] } = props.row.original || {};

      return (
        <div className="flex items-center gap-2 py-1">
          <span className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
            {note}
          </span>
          <div className="attachment-container flex items-center gap-1">
            {images.map((img, index) => (
              <Image
                key={index}
                src={`${IMG_URL}${img.path}`}
                alt="attachment"
                width={30}
                height={30}
              />
            ))}
          </div>
        </div>
      );
    },
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
