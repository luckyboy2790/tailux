// Import Dependencies
import { ViewColumnsIcon, TrashIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

// Local Imports
import { TableSettings } from "components/shared/table/TableSettings";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useTranslation } from "react-i18next";
import { Button } from "components/ui";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmModal } from "components/shared/ConfirmModal";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function TableConfig({ table }) {
  const { smAndDown } = useBreakpointsContext();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const { t } = useTranslation();

  const confirmMessages = {
    pending: {
      description: t("nav.notification.confirmAllDelete.pending.description"),
    },
    success: {
      title: t("nav.notification.confirmAllDelete.success.title"),
    },
    failed: {
      title: t("nav.notification.confirmAllDelete.failed.title"),
    },
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const handleDeleteAllRows = async () => {
    setConfirmDeleteLoading(true);
    const response = await fetch(
      `${API_URL}/api/notification/delete_all_notifications`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      toast.error(t("nav.notification.confirmAllDelete.failed.title"));

      setConfirmDeleteLoading(false);

      closeModal();

      throw new Error("Something went wrong");
    }

    toast.success(t("nav.notification.confirmAllDelete.success.title"));

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
    <div className="flex items-center gap-2">
      <Button
        color="error"
        className="flex h-8 items-center justify-center gap-1"
        onClick={openModal}
      >
        <TrashIcon className="size-4" />
        <span>{t("nav.notification.delete_all")}</span>
      </Button>
      <ResponsiveFilter
        anchor={{ to: "bottom end", gap: 12 }}
        buttonContent={
          <>
            <ViewColumnsIcon className="size-4" />
            <span>{t("nav.view.view")}</span>
          </>
        }
        classNames={{
          button: "border-solid!",
        }}
      >
        {smAndDown ? (
          <div className="dark:border-dark-500 mx-auto flex h-12 w-full shrink-0 items-center justify-between border-b border-gray-200 px-3">
            <p className="dark:text-dark-50 truncate text-start text-base font-medium text-gray-800">
              {t("nav.view.table_view")}
            </p>
          </div>
        ) : (
          <h3 className="text-sm-plus dark:text-dark-100 px-3 pt-2.5 font-medium tracking-wide text-gray-800">
            {t("nav.view.table_view")}
          </h3>
        )}

        <div className="flex flex-col max-sm:overflow-hidden sm:w-64">
          <TableSettings table={table} />
        </div>
      </ResponsiveFilter>

      <ConfirmModal
        show={deleteModalOpen}
        onClose={closeModal}
        messages={confirmMessages}
        onOk={handleDeleteAllRows}
        confirmLoading={confirmDeleteLoading}
        state={state}
      />
    </div>
  );
}

TableConfig.propTypes = {
  table: PropTypes.object,
};
