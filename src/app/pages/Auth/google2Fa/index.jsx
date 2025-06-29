// Import Dependencies
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import { Button, Card, Input, InputErrorMsg } from "components/ui";
import { getSchema } from "./schema";
import { Page } from "components/shared/Page";
import { useAuthContext } from "app/contexts/auth/context";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Google2Fa() {
  const { t } = useTranslation();

  const schema = getSchema(t);

  useEffect(() => {
    const previousClassList = document.documentElement.classList.value;

    document.documentElement.classList.add("dark");

    return () => {
      document.documentElement.className = previousClassList;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { errorMessage, checkOTP } = useAuthContext();

  const onSubmit = (data) => {
    const pendingUser = JSON.parse(localStorage.getItem("pending2FAUser"));
    const google2fa_secret = pendingUser?.google2fa_secret;

    checkOTP({
      one_time_password: data.digitalNumber,
      google2fa_secret,
      user: pendingUser,
    });
  };

  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <Logo className="mx-auto size-16" />
            <div className="mt-4">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                {t("nav.auth.google2Fa.welcome_back")}
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                {t("nav.auth.google2Fa.sign_in_prompt")}
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label={t("nav.auth.google2Fa.one_time_password")}
                  placeholder={t(
                    "nav.auth.google2Fa.one_time_password_placeholder",
                  )}
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("digitalNumber")}
                  error={errors?.digitalNumber?.message}
                />
              </div>

              <div className="mt-2">
                <InputErrorMsg when={errorMessage}>
                  {errorMessage}
                </InputErrorMsg>
              </div>

              <Button type="submit" className="mt-5 w-full" color="primary">
                {t("nav.auth.google2Fa.sign_in")}
              </Button>
            </form>
          </Card>
          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <a href="##">{t("nav.auth.google2Fa.privacy_notice")}</a>
            <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
            <a href="##">{t("nav.auth.google2Fa.terms_of_service")}</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
