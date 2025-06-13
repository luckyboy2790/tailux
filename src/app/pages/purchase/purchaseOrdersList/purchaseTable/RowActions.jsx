// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArrowUpRightIcon,
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
import { OrdersDrawer } from "./OrdersDrawer";
import { useDisclosure } from "hooks";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
// import { useCookies } from "react-cookie";
import { toast } from "sonner";

// const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function RowActions({ row, table }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const navigate = useNavigate();

  // const [cookies] = useCookies(["authToken"]);

  // const token = cookies.authToken;

  const { t } = useTranslation();

  const confirmMessages = {
    pending: {
      description: t(
        "nav.purchase.confirmPurchaseOrderDelete.pending.description",
      ),
    },
    success: {
      title: t("nav.purchase.confirmPurchaseOrderDelete.success.title"),
    },
  };

  const [isDrawerOpen, { close: closeDrawer, open: openDrawer }] =
    useDisclosure(false);

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };

  const handleDeleteRows = async () => {
    setConfirmDeleteLoading(true);
    console.log(row.original);

    if (Number(row.original?.received_amount) > 0) {
      toast.error(
        t("nav.purchase.confirmPurchaseOrderDelete.failed.impossible_delete"),
      );

      setDeleteSuccess(true);
      setConfirmDeleteLoading(false);

      closeModal();

      return;
    }

    // const response = await fetch(
    //   `${API_URL}/api/purchase_order/delete/${row.original?.id}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );

    // if (!response.ok) {
    //   toast.error(t("nav.purchase.confirmPurchaseOrderDelete.failed.title"));

    //   setConfirmDeleteLoading(false);

    //   closeModal();

    //   throw new Error("Something went wrong");
    // }

    toast.success(t("nav.purchase.confirmPurchaseOrderDelete.success.title"));

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
        <Button
          isIcon
          className="size-8 rounded-full"
          onClick={() => openDrawer()}
        >
          <ArrowUpRightIcon className="size-4" />
        </Button>

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
                    onClick={() => {
                      navigate(`/purchase-order/receive/${row.original?.id}`);
                    }}
                  >
                    <span>Receive</span>
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
                    onClick={() => {
                      navigate(`/purchase-order/edit/${row.original?.id}`);
                    }}
                  >
                    <span>Edit</span>
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
                    <span>Delete</span>
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

      <OrdersDrawer row={row} close={closeDrawer} isOpen={isDrawerOpen} />
    </>
  );
}

RowActions.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};
