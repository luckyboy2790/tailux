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
import { useTranslation } from "react-i18next";

// Local Imports
import { Badge, Button, Table, THead, TBody, Th, Tr, Td } from "components/ui";
import { orderStatusOptions } from "./data";
import { useLocaleContext } from "app/contexts/locale/context";
import { Image } from "antd";

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

export function OrdersDrawer({ isOpen, close, row }) {
  const { t } = useTranslation();
  const { locale } = useLocaleContext();

  const val = row.original;
  const orderStatus =
    Number(val?.received_amount) === 0 ? "pending" : "partial";
  const statusOption = orderStatusOptions.find(
    (item) => item.value === orderStatus,
  );
  const date = dayjs(row.original.timestamp)
    .locale(locale)
    .format("DD MMM YYYY");

  const cols = [
    "#",
    t("nav.purchase.product_name"),
    t("nav.purchase.product_cost"),
    t("nav.purchase.discount"),
    t("nav.purchase.quantity"),
    t("nav.purchase.image"),
    t("nav.purchase.category"),
    t("nav.purchase.sub_total"),
  ];

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
          <div className="flex justify-between px-4 sm:px-5">
            <div>
              <div className="font-semibold">
                {t("nav.detail.reference_no")}:
              </div>
              <div className="text-primary-600 dark:text-primary-400 text-xl font-medium">
                {val.reference_no} &nbsp;
                <Badge className="align-text-bottom" color={statusOption.color}>
                  {t(`nav.detail.${statusOption.label.toLowerCase()}`)}
                </Badge>
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
                {val.supplier.name}
              </div>
            </div>
            <div className="text-end">
              <div className="font-semibold">{t("nav.detail.email")}:</div>
              <div className="mt-1.5 font-medium">{val.supplier.email}</div>
            </div>
          </div>

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.company")}:
              </div>
              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {val.supplier.company_name}
              </div>
            </div>
          </div>

          <hr className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5" />

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">
                {t("nav.detail.attachments")}:
              </div>
              <div className="flex w-full gap-4 overflow-x-auto">
                {val?.attachments?.map((item, key) => (
                  <div className="w-25" key={key}>
                    <Image width={100} height={100} src={`${IMG_URL}${item}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5" />

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
                {val.orders.map((tr, index) => (
                  <Tr
                    key={tr.id}
                    className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
                  >
                    <Td className="px-0 font-medium ltr:rounded-l-lg rtl:rounded-r-lg">
                      {index + 1}
                    </Td>
                    <Td>{tr?.product}</Td>
                    <Td>{Number(tr?.cost || 0).toLocaleString()}</Td>
                    <Td>
                      {String(tr?.discount_string || "").includes("%")
                        ? tr?.discount_string
                        : Number(tr?.discount_string || 0).toLocaleString()}
                    </Td>
                    <Td>{Number(tr?.quantity || 0).toLocaleString()}</Td>
                    <Td>
                      <div className="gap-2">
                        {tr?.images.length &&
                          tr?.images.map((item, key) => (
                            <Image
                              key={key}
                              width={30}
                              height={30}
                              src={`${IMG_URL}${item}`}
                            />
                          ))}
                      </div>
                    </Td>
                    <Td>{tr?.category?.name}</Td>
                    <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                      {tr?.discount_string.includes("%")
                        ? Number(
                            (
                              tr?.cost -
                              tr?.cost *
                                (Number(tr?.discount_string.replace("%", "")) /
                                  100)
                            ).toFixed() * Number(tr?.quantity),
                          ).toLocaleString()
                        : Number(
                            (tr?.cost - Number(tr?.discount_string)).toFixed() *
                              Number(tr?.quantity),
                          ).toLocaleString()}
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td colSpan={4} className="text-end font-semibold">
                    {t("nav.detail.total_amount")}:
                  </Td>
                  <Td colSpan={3}>
                    {val.orders
                      .reduce((sum, tr) => sum + Number(tr?.quantity), 0)
                      .toLocaleString()}
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {val.orders
                      .reduce((sum, tr) => {
                        const discountValue = tr?.discount_string.includes("%")
                          ? tr?.cost *
                            (Number(tr?.discount_string.replace("%", "")) / 100)
                          : Number(tr?.discount_string);
                        return (
                          sum +
                          (tr?.cost - discountValue).toFixed() * tr?.quantity
                        );
                      }, 0)
                      .toLocaleString()}
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>

          <hr className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5" />

          <div className="mt-3 flex w-full justify-end px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 text-end font-semibold">
                {t("nav.detail.created_at")}
              </div>
              <div className="dark:text-dark-50 mt-1.5 text-gray-800">
                {dayjs(val?.created_at).locale(locale).format("DD MMM YYYY")}
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}

OrdersDrawer.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  row: PropTypes.object,
};
