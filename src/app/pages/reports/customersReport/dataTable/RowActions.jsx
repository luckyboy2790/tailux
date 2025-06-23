import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

import { Button } from "components/ui";
import { useNavigate } from "react-router";

export function RowActions({ row }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const exportRowToExcel = () => {
    if (!row) return;

    const rowData = row.original;
    if (!rowData) return;

    // Only include specific fields
    const data = [
      {
        company: rowData.company || "",
        name: rowData.name || "",
        "phone number": rowData.phone_number || "",
        email: rowData.email || "",
        "total sales": rowData.total_sales || 0,
        "total amount": rowData.total_amount || 0,
        "paid amount": rowData.paid_amount || 0,
        balance: rowData.total_amount - rowData.paid_amount || 0,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, `Customer_Report_${dayjs().format("YYYY-MM-DD")}.xlsx`);
  };

  return (
    <>
      <div className="flex justify-center space-x-1.5">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton as={Button} isIcon className="size-8 rounded-full">
            <EllipsisHorizontalIcon className="size-4.5" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <MenuItems
              anchor={{ to: "bottom end", gap: 12 }}
              className="dark:border-dark-500 dark:bg-dark-750 absolute z-100 w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none"
            >
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                    onClick={() =>
                      navigate(`/report/customers_report/${row.original?.id}`)
                    }
                  >
                    <span>{t("nav.report.view_report")}</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={exportRowToExcel}
                    className={clsx(
                      "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>{t("nav.export.export_excel")}</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>
  );
}

RowActions.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};
