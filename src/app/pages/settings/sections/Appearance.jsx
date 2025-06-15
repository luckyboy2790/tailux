// Import Dependencies
import { Label, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { toast } from "sonner";

// Local Imports
import { useThemeContext } from "app/contexts/theme/context";
import { colors } from "constants/colors.constant";
import { Listbox } from "components/shared/form/Listbox";
import { useDidUpdate } from "hooks";
import { Button, Switch } from "components/ui";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const MAX_NOTIFICATION_COUNT = 5;

export default function Appearance() {
  const theme = useThemeContext();

  const { t } = useTranslation();

  useDidUpdate(() => {
    toast(t("nav.settings.appearance.position_updated"), {
      description: `${t("nav.settings.appearance.position_updated_description")} ${
        notificationPos.find(
          (pos) => pos.value === theme.notification?.position,
        ).label
      }`,
      descriptionClassName: "text-gray-600 dark:text-dark-200 text-xs mt-0.5",
    });
  }, [theme.notification?.position]);

  useDidUpdate(() => {
    for (let i = 0; i < 3; i++)
      toast(t("nav.settings.appearance.toast_content"));
  }, [theme.notification?.isExpanded]);

  const primaryColors = ["indigo", "blue", "green", "amber", "purple", "rose"];
  const lightColors = ["slate", "gray", "neutral"];
  const darkColors = ["mint", "navy", "mirage", "cinder", "black"];

  const cardSkins = [
    {
      value: "shadow-sm",
      label: t("nav.settings.appearance.shadow"),
    },
    {
      value: "bordered",
      label: t("nav.settings.appearance.borded"),
    },
  ];

  const notificationPos = [
    {
      value: "top-left",
      label: t("nav.settings.appearance.top_left"),
    },
    {
      value: "top-center",
      label: t("nav.settings.appearance.top_center"),
    },
    {
      value: "top-right",
      label: t("nav.settings.appearance.top_right"),
    },
    {
      value: "bottom-left",
      label: t("nav.settings.appearance.bottom_left"),
    },
    {
      value: "bottom-center",
      label: t("nav.settings.appearance.bottom_center"),
    },
    {
      value: "bottom-right",
      label: t("nav.settings.appearance.bottom_right"),
    },
  ];

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        {t("nav.settings.appearance.appearance")}
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        {t("nav.settings.appearance.appearance_description")}
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />

      <div className="space-y-8">
        <div>
          <div>
            <p className="dark:text-dark-100 text-base font-medium text-gray-800">
              {t("nav.settings.appearance.theme")}
            </p>
            <p className="mt-0.5">
              {t("nav.settings.appearance.theme_description")}
            </p>
          </div>
          <RadioGroup
            value={theme.themeMode}
            onChange={theme.setThemeMode}
            className="mt-4"
          >
            <Label className="sr-only">Theme Mode (dark or light)</Label>
            <div className="mt-2 flex flex-wrap gap-6">
              <Radio
                value="system"
                className="w-44 cursor-pointer outline-hidden"
              >
                {({ checked }) => (
                  <>
                    <div
                      className={clsx(
                        "bg-dark-900 relative overflow-hidden rounded-lg border-2 dark:border-transparent",
                        checked &&
                          "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                      )}
                    >
                      <div
                        style={{
                          clipPath: "polygon(50% 50%, 100% 0, 0 0, 0% 100%)",
                        }}
                        className="w-full space-y-2 bg-gray-50 p-1.5"
                      >
                        <div className="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 h-2 w-9/12 rounded-lg"></div>
                          <div className="bg-gray-150 h-2 w-11/12 rounded-lg"></div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-gray-150 h-2 w-full rounded-lg"></div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-gray-150 h-2 w-9/12 rounded-lg"></div>
                        </div>
                      </div>
                      <div
                        style={{
                          clipPath:
                            "polygon(50% 50%, 100% 0, 100% 100%, 0% 100%)",
                        }}
                        className="absolute inset-0 space-y-2 p-1.5"
                      >
                        <div className="bg-dark-700 w-full space-y-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                          <div className="bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                        </div>
                        <div className="bg-dark-700 flex items-center space-x-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-dark-400 h-2 w-full rounded-lg"></div>
                        </div>
                        <div className="bg-dark-700 flex items-center space-x-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-1.5 text-center">
                      {t("nav.settings.appearance.system")}
                    </p>
                  </>
                )}
              </Radio>
              <Radio
                value="light"
                className="w-44 cursor-pointer outline-hidden"
              >
                {({ checked }) => (
                  <>
                    <div
                      className={clsx(
                        "relative overflow-hidden rounded-lg border-2 dark:border-transparent",
                        checked &&
                          "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                      )}
                    >
                      <div className="w-full space-y-2 bg-gray-50 p-1.5">
                        <div className="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 h-2 w-9/12 rounded-lg"></div>
                          <div className="bg-gray-150 h-2 w-11/12 rounded-lg"></div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-gray-150 h-2 w-full rounded-lg"></div>
                        </div>
                        <div className="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                          <div className="bg-gray-150 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-gray-150 h-2 w-9/12 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-1.5 text-center">
                      {t("nav.settings.appearance.light")}
                    </p>
                  </>
                )}
              </Radio>
              <Radio
                value="dark"
                className="w-44 cursor-pointer outline-hidden"
              >
                {({ checked }) => (
                  <>
                    <div
                      className={clsx(
                        "bg-dark-900 relative overflow-hidden rounded-lg border border-transparent",
                        checked &&
                          "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                      )}
                    >
                      <div className="bg-dark-900 w-full space-y-2 p-1.5">
                        <div className="bg-dark-700 w-full space-y-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                          <div className="bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                        </div>
                        <div className="bg-dark-700 flex items-center space-x-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-dark-400 h-2 w-full rounded-lg"></div>
                        </div>
                        <div className="bg-dark-700 flex items-center space-x-2 rounded-sm p-2 shadow-xs">
                          <div className="bg-dark-400 size-4 shrink-0 rounded-full"></div>
                          <div className="bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-1.5 text-center">
                      {t("nav.settings.appearance.dark")}
                    </p>
                  </>
                )}
              </Radio>
            </div>
          </RadioGroup>
        </div>
        <div>
          <div>
            <p className="dark:text-dark-100 text-base font-medium text-gray-800">
              {t("nav.settings.appearance.primary_color")}
            </p>
            <p className="mt-0.5">
              {t("nav.settings.appearance.primary_color_description")}
            </p>
          </div>
          <RadioGroup
            value={theme.primaryColorScheme.name}
            onChange={theme.setPrimaryColorScheme}
            className="mt-2"
          >
            <Label className="sr-only">Choose Primary Theme Color</Label>
            <div className="mt-2 flex w-fit flex-wrap gap-4 sm:gap-5">
              {primaryColors.map((color) => (
                <Radio
                  key={color}
                  value={color}
                  className={({ checked }) =>
                    clsx(
                      "flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden",
                      checked
                        ? "border-primary-500"
                        : "dark:border-dark-500 border-gray-200",
                    )
                  }
                >
                  {({ checked }) => (
                    <div
                      className={clsx(
                        "mask is-diamond size-6 transition-all",
                        checked && "scale-110 rotate-45",
                      )}
                      style={{
                        backgroundColor: colors[color][500],
                      }}
                    ></div>
                  )}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div>
          <div>
            <p className="dark:text-dark-100 text-base font-medium text-gray-800">
              {t("nav.settings.appearance.light_color_scheme")}
            </p>
            <p className="mt-0.5">
              {t("nav.settings.appearance.light_color_scheme_description")}
            </p>
          </div>
          <RadioGroup
            value={theme.lightColorScheme.name}
            onChange={theme.setLightColorScheme}
            className="mt-4"
          >
            <Label className="sr-only">Theme Light Mode Color Scheme</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {lightColors.map((color) => (
                <Radio
                  key={color}
                  value={color}
                  className="w-32 cursor-pointer outline-hidden"
                >
                  {({ checked }) => (
                    <>
                      <div
                        className={clsx(
                          "relative overflow-hidden rounded-lg border-2 dark:border-transparent",
                          checked &&
                            "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                        )}
                      >
                        <div
                          className="w-full space-y-2 p-1.5"
                          style={{ backgroundColor: colors[color][200] }}
                        >
                          <div className="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                            <div
                              className="h-2 w-9/12 rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                            <div
                              className="h-2 w-11/12 rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                          </div>
                          <div className="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                            <div
                              className="size-4 shrink-0 rounded-full"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                            <div
                              className="h-2 w-full rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-1.5 text-center capitalize">
                        {t(`nav.settings.appearance.${color}`)}
                      </p>
                    </>
                  )}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div>
          <div>
            <p className="dark:text-dark-100 text-base font-medium text-gray-800">
              {t("nav.settings.appearance.dark_color_scheme")}
            </p>
            <p className="mt-0.5">
              {t("nav.settings.appearance.dark_color_scheme_description")}
            </p>
          </div>
          <RadioGroup
            value={theme.darkColorScheme.name}
            onChange={theme.setDarkColorScheme}
            className="mt-4"
          >
            <Label className="sr-only">Dark Mode Color Schemes</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {darkColors.map((color) => (
                <Radio
                  key={color}
                  value={color}
                  className="w-32 cursor-pointer outline-hidden"
                >
                  {({ checked }) => (
                    <>
                      <div
                        className={clsx(
                          "relative overflow-hidden rounded-lg",
                          checked &&
                            "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                        )}
                      >
                        <div
                          className="w-full space-y-2 p-1.5"
                          style={{ backgroundColor: colors[color][900] }}
                        >
                          <div
                            className="w-full space-y-2 rounded-sm p-2 shadow-xs"
                            style={{ backgroundColor: colors[color][700] }}
                          >
                            <div
                              className="h-2 w-9/12 rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                            <div
                              className="h-2 w-11/12 rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                          </div>
                          <div
                            className="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                            style={{ backgroundColor: colors[color][700] }}
                          >
                            <div
                              className="size-4 shrink-0 rounded-full"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                            <div
                              className="h-2 w-full rounded-lg"
                              style={{ backgroundColor: colors[color][400] }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-1.5 text-center capitalize">
                        {t(`nav.settings.appearance.${color}`)}
                      </p>
                    </>
                  )}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="dark:bg-dark-500 my-6 h-px bg-gray-200"></div>
      <div>
        <div>
          <p className="dark:text-dark-100 text-base font-medium text-gray-800">
            {t("nav.settings.appearance.notification")}
          </p>
          <p className="mt-0.5">
            {t("nav.settings.appearance.notification_description")}
          </p>
        </div>
        <div className="mt-3">
          <p>{t("nav.settings.appearance.notification_group_style")}</p>
          <RadioGroup
            value={theme.notification?.isExpanded ? "expand" : "stack"}
            onChange={(val) => theme.setNotificationExpand(val === "expand")}
            className="mt-3 text-center"
          >
            <Label className="sr-only">Notification Group Style</Label>
            <div className="grid max-w-xl gap-4 sm:grid-cols-2">
              <Radio value="stack" className="cursor-pointer outline-hidden">
                {({ checked }) => (
                  <>
                    <div
                      className={clsx(
                        "dark:border-dark-500 relative flex h-52 w-full items-center rounded-lg border border-gray-200 px-3 py-4",
                        checked &&
                          "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                      )}
                    >
                      <div className="w-full -space-y-6">
                        <div
                          className="dark:border-dark-500 dark:bg-dark-600 relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:shadow-none"
                          style={{ transform: "scale(.9)" }}
                        >
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                        </div>
                        <div
                          className="dark:border-dark-500 dark:bg-dark-600 relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:shadow-none"
                          style={{ transform: "scale(.95)" }}
                        >
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                        </div>
                        <div className="dark:border-dark-500 dark:bg-dark-600 relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:shadow-none">
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                          <div className="bg-gray-150 dark:bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2">
                      {t("nav.settings.appearance.stacked")}
                    </p>
                  </>
                )}
              </Radio>
              <Radio value="expand" className="cursor-pointer outline-hidden">
                {({ checked }) => (
                  <>
                    <div
                      className={clsx(
                        "dark:border-dark-500 relative flex h-52 w-full flex-col justify-between space-y-2 rounded-lg border border-gray-200 px-4 py-5",
                        checked &&
                          "ring-primary-600 dark:ring-primary-500 dark:ring-offset-dark-700 ring-2 ring-offset-2 ring-offset-white transition-all",
                      )}
                    >
                      {Array(3)
                        .fill()
                        .map((_, i) => (
                          <div
                            key={i}
                            className="dark:border-dark-500 dark:bg-dark-600 relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:shadow-none"
                          >
                            <div className="bg-gray-150 dark:bg-dark-400 h-2 w-9/12 rounded-lg"></div>
                            <div className="bg-gray-150 dark:bg-dark-400 h-2 w-11/12 rounded-lg"></div>
                          </div>
                        ))}
                    </div>
                    <p className="mt-2">
                      {t("nav.settings.appearance.expanded")}
                    </p>
                  </>
                )}
              </Radio>
            </div>
          </RadioGroup>
        </div>
        <div className="mt-4">
          <p>{t("nav.settings.appearance.notification_max_count")}</p>
          <RadioGroup
            value={theme.notification?.visibleToasts}
            onChange={(val) => theme.setNotificationMaxCount(val)}
            className="mt-3 text-center"
          >
            <Label className="sr-only">Notification Max Count</Label>
            <div className="flex w-full max-w-sm space-x-0.5">
              {Array(MAX_NOTIFICATION_COUNT)
                .fill()
                .map((_, i) => (
                  <Radio
                    value={i + 1}
                    key={i}
                    className={({ checked }) =>
                      clsx(
                        "flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden",
                        checked
                          ? "text-primary-600 dark:text-primary-400"
                          : "dark:text-dark-300 text-gray-500",
                      )
                    }
                  >
                    {i + 1}
                  </Radio>
                ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3">
          <p className="my-auto">
            {t("nav.settings.appearance.notification_position")}:
          </p>
          <Listbox
            classNames={{
              root: "mt-1.5 flex-1 md:col-span-2 md:mt-0",
            }}
            data={notificationPos}
            value={notificationPos.find(
              (pos) => pos.value === theme.notification?.position,
            )}
            onChange={({ value }) => theme.setNotificationPosition(value)}
          />
        </div>
      </div>
      <div className="dark:bg-dark-500 my-6 h-px bg-gray-200"></div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <p className="my-auto">{t("nav.settings.appearance.card_skin")}:</p>
          <Listbox
            classNames={{
              root: "mt-1.5 flex-1 md:col-span-2 md:mt-0",
            }}
            data={cardSkins}
            value={cardSkins.find((skin) => skin.value === theme.cardSkin)}
            onChange={({ value }) => theme.setCardSkin(value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <p className="my-auto">
            {t("nav.settings.appearance.theme_chrome_mode")}:
          </p>
          <div className="dark:border-dark-450 mt-1.5 flex flex-1 items-center justify-between space-x-2 rounded-lg border border-gray-300 px-3 py-2 md:col-span-2 md:mt-0">
            <p className="dark:text-dark-100 text-gray-800">
              {t("nav.settings.appearance.monochrome_mode")}
            </p>
            <Switch
              checked={theme.isMonochrome}
              onChange={(e) => theme.setMonochromeMode(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Button color="primary" onClick={theme.resetTheme}>
          {t("nav.settings.appearance.reset_theme")}
        </Button>
      </div>
    </div>
  );
}
