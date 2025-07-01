// Import Dependencies
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Local Imports
import { Textarea, Button, Input, Upload } from "components/ui";
import { DatePicker } from "./form/Datepicker";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function PreturnModal({ type, row, isOpen, close }) {
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
    if (type === "edit") {
      const rowData = row.original;

      setData({
        date: dayjs(rowData?.timestamp).format("YYYY-MM-DD"),
        amount: Number(rowData?.amount),
        attachment: [],
        reference_no: rowData.reference_no,
        note: rowData.note || "",
      });
    } else {
      setData({
        date: dayjs().format("YYYY-MM-DD"),
        amount: 0,
        attachment: [],
        reference_no: "",
        note: "",
      });
    }
  }, [type, row.original]);

  const uploadRef = useRef();

  const filesList =
    data.attachment.length > 0
      ? data.attachment.map((file) => file.name).join(", ")
      : t("nav.return.choose_files");

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("amount", data.amount);
    formData.append("reference_no", data.reference_no);
    formData.append("note", data.note || "");

    if (type === "add") {
      formData.append("purchase_id", row.original?.id);
    } else {
      formData.append("purchase_id", row.original?.purchase_id);
    }

    if (type === "edit") {
      formData.append("id", row.original?.id);
    }

    data.attachment.forEach((file) => {
      formData.append("attachment", file);
    });

    try {
      const response = await fetch(
        `${API_URL}/api/preturn/${type === "add" ? "create" : "update"}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to upload");

      const result = await response.json();

      if (row?.refetch && typeof row.refetch === "function") {
        await row.refetch();
      }

      close();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
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
                  {t(
                    type === "add"
                      ? "nav.return.add_return"
                      : "nav.return.edit_return",
                  )}
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
                  <DatePicker
                    label={t("nav.return.date")}
                    value={data.date}
                    onChange={(date) =>
                      setData({
                        ...data,
                        date: dayjs(date).format("YYYY-MM-DD"),
                      })
                    }
                  />

                  <Input
                    placeholder={t("nav.return.reference_no")}
                    label={t("nav.return.reference_no")}
                    value={data.reference_no}
                    onChange={(e) =>
                      setData({ ...data, reference_no: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.payment.amount")}
                    label={t("nav.payment.amount")}
                    type="text"
                    value={data.amount.toLocaleString()}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, "");
                      setData({
                        ...data,
                        amount: rawValue ? Number(rawValue) : "",
                      });
                    }}
                  />

                  <Upload
                    name="file"
                    label={t("nav.return.attachments")}
                    onChange={(files) => {
                      setData({ ...data, attachment: [files] });
                    }}
                    ref={uploadRef}
                  >
                    {({ ...props }) => (
                      <>
                        <Input
                          component="button"
                          prefix={<PaperClipIcon className="size-5" />}
                          suffix={
                            data.attachment.length > 0 && (
                              <Button
                                variant="flat"
                                className="pointer-events-auto size-5 shrink-0 rounded-full p-0"
                                onClick={() => {
                                  uploadRef.current.value = "";
                                  setData({ ...data, attachment: [] });
                                }}
                              >
                                <XMarkIcon className="size-4" />
                              </Button>
                            )
                          }
                          title={filesList}
                          className="cursor-pointer truncate text-start"
                          {...props}
                        >
                          {filesList}
                        </Input>
                      </>
                    )}
                  </Upload>

                  <Textarea
                    placeholder={t("nav.return.note")}
                    label={t("nav.return.note")}
                    value={data.note}
                    onChange={(e) => {
                      setData({ ...data, note: e.target.value });
                    }}
                    rows="4"
                  />
                </div>
                <div className="mt-4 space-x-3 text-end">
                  <Button
                    onClick={close}
                    variant="outlined"
                    className="min-w-[7rem] rounded-full"
                  >
                    {t("nav.return.cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    ref={saveRef}
                    className="min-w-[7rem] rounded-full"
                  >
                    {loading ? t("nav.return.saving") : t("nav.return.save")}
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
