// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  ArrowUpTrayIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { CiViewTable } from "react-icons/ci";
import PropTypes from "prop-types";

// Local Imports
import { Button, GhostSpinner } from "components/ui";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function SelectedRowsActions({ table }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const selectedRows = table.getSelectedRowModel().rows;

  const [cookies] = useCookies(["authToken"]);

  const { t } = useTranslation();

  const token = cookies.authToken;

  const handleDeleteRows = async () => {
    if (selectedRows.length > 0) {
      setDeleteLoading(true);
      await Promise.all(
        selectedRows.map((row) =>
          fetch(`${API_URL}/api/purchase_order/delete/${row.original?.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );

      toast.success(t("nav.purchase.confirmPurchaseOrderDelete.success.title"));
      setDeleteLoading(false);

      if (typeof table.options.meta?.refetch === "function") {
        await table.options.meta.refetch();
      } else {
        console.warn("Refetch function not available in table meta.");
      }
    }
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
              <span>{selectedRows.length} Selected</span>
              <span className="max-sm:hidden">
                {" "}
                from {table.getCoreRowModel().rows.length}
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
                <span className="max-sm:hidden">Delete</span>
              </Button>
              <Button className="text-xs-plus w-7 space-x-1.5 rounded-full px-3 py-1.5 sm:w-auto sm:rounded-sm">
                <PrinterIcon className="size-4 shrink-0" />
                <span className="max-sm:hidden">Print</span>
              </Button>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton
                  as={Button}
                  className="text-xs-plus w-7 gap-1.5 rounded-full px-3 py-1.5 sm:w-auto sm:rounded-sm"
                >
                  <EllipsisHorizontalIcon className="size-4 shrink-0" />
                  <span className="max-sm:hidden"> More</span>{" "}
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
                      >
                        <ArrowUpTrayIcon className="size-4.5" />
                        <span>Export CVS</span>
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
                      >
                        <ArrowUpTrayIcon className="size-4.5" />
                        <span>Export PDF</span>
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
                      >
                        <CiViewTable className="size-4.5" />
                        <span>Save as view</span>
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
