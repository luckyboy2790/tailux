import { useEffect, useState } from "react";
import axios from "utils/axios";
// import { QRCodeSVG } from "qrcode.react";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import { Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export default function QRGenerate() {
  const [qrUrl, setQrUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const generateQR = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("pending2FAUser"));

        console.log(userData?.enable_google2fa);
        console.log(userData?.google2fa_secret);

        if (userData?.enable_google2fa && userData?.google2fa_secret) {
          const queryParams = new URLSearchParams(window.location.search);
          const redirect = queryParams.get("redirect");

          const verificationURL = redirect
            ? `/verification?redirect=${encodeURIComponent(redirect)}`
            : "/verification";

          navigate(verificationURL);

          return;
        }

        const { data } = await axios.post(
          `${API_URL}/api/auth/qr/generate/${userData?.id}`,
        );

        setQrUrl(data.data);
        setSecret(data.secret);

        localStorage.setItem("pending2FAUser", JSON.stringify(data.user));
      } catch (err) {
        console.log(err);

        setError("Failed to generate QR code");
      }
    };

    generateQR();
  }, [navigate]);

  const handleQRScan = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirect = queryParams.get("redirect");

    const verificationURL = redirect
      ? `/verification?redirect=${encodeURIComponent(redirect)}`
      : "/verification";

    navigate(verificationURL);
  };

  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <Logo className="mx-auto size-16" />
            <div className="mt-4">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                Setup Google 2FA
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                Scan the QR code below in your authenticator app
              </p>
            </div>
          </div>

          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            {error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : qrUrl ? (
              <div className="flex flex-col items-center">
                {/* <QRCodeSVG value={qrUrl} size={200} /> */}
                <img src={qrUrl} alt="QR Code" className="h-48 w-48" />
                <p className="mt-4 text-sm break-all text-gray-500">
                  Backup code: <strong>{secret}</strong>
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                Loading QR Code...
              </div>
            )}

            <Button
              className="mt-5 w-full"
              color="primary"
              onClick={handleQRScan}
            >
              QR scan
            </Button>
          </Card>

          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <a href="#">Privacy Notice</a>
            <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
            <a href="#">Term of service</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
