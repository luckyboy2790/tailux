// Import Dependencies
import { PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

// Local Imports
import { PreviewImg } from "components/shared/PreviewImg";
import { Avatar, Button, Input, Spinner, Upload } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const IMG_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

export default function General() {
  const { user, dispatch } = useAuthContext();

  const [avatar, setAvatar] = useState(null);

  const [username, setUsername] = useState(user?.username || "");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [loading, setLoading] = useState(false);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const { t } = useTranslation();

  const handleSave = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/users/update_profile`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Update failed");

      const result = await res.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: { user: result.data } });

      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        {t("nav.settings.general.general")}
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        {t("nav.settings.general.update_acc_setting")}
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
      <div className="mt-4 flex flex-col space-y-1.5">
        <span className="dark:text-dark-100 text-base font-medium text-gray-800">
          {t("nav.settings.general.avatar")}
        </span>
        <Avatar
          size={20}
          imgComponent={PreviewImg}
          imgProps={{
            file: avatar,
            onError: (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/100x100.png";
            },
          }}
          src={`${IMG_URL}/users/${user?.username}.png`}
          classNames={{
            root: "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 rounded-xl ring-offset-[3px] ring-offset-white transition-all hover:ring-3",
            display: "rounded-xl",
          }}
          indicator={
            <div className="dark:bg-dark-700 absolute right-0 bottom-0 -m-1 flex items-center justify-center rounded-full bg-white">
              {avatar ? (
                <Button
                  onClick={() => setAvatar(null)}
                  isIcon
                  className="size-6 rounded-full"
                >
                  <XMarkIcon className="size-4" />
                </Button>
              ) : (
                <Upload name="avatar" onChange={setAvatar} accept="image/*">
                  {({ ...props }) => (
                    <Button isIcon className="size-6 rounded-full" {...props}>
                      <HiPencil className="size-3.5" />
                    </Button>
                  )}
                </Upload>
              )}
            </div>
          }
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_.prefix]:pointer-events-none">
        <Input
          placeholder={t("nav.settings.general.username")}
          label={t("nav.settings.general.username")}
          className="rounded-xl"
          prefix={<UserIcon className="size-4.5" />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder={t("nav.settings.general.first_name")}
          label={t("nav.settings.general.first_name")}
          className="rounded-xl"
          prefix={<UserIcon className="size-4.5" />}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder={t("nav.settings.general.last_name")}
          label={t("nav.settings.general.last_name")}
          className="rounded-xl"
          prefix={<UserIcon className="size-4.5" />}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder={t("nav.settings.general.email")}
          label={t("nav.settings.general.email")}
          className="rounded-xl"
          prefix={<EnvelopeIcon className="size-4.5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder={t("nav.settings.general.phone_number")}
          label={t("nav.settings.general.phone_number")}
          className="rounded-xl"
          prefix={<PhoneIcon className="size-4.5" />}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mt-8 flex justify-end space-x-3">
        <Button className="min-w-[7rem]" onClick={() => window.history.back()}>
          {t("nav.settings.general.cancel")}
        </Button>
        <Button
          className="min-w-[7rem]"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner color="primary" className="size-4" /> : t("nav.settings.general.save")}
        </Button>
      </div>
    </div>
  );
}
