// Import Dependencies
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Local Imports
import { Button } from "components/ui";
import dayjs from "dayjs";
import { Image } from "antd";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

export function ApprovePaymentModal({
  type,
  paymentType,
  row,
  isOpen,
  close,
  table,
}) {
  const { t } = useTranslation();
  const saveRef = useRef(null);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    date: "",
    amount: 0,
    attachment: [],
    reference_no: "",
  });

  useEffect(() => {
    const rowData = row.original;

    setLoading(false);

    setData({
      date: dayjs(rowData?.timestamp).format("YYYY-MM-DD"),
      amount: Number(rowData?.amount),
      attachment: rowData.images || [],
      reference_no: rowData.reference_no,
      note: rowData.note || "",
    });
  }, [type, row.original, paymentType]);

  const handleApprove = async (item) => {
    try {
      if (Number(item.status) === 1) {
        toast.success(t("nav.payment.confirmApprove.success.title"));
      } else {
        const response = await fetch(
          `${API_URL}/api/payment/approve/${row.original?.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          toast.error(result.error);

          return;
        }

        toast.success(t("nav.payment.confirmApprove.success.title"));

        if (typeof table.options.meta?.refetch === "function") {
          await table.options.meta.refetch();
        } else {
          console.warn("Refetch function not available in table meta.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={close}
          initialFocus={saveRef}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/30" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="dark:bg-dark-700 relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white transition-all duration-300">
              <div className="dark:bg-dark-800 flex items-center justify-between rounded-t-lg bg-gray-200 px-4 py-3 sm:px-5">
                <DialogTitle
                  as="h3"
                  className="dark:text-dark-100 text-base font-medium text-gray-800"
                >
                  {t("nav.table_fields.approve")} {t("nav.payment.payment")}
                </DialogTitle>
                <Button
                  onClick={close}
                  variant="flat"
                  isIcon
                  className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                >
                  <XMarkIcon className="size-4.5" />
                </Button>
              </div>

              <div className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5">
                <div className="mt-4 space-y-5">
                  <div className="flex items-center justify-start gap-2">
                    <div className="font-semibold">Date:</div>

                    <div className="dark:text-dark-50 text-lg font-medium text-gray-800">
                      {data.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="font-semibold">Reference No:</div>

                    <div className="dark:text-dark-50 text-lg font-medium text-gray-800">
                      {data.reference_no}
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="font-semibold">Amount:</div>

                    <div className="dark:text-dark-50 text-lg font-medium text-gray-800">
                      {data.amount}
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="font-semibold">Attachment:</div>

                    <div className="dark:text-dark-50 text-lg font-medium text-gray-800">
                      {data.attachment?.map((item, key) => (
                        <Image
                          key={key}
                          width={80}
                          height={80}
                          src={IMG_URL + item.path}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-2">
                    <div className="font-semibold">Note:</div>

                    <div className="dark:text-dark-50 text-lg font-medium text-gray-800">
                      {data.note}
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-x-3 text-end">
                  <Button
                    onClick={close}
                    variant="outlined"
                    className="min-w-[7rem] rounded-full"
                  >
                    {t("nav.payment.cancel")}
                  </Button>
                  <Button
                    color="primary"
                    ref={saveRef}
                    className="min-w-[7rem] rounded-full"
                    onClick={() => handleApprove(row.original)}
                  >
                    {loading
                      ? `${t("nav.payment.approving")}...`
                      : t("nav.payment.approve")}
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
