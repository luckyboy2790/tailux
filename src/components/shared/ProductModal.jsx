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
import { Button, Input, Upload } from "components/ui";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function ProductModal({ type, row, isOpen, close }) {
  const { t } = useTranslation();
  const saveRef = useRef(null);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    product_name: "",
    product_code: "",
    product_unit: "",
    product_cost: 0,
    product_price: 0,
    quantity: 0,
    alert_quantity: 0,
    attachment: [],
  });

  useEffect(() => {
    if (type === "edit") {
      const rowData = row.original;

      setData({
        product_name: rowData?.name,
        product_code: rowData?.code,
        product_unit: rowData?.unit,
        product_cost: Number(rowData?.cost),
        product_price: Number(rowData?.price),
        quantity: Number(rowData?.quantity),
        alert_quantity: Number(rowData?.alert_quantity),
        attachment: [],
      });
    } else {
      setData({
        product_name: "",
        product_code: "",
        product_unit: "",
        product_cost: 0,
        product_price: 0,
        quantity: 0,
        alert_quantity: 0,
        attachment: [],
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
    formData.append("product_name", data.product_name);
    formData.append("product_code", data.product_code);
    formData.append("product_unit", data.product_unit);
    formData.append("product_cost", data.product_cost);
    formData.append("product_price", data.product_price);
    formData.append("alert_quantity", data.alert_quantity);

    if (type === "edit") {
      formData.append("id", row.original?.id);
    }

    data.attachment.forEach((file) => {
      formData.append("attachment", file);
    });

    try {
      const response = await fetch(
        `${API_URL}/api/product/${type === "add" ? "create" : "update"}`,
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
      console.log("Upload success:", result);

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
                      ? "nav.product.add_product"
                      : "nav.product.edit_product",
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
                  <Input
                    placeholder={t("nav.product.product_name")}
                    label={t("nav.product.product_name")}
                    value={data.product_name}
                    onChange={(e) =>
                      setData({ ...data, product_name: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.product.product_code")}
                    label={t("nav.product.product_code")}
                    value={data.product_code}
                    onChange={(e) =>
                      setData({ ...data, product_code: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.product.product_unit")}
                    label={t("nav.product.product_unit")}
                    value={data.product_unit}
                    onChange={(e) =>
                      setData({ ...data, product_unit: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.product.product_cost")}
                    label={t("nav.product.product_cost")}
                    type="text"
                    value={data.product_cost.toLocaleString()}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, "");
                      setData({
                        ...data,
                        product_cost: rawValue ? Number(rawValue) : "",
                      });
                    }}
                  />

                  <Input
                    placeholder={t("nav.product.product_price")}
                    label={t("nav.product.product_price")}
                    type="text"
                    value={data.product_price.toLocaleString()}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, "");
                      setData({
                        ...data,
                        product_price: rawValue ? Number(rawValue) : "",
                      });
                    }}
                  />

                  <Input
                    placeholder={t("nav.product.alert_quantity")}
                    label={t("nav.product.alert_quantity")}
                    value={data.alert_quantity}
                    type="text"
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, "");
                      setData({
                        ...data,
                        alert_quantity: rawValue ? Number(rawValue) : "",
                      });
                    }}
                  />

                  <Upload
                    name="file"
                    label={t("nav.payment.attachments")}
                    onChange={(files) => {
                      setData({ ...data, attachment: files });
                    }}
                    multiple
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
                </div>
                <div className="mt-4 space-x-3 text-end">
                  <Button
                    onClick={close}
                    variant="outlined"
                    className="min-w-[7rem] rounded-full"
                  >
                    {t("nav.product.cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    ref={saveRef}
                    className="min-w-[7rem] rounded-full"
                  >
                    {loading ? t("nav.product.saving") : t("nav.product.save")}
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
