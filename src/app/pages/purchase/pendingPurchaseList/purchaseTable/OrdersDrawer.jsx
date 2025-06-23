// Import Dependencies
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";

// Local Imports
import {
  // Avatar,
  Badge,
  Button,
  Table,
  // Tag,
  THead,
  TBody,
  Th,
  Tr,
  Td,
} from "components/ui";
import { getOrderStatusOptions } from "./data";
import { useLocaleContext } from "app/contexts/locale/context";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

const cols = [
  "#",
  "Product Code",
  "Product Name",
  "Product Cost",
  "Quantity",
  "Total",
];

const paymentCols = ["#", "Date", "Reference No", "Amount", "Note"];

export function OrdersDrawer({ isOpen, close, row, table }) {
  let orderStatus;

  const { t } = useTranslation();

  const orderStatusOptions = getOrderStatusOptions(t);

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [confirmApproveLoading, setConfirmApproveLoading] = useState(false);

  const [approveSuccess, setApproveSuccess] = useState(false);
  const [approveError, setApproveError] = useState(false);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const approveConfirmMessages = {
    pending: {
      description: t("nav.purchase.confirmApprove.pending.description"),
      actionText: t("nav.purchase.confirmApprove.pending.actionText"),
    },
    success: {
      title: t("nav.purchase.confirmApprove.success.title"),
    },
  };

  const val = row.original;

  if (val?.paid_amount < val?.grand_total) {
    orderStatus = "pending";
  } else if (val?.paid_amount === 0) {
    orderStatus = "partial";
  } else {
    orderStatus = "paid";
  }

  const statusOption = orderStatusOptions.find(
    (item) => item.value === orderStatus,
  );

  const { locale } = useLocaleContext();
  const timestapms = row.original.timestamp;
  const date = dayjs(timestapms).locale(locale).format("DD MMM YYYY");

  const sums = row.original?.orders.reduce(
    (acc, order) => {
      acc.subtotal += order.subtotal || 0;
      acc.quantity += order.quantity || 0;
      return acc;
    },
    { subtotal: 0, quantity: 0 },
  );

  const openApproveModal = () => {
    setApproveModalOpen(true);
    setApproveError(false);
    setApproveSuccess(false);
  };

  const closeApproveModal = () => {
    setApproveModalOpen(false);
  };

  const approveState = approveError
    ? "error"
    : approveSuccess
      ? "success"
      : "pending";

  const handleApprove = async () => {
    try {
      setConfirmApproveLoading(true);

      const response = await fetch(
        `${API_URL}/api/purchase/approve/${row.original?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        toast.error(t("nav.purchase.confirmApprove.failed.title"));

        setConfirmApproveLoading(false);

        closeApproveModal();

        throw new Error("Something went wrong");
      }

      toast.success(t("nav.purchase.confirmApprove.success.title"));

      setApproveSuccess(true);
      setConfirmApproveLoading(false);

      closeApproveModal();

      close();

      if (typeof table.options.meta?.refetch === "function") {
        await table.options.meta.refetch();
      } else {
        console.warn("Refetch function not available in table meta.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={close}>
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
        />

        <TransitionChild
          as={DialogPanel}
          enter="ease-out transform-gpu transition-transform duration-200"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in transform-gpu transition-transform duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-3xl transform-gpu flex-col overflow-y-scroll bg-white py-4 transition-transform duration-200"
        >
          <div className="mb-5 flex w-full justify-between px-4 sm:px-5">
            <Button color="primary" onClick={openApproveModal}>
              {t("nav.payment.approve")}
            </Button>
          </div>

          <div className="flex justify-between px-4 sm:px-5">
            <div>
              <div className="font-semibold">
                {t("nav.detail.reference_no")}:
              </div>
              <div className="text-primary-600 dark:text-primary-400 text-xl font-medium">
                {row.original.reference_no} &nbsp;
              </div>
              <p className="font-medium">{date}</p>
            </div>

            <Button
              onClick={close}
              variant="flat"
              isIcon
              className="size-6 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
            >
              <XMarkIcon className="size-4.5" />
            </Button>
          </div>

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.supplier")}:
              </div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original.supplier.name}
              </div>
            </div>
            <div className="text-end">
              <div className="font-semibold">{t("nav.detail.email")}:</div>
              <div className="mt-1.5">
                <p className="font-medium">{row.original?.supplier.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.company")}:
              </div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original.supplier.company}
              </div>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />
          <div className="flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.purchase.status")}:
              </div>
              <Badge
                className="mt-1.5 align-text-bottom"
                color={statusOption.color}
              >
                {statusOption.label}
              </Badge>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.store")}:
              </div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original?.store.name}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1.5 text-end font-semibold">
                {t("nav.detail.company")}:
              </div>

              <div className="dark:text-dark-50 mt-1.5 text-gray-800">
                {row.original?.store.company.name}
              </div>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex w-full flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.attachments")}:
              </div>

              <div className="flex w-full gap-4 overflow-x-auto">
                {row.original?.images.map((item, key) => (
                  <div className="w-25" key={key}>
                    <Image
                      width={100}
                      height={100}
                      src={`${IMG_URL}${item.path}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <p className="dark:text-dark-100 px-4 font-medium text-gray-800 sm:px-5">
            {t("nav.detail.order_item")}
          </p>

          <div className="mt-1 h-auto min-h-90 overflow-x-auto overscroll-x-contain px-4 sm:px-5">
            <Table
              hoverable
              className="text-xs-plus w-full text-left rtl:text-right [&_.table-td]:py-2"
            >
              <THead>
                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  {cols.map((title, index) => (
                    <Th
                      key={index}
                      className="dark:text-dark-100 py-2 font-semibold text-gray-800 uppercase first:px-0 last:px-0"
                    >
                      {title}
                    </Th>
                  ))}
                </Tr>
              </THead>
              <TBody>
                {row.original.orders.map((tr, index) => (
                  <Tr
                    key={tr.id}
                    className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
                  >
                    <Td className="px-0 font-medium ltr:rounded-l-lg rtl:rounded-r-lg">
                      {index + 1}
                    </Td>
                    <Td>{tr?.product_id}</Td>
                    <Td>{tr?.product_name}</Td>
                    <Td>{tr?.cost}</Td>
                    <Td>{tr?.quantity}</Td>
                    <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                      {tr.subtotal.toLocaleString()}
                    </Td>
                  </Tr>
                ))}

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={4} className="text-end">
                    {t("nav.detail.total_cop")}
                  </Td>
                  <Td>{sums.quantity.toLocaleString()}</Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {sums.subtotal.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.discount")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.discount.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.shipping")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.shipping.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.returns")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {(row.original?.returned_amount || 0).toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.total_amount")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {(
                      Number(row.original?.total_amount) -
                      Number(row.original?.discount) +
                      Number(row.original?.shipping)
                    ).toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.paid")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {Number(row.original?.paid_amount).toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    {t("nav.detail.balance")}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {(
                      Number(row.original?.total_amount) -
                      Number(row.original?.discount) +
                      Number(row.original?.shipping) -
                      Number(row.original?.paid_amount)
                    ).toLocaleString()}
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <p className="dark:text-dark-100 px-4 font-medium text-gray-800 sm:px-5">
            {t("nav.detail.payment_list")}
          </p>

          <div className="mt-1 h-auto min-h-50 overflow-x-auto overscroll-x-contain px-4 sm:px-5">
            <Table
              hoverable
              className="text-xs-plus w-full text-left rtl:text-right [&_.table-td]:py-2"
            >
              <THead>
                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  {paymentCols.map((title, index) => (
                    <Th
                      key={index}
                      className="dark:text-dark-100 py-2 font-semibold text-gray-800 uppercase first:px-0 last:px-0"
                    >
                      {title}
                    </Th>
                  ))}
                </Tr>
              </THead>
              <TBody>
                {row.original.payments.map((tr, index) => (
                  <Tr
                    key={tr.id}
                    className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
                  >
                    <Td className="px-0 font-medium ltr:rounded-l-lg rtl:rounded-r-lg">
                      {index + 1}
                    </Td>
                    <Td>
                      {dayjs(tr?.timestamp)
                        .locale(locale)
                        .format("DD MMM YYYY")}
                    </Td>
                    <Td>{tr?.reference_no}</Td>
                    <Td>{tr?.amount.toLocaleString()}</Td>
                    <Td>{tr?.note || ""}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">Created By:</div>

              <div className="dark:text-dark-50 mt-1.5 text-gray-800">
                {row.original?.user_username}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1.5 text-end font-semibold">Created At:</div>

              <div className="dark:text-dark-50 mt-1.5 text-gray-800">
                {dayjs(row.original?.created_at)
                  .locale(locale)
                  .format("DD MMM YYYY")}
              </div>
            </div>
          </div>

          <div className="mt-5 flex w-full justify-between px-4 sm:px-5">
            <Button color="primary" onClick={openApproveModal}>
              {t("nav.payment.approve")}
            </Button>
          </div>
        </TransitionChild>
      </Dialog>

      <ConfirmModal
        show={approveModalOpen}
        onClose={closeApproveModal}
        messages={approveConfirmMessages}
        onOk={handleApprove}
        confirmLoading={confirmApproveLoading}
        state={approveState}
      />
    </Transition>
  );
}

OrdersDrawer.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  row: PropTypes.object,
};
