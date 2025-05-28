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
import { Button, Input } from "components/ui";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function CompanyModal({ type, row, isOpen, close }) {
  const { t } = useTranslation();
  const saveRef = useRef(null);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
  });

  useEffect(() => {
    if (type === "edit") {
      const rowData = row.original;

      setData({
        name: rowData?.name,
      });
    } else {
      setData({
        name: "",
      });
    }
  }, [type, row.original]);

  const handleSave = async () => {
    if (loading) return;

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.email && !emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);

    if (type === "edit") {
      formData.append("id", row.original?.id);
    }

    try {
      const response = await fetch(
        `${API_URL}/api/company/${type === "add" ? "create" : "update"}`,
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

      setData({
        name: "",
      });

      toast.success("Company saved successfully.");
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
                      ? "nav.company_fields.add_company"
                      : "nav.company_fields.edit_company",
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
                    placeholder={t("nav.company_fields.name")}
                    label={t("nav.company_fields.name")}
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
                <div className="mt-4 space-x-3 text-end">
                  <Button
                    onClick={close}
                    variant="outlined"
                    className="min-w-[7rem] rounded-full"
                  >
                    {t("nav.suppliers.cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    ref={saveRef}
                    className="min-w-[7rem] rounded-full"
                  >
                    {loading
                      ? t("nav.suppliers.saving")
                      : t("nav.suppliers.save")}
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
