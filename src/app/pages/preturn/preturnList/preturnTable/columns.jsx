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

import clsx from "clsx";

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

// Create a function that returns columns with translations
export const getColumns = (t, role) => {
  const columns = [
    columnHelper.accessor((row) => row?.timestamp, {
      id: "timestamp",
      label: t("nav.table_fields.date"),
      header: t("nav.table_fields.date"),
      cell: DateCell,
      filterFn: "inNumberRange",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row?.reference_no, {
      id: "reference_no",
      label: t("nav.table_fields.reference_no"),
      header: t("nav.table_fields.reference_no"),
      cell: (props) => {
        return (
          <p
            className={clsx(
              "text-sm-plus font-medium",
              props.row.original?.status === 1
                ? "dark:text-dark-100 text-gray-800"
                : "text-red-500",
            )}
          >
            {props.row.original?.reference_no}
          </p>
        );
      },
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row?.amount, {
      id: "amount",
      label: t("nav.table_fields.amount"),
      header: t("nav.table_fields.amount"),
      cell: TotalCell,
      filterFn: "inNumberRange",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row?.note, {
      id: "note",
      label: t("nav.table_fields.note"),
      header: t("nav.table_fields.note"),
      enableSorting: false,
      cell: (props) => {
        const { note, attachment } = props.row.original || {};

        return (
          <div className="flex items-center gap-2 py-1">
            <span
              className={clsx(
                "text-sm-plus font-medium",
                props.row.original?.status === 1
                  ? "dark:text-dark-100 text-gray-800"
                  : "text-red-500",
              )}
            >
              {note}
            </span>
            <div className="attachment-container flex items-center gap-1">
              {attachment && (
                <Image
                  src={`${IMG_URL}${attachment}`}
                  alt="attachment"
                  width={30}
                  height={30}
                />
              )}
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
  ];

  if (role === "admin" || role === "user") {
    columnHelper.display({
      id: "actions",
      label: t("nav.table_fields.actions"),
      header: t("nav.table_fields.actions"),
      cell: RowActions,
    });
  }

  return columns;
};
