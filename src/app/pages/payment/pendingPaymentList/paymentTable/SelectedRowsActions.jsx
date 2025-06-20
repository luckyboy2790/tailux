// Import Dependencies
import { Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// Local Imports
import { Button, GhostSpinner } from "components/ui";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function SelectedRowsActions({ table }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { t } = useTranslation();

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const selectedRows = table.getSelectedRowModel().rows;

  const handleDeleteRows = async () => {
    if (selectedRows.length > 0) {
      setDeleteLoading(true);
      await Promise.all(
        selectedRows.map((row) =>
          fetch(`${API_URL}/api/payment/delete/${row.original?.id}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );

      toast.success(t("nav.payment.confirmDelete.success.title"));
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
