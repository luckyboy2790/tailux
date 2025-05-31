// Import Dependencies
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Local Imports
import { Button, Input, Spinner } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "hooks";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export default function General() {
  const { dispatch } = useAuthContext();

  const { t } = useTranslation();

  const [show, { toggle }] = useDisclosure();
  const [confirmshow, { toggle: toggleConfirm }] = useDisclosure();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const handleSave = async () => {
    if (loading) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;
    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, and special character.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/users/update_password`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Update failed");

      const result = await res.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: { user: result.data } });
      toast.success("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        {t("nav.settings.password")}
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        {t("nav.settings.password_description")}
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
      <div className="mt-5 grid grid-cols-1 gap-4 [&_.prefix]:pointer-events-none">
        <Input
          label={t("nav.user.password")}
          type={show ? "text" : "password"}
          placeholder={t("nav.user.password")}
          prefix={<LockClosedIcon className="size-4.5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      <div className="mt-8 flex justify-end space-x-3">
        <Button className="min-w-[7rem]" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          className="min-w-[7rem]"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner color="primary" className="size-4" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
