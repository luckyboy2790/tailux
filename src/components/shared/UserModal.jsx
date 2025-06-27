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
import { Button, Input, Select } from "components/ui";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from "hooks";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function UserModal({ type, row, isOpen, close }) {
  const { t } = useTranslation();
  const saveRef = useRef(null);

  const [show, { toggle }] = useDisclosure();
  const [confirmshow, { toggle: toggleConfirm }] = useDisclosure();

  const roleSelect = [
    { value: "admin", label: t("nav.user.admin") },
    { value: "user", label: t("nav.user.user") },
    { value: "buyer", label: t("nav.user.buyer") },
    { value: "secretary", label: t("nav.user.secretary") },
  ];

  const activeSelect = [
    { value: "1", label: t("nav.user.active") },
    { value: "0", label: t("nav.user.inactive") },
  ];

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState([]);

  const [data, setData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    ip_address: "",
    role: "",
    email: "",
    company: "",
    password: "",
    confirm: "",
    enable_google2fa: "",
  });

  useEffect(() => {
    if (type === "edit") {
      const rowData = row.original;

      setData({
        username: rowData?.username,
        first_name: rowData?.first_name,
        last_name: rowData?.last_name,
        phone_number: rowData?.phone_number,
        ip_address: rowData?.ip_address,
        role: rowData?.role,
        email: rowData?.email,
        company: rowData?.company_id,
        enable_google2fa: rowData?.enable_google2fa === 1 ? "1" : "0",
      });
    } else {
      setData({
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        ip_address: "",
        role: "admin",
        email: "",
        company: "",
        enable_google2fa: "1",
      });
    }
  }, [type, row.original]);

  useEffect(() => {
    const fetchData = async () => {
      const companyResponse = await fetch(
        `${API_URL}/api/company/get_all_company`,
      );

      const companyResult = await companyResponse.json();

      const companyData = [
        {
          key: -1,
          value: "",
          label: "All Companies",
          disabled: false,
        },
        ...(Array.isArray(companyResult?.data) ? companyResult.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.name,
            disabled: false,
          }),
        ),
      ];

      setCompany(companyData);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (loading) return;

    if (data.password && data.confirm) {
      if (data.password !== data.confirm) {
        toast.error("Passwords do not match.");
        return;
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;
      if (!passwordPattern.test(data.password)) {
        toast.error(
          "Password must include uppercase, lowercase, and special character.",
        );
        return;
      }
    }

    if (type === "add") {
      if (!data.password) {
        toast.error("Password is required.");
        return;
      }
    }

    if (!data.phone_number) {
      toast.error("Phone number is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone_number", data.phone_number);
    formData.append("ip_address", data.ip_address);
    formData.append("role", data.role);
    formData.append("company_id", data.company);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("enable_google2fa", data.enable_google2fa);

    if (type === "edit") {
      formData.append("id", row.original?.id);
    }

    try {
      const response = await fetch(
        `${API_URL}/api/users/${type === "add" ? "create" : "update"}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result?.error);

      if (row?.refetch && typeof row.refetch === "function") {
        await row.refetch();
      }

      close();

      setData({
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        ip_address: "",
        role: "admin",
        email: "",
        company: "",
        enable_google2fa: "1",
        password: "",
        confirm: "",
      });

      toast.success("User saved successfully.");
    } catch (error) {
      console.log(String(error)?.split(": "));

      toast.error(String(error)?.split(": ")?.[1]);
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
                      ? "nav.suppliers.add_supplier"
                      : "nav.suppliers.edit_supplier",
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
                    placeholder={t("nav.user.username")}
                    label={t("nav.user.username")}
                    value={data.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.user.first_name")}
                    label={t("nav.user.first_name")}
                    value={data.first_name}
                    onChange={(e) =>
                      setData({ ...data, first_name: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.user.last_name")}
                    label={t("nav.user.last_name")}
                    value={data.last_name}
                    onChange={(e) =>
                      setData({ ...data, last_name: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.user.email")}
                    label={t("nav.user.email")}
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.user.phone_number")}
                    label={t("nav.user.phone_number")}
                    value={data.phone_number}
                    onChange={(e) =>
                      setData({ ...data, phone_number: e.target.value })
                    }
                  />

                  <Select
                    data={roleSelect}
                    label={t("nav.user.role")}
                    placeholder={t("nav.user.role")}
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                  />

                  <Select
                    data={company}
                    label={t("nav.user.company_name")}
                    placeholder={t("nav.user.company_name")}
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                  />

                  <Select
                    data={activeSelect}
                    label={t("nav.user.enable_google2fa")}
                    placeholder={t("nav.user.enable_google2fa")}
                    value={data.enable_google2fa}
                    onChange={(e) =>
                      setData({ ...data, enable_google2fa: e.target.value })
                    }
                  />

                  <Input
                    placeholder={t("nav.user.ip_address")}
                    label={t("nav.user.ip_address")}
                    value={data.ip_address}
                    onChange={(e) =>
                      setData({ ...data, ip_address: e.target.value })
                    }
                  />

                  <Input
                    label={t("nav.user.password")}
                    type={show ? "text" : "password"}
                    placeholder={t("nav.user.password")}
                    prefix={<LockClosedIcon className="size-4.5" />}
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    suffix={
                      <Button
                        variant="flat"
                        className="pointer-events-auto size-6 shrink-0 rounded-full p-0"
                        onClick={toggle}
                      >
                        {show ? (
                          <EyeSlashIcon className="dark:text-dark-200 size-4.5 text-gray-500" />
                        ) : (
                          <EyeIcon className="dark:text-dark-200 size-4.5 text-gray-500" />
                        )}
                      </Button>
                    }
                  />

                  <Input
                    label={t("nav.user.confirm")}
                    type={confirmshow ? "text" : "password"}
                    placeholder={t("nav.user.confirm")}
                    prefix={<LockClosedIcon className="size-4.5" />}
                    value={data.confirm}
                    onChange={(e) =>
                      setData({ ...data, confirm: e.target.value })
                    }
                    suffix={
                      <Button
                        variant="flat"
                        className="pointer-events-auto size-6 shrink-0 rounded-full p-0"
                        onClick={toggleConfirm}
                      >
                        {confirmshow ? (
                          <EyeSlashIcon className="dark:text-dark-200 size-4.5 text-gray-500" />
                        ) : (
                          <EyeIcon className="dark:text-dark-200 size-4.5 text-gray-500" />
                        )}
                      </Button>
                    }
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
