import { useEffect, useState } from "react";

// Local Imports
import { Button } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export default function General() {
  const { dispatch, user } = useAuthContext();

  const { t } = useTranslation();

  const [cookies] = useCookies(["authToken"]);

  const [qrUrl, setQrUrl] = useState("");

  const token = cookies.authToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/qr/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const result = await res.json();

        setQrUrl(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(t("nav.settings.google2fa.failed_updating"));
      }
    };

    if (user?.enable_google2fa && user?.google2fa_secret) {
      fetchData();
    }
  }, [user, token, qrUrl, dispatch]);

  const handleGenerate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/qr/generate/${user.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const result = await res.json();

      setQrUrl(result.data);

      console.log(result.user);

      dispatch({ type: "UPDATE_USER", payload: { user: result.user } });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(t("nav.settings.google2fa.failed_updating"));
    }
  };

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        {t("nav.settings.google2fa.google2fa")}
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        {t("nav.settings.google2fa.google2fa_description")}
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
      <div className="mt-5 grid grid-cols-1 gap-4 [&_.prefix]:pointer-events-none">
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="QR Code" className="h-48 w-48" />
            <Button
              className="min-w-[7rem]"
              color="primary"
              onClick={handleGenerate}
            >
              {t("nav.settings.google2fa.re_generate_qr_code")}
            </Button>
          </>
        ) : (
          <Button
            className="min-w-[7rem]"
            color="primary"
            onClick={handleGenerate}
          >
            {t("nav.settings.google2fa.enable_google2fa")}
          </Button>
        )}
      </div>
    </div>
  );
}
