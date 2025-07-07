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
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "hooks";
import { toast } from "sonner";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { SupplierModal } from "components/shared/SupplierModal";
// import { OrdersDrawer } from "./OrdersDrawer";
// import { useDisclosure } from "hooks";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function RowActions({ row, table }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const { t } = useTranslation();

  const confirmMessages = {
    pending: {
      description: t("nav.supplier.confirmDelete.pending.description"),
    },
    success: {
      title: t("nav.supplier.confirmDelete.success.title"),
    },
  };

  const [isOpen, { open, close }] = useDisclosure(false);

  // const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] =
  //   useDisclosure(false);

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };

  const exportRowToExcel = () => {
    if (!row) return;

    const rowData = row.original;
    if (!rowData) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Define columns (header and key)
    worksheet.columns = [
      { header: "Company", key: "company", width: 25 },
      { header: "Name", key: "name", width: 20 },
      { header: "Phone Number", key: "phone_number", width: 18 },
      { header: "Email", key: "email", width: 25 },
      { header: "City", key: "city", width: 15 },
      { header: "Address", key: "address", width: 30 },
    ];

    // Add one row of data
    worksheet.addRow({
      company: rowData.company || "",
      name: rowData.name || "",
      phone_number: rowData.phone_number || "",
      email: rowData.email || "",
      city: rowData.city || "",
      address: rowData.address || "",
    });

    // Style header row
    worksheet.getRow(1).font = { bold: true };

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `Supplier_Report_${dayjs().format("YYYY-MM-DD")}.xlsx`);
    });
  };

  const handleDeleteRows = async () => {
    setConfirmDeleteLoading(true);
    const response = await fetch(
      `${API_URL}/api/supplier/delete/${row.original?.id}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      toast.error(t("nav.supplier.confirmDelete.failed.title"));

      setConfirmDeleteLoading(false);

      closeModal();

      throw new Error("Something went wrong");
    }

    toast.success(t("nav.supplier.confirmDelete.success.title"));

    setDeleteSuccess(true);
    setConfirmDeleteLoading(false);

    closeModal();

    if (typeof table.options.meta?.refetch === "function") {
      await table.options.meta.refetch();
    } else {
      console.warn("Refetch function not available in table meta.");
    }
  };

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

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
                    onClick={exportRowToExcel}
                  >
                    <span>{t("nav.export.export")}</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                    onClick={open}
                  >
                    <span>{t("nav.table_fields.edit")}</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={openModal}
                    className={clsx(
                      "this:error text-this dark:text-this-light flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus && "bg-this/10 dark:bg-this-light/10",
                    )}
                  >
                    <span>{t("nav.table_fields.delete")}</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <ConfirmModal
        show={deleteModalOpen}
        onClose={closeModal}
        messages={confirmMessages}
        onOk={handleDeleteRows}
        confirmLoading={confirmDeleteLoading}
        state={state}
      />

      <SupplierModal
        type={"edit"}
        row={{ ...row, refetch: table.options.meta.refetch }}
        isOpen={isOpen}
        close={close}
      />

      {/* <OrdersDrawer row={row} close={closeDrawer} isOpen={isDrawerOpen} /> */}
    </>
  );
}

RowActions.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};
