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
import { orderStatusOptions } from "./data";
import { useLocaleContext } from "app/contexts/locale/context";
import { Image } from "antd";

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

export function OrdersDrawer({ isOpen, close, row }) {
  let orderStatus;

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
          className="dark:bg-dark-700 fixed top-0 right-0 flex h-full w-full max-w-xl transform-gpu flex-col overflow-y-scroll bg-white py-4 transition-transform duration-200"
        >
          <div className="flex justify-between px-4 sm:px-5">
            <div>
              <div className="font-semibold">Reference NO:</div>
              <div className="text-primary-600 dark:text-primary-400 text-xl font-medium">
                {row.original.reference_no} &nbsp;
                <Badge className="align-text-bottom" color={statusOption.color}>
                  {statusOption.label}
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
              <div className="mb-1.5 font-semibold">supplier:</div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original.supplier.name}
              </div>
            </div>
            <div className="text-end">
              <div className="font-semibold">Email:</div>
              <div className="mt-1.5">
                <p className="font-medium">{row.original?.supplier.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">company:</div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original.supplier.company}
              </div>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <div className="mt-3 flex w-full justify-between px-4 sm:px-5">
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">Store:</div>

              <div className="dark:text-dark-50 mt-1.5 text-lg font-medium text-gray-800">
                {row.original?.store.name}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1.5 text-end font-semibold">Company:</div>

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
            <div className="flex flex-col">
              <div className="mb-1.5 font-semibold">Attachments:</div>

              <div>
                {row.original?.images.map((item, key) => (
                  <Image key={key} width={100} height={100} src={item.path} />
                ))}
              </div>
            </div>
          </div>

          <hr
            className="border-gray-150 dark:border-dark-500 mx-4 my-4 h-px sm:mx-5"
            role="none"
          />

          <p className="dark:text-dark-100 px-4 font-medium text-gray-800 sm:px-5">
            Order Items
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
                    Total (COP)
                  </Td>
                  <Td>{sums.quantity.toLocaleString()}</Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {sums.subtotal.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Discount (COP)
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.discount.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Shipping (COP)
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.shipping.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Returns
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.returns.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Total Amount (COP)
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {row.original?.total_amount.toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Paid (COP)
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {Number(row.original?.paid_amount).toLocaleString()}
                  </Td>
                </Tr>

                <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
                  <Td colSpan={5} className="text-end">
                    Balance (COP)
                  </Td>
                  <Td className="dark:text-dark-100 px-0 font-medium text-gray-800 ltr:rounded-r-lg rtl:rounded-l-lg">
                    {(
                      row.original?.total_amount - row.original?.paid_amount
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
            Payment List
          </p>

          <div className="mt-1 h-auto min-h-30 overflow-x-auto overscroll-x-contain px-4 sm:px-5">
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
