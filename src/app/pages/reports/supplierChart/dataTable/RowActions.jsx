// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  // ArrowUpRightIcon,
  EllipsisHorizontalIcon,
  // EyeIcon,
  // PencilIcon,
  // TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

// Local Import
import { Button } from "components/ui";
import { useNavigate } from "react-router";

export function RowActions({ row }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const exportRowToExcel = () => {
    if (!row) return;

    const rowData = row.original;
    if (!rowData) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    worksheet.columns = [
      { header: "Company", key: "company", width: 25 },
      { header: "Name", key: "name", width: 20 },
      { header: "Phone Number", key: "phone_number", width: 18 },
      { header: "Email", key: "email", width: 25 },
      { header: "Total Sales", key: "total_sales", width: 15 },
      { header: "Total Amount", key: "total_amount", width: 15 },
      { header: "Paid", key: "paid", width: 15 },
      { header: "Balance", key: "balance", width: 15 },
    ];

    worksheet.addRow({
      company: rowData.company || "",
      name: rowData.name || "",
      phone_number: rowData.phone_number || "",
      email: rowData.email || "",
      total_sales: rowData.total_sales || 0,
      total_amount: rowData.total_amount || 0,
      paid: rowData.paid_amount || 0,
      balance: (rowData.total_amount || 0) - (rowData.paid_amount || 0),
    });

    worksheet.getRow(1).font = { bold: true };

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `Supplier_Report_${dayjs().format("YYYY-MM-DD")}.xlsx`);
    });
  };

  return (
    <>
      <div className="flex justify-center space-x-1.5">
        {/* <Button
          isIcon
          className="size-8 rounded-full"
          onClick={() => openDrawer()}
        >
          <ArrowUpRightIcon className="size-4" />
        </Button> */}

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
                      navigate(`/report/suppliers_report/${row.original?.id}`)
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
