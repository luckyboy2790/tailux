// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import { Button, GhostSpinner } from "components/ui";
import { toast } from "sonner";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function SelectedRowsActions({ table }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [cookies] = useCookies(["authToken"]);

  const { t } = useTranslation();

  const token = cookies.authToken;

  const selectedRows = table.getSelectedRowModel().rows;

  const handleDeleteRows = async () => {
    if (selectedRows.length > 0) {
      setDeleteLoading(true);
      await Promise.all(
        selectedRows.map((row) =>
          fetch(`${API_URL}/api/sales/delete/${row.original?.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );

      toast.success("Delete Sales successfully");
      setDeleteLoading(false);

      if (typeof table.options.meta?.refetch === "function") {
        await table.options.meta.refetch();
      } else {
        console.warn("Refetch function not available in table meta.");
      }
    }
  };

  const exportTableToExcel = async (table) => {
    const sales = table || [];

    const data = sales.map((s, index) => {
      let status = "paid";
      if (s.original?.paid_amount === 0) {
        status = "partial";
      } else if (s.original?.paid_amount < s.original?.grand_total) {
        status = "pending";
      }

      return {
        No: index + 1,
        Date: dayjs(s.original?.timestamp).format("YYYY-MM-DD"),
        Reference_No: s.original?.reference_no,
        Customer: s.original?.customer?.company || "",
        Grand_Total: s.original?.grand_total,
        Paid_Amount: s.original?.paid_amount,
        Balance: s.original?.grand_total - s.original?.paid_amount,
        Order_Status: status,
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sales");

    if (data.length > 0) {
      worksheet.columns = Object.keys(data[0]).map((key) => ({
        header: key,
        key: key,
        width: 20,
      }));

      data.forEach((row) => {
        worksheet.addRow(row);
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `SalesReport_${dayjs().format("YYYY-MM-DD")}.xlsx`);
  };

  return (
    <Transition
      as={Fragment}
      show={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()}
      enter="transition-all duration-200"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
    >
      <div className="pointer-events-none sticky inset-x-0 bottom-0 z-5 flex items-center justify-end">
        <div className="w-full max-w-xl px-2 py-4 sm:absolute sm:-translate-y-1/2 sm:px-4">
          <div className="dark:bg-dark-50 dark:text-dark-900 pointer-events-auto flex items-center justify-between rounded-lg bg-gray-800 px-3 py-2 font-medium text-gray-100 sm:px-4 sm:py-3">
            <p>
              <span>
                {selectedRows.length} {t("nav.select_row.select")}
              </span>
              <span className="max-sm:hidden">
                {" "}
                {t("nav.select_row.from")} {table.getCoreRowModel().rows.length}
              </span>
            </p>
            <div className="flex space-x-1.5">
              <Button
                onClick={handleDeleteRows}
                className="text-xs-plus w-7 space-x-1.5 rounded-full px-3 py-1.5 sm:w-auto sm:rounded-sm"
                color="error"
                disabled={deleteLoading || selectedRows.length <= 0}
              >
                {deleteLoading ? (
                  <div className="flex size-4 items-center justify-center">
                    <GhostSpinner
                      className="size-3.5 shrink-0 border-2"
                      variant="soft"
                    />
                  </div>
                ) : (
                  <TrashIcon className="size-4 shrink-0" />
                )}
                <span className="max-sm:hidden">
                  {t("nav.select_row.delete")}
                </span>
              </Button>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton
                  as={Button}
                  className="text-xs-plus w-7 gap-1.5 rounded-full px-3 py-1.5 sm:w-auto sm:rounded-sm"
                >
                  <EllipsisHorizontalIcon className="size-4 shrink-0" />
                  <span className="max-sm:hidden">
                    {t("nav.select_row.more")}
                  </span>{" "}
                </MenuButton>
                <Transition
                  as={MenuItems}
                  enter="transition ease-out"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                  className="text-xs-plus shadow-soft dark:border-dark-500 dark:bg-dark-750 dark:text-dark-200 absolute z-100 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 text-gray-600 outline-hidden focus-visible:outline-hidden dark:shadow-none"
                  anchor={{ to: "top end", gap: 6 }}
                >
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={clsx(
                          "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                          focus &&
                            "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                        )}
                        onClick={() => {
                          exportTableToExcel(selectedRows);
                        }}
                      >
                        <ArrowUpTrayIcon className="size-4.5" />
                        <span>{t("nav.export.export_excel")}</span>
                      </button>
                    )}
                  </MenuItem>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

SelectedRowsActions.propTypes = {
  table: PropTypes.object,
};
