export const locales = {
  es: {
    label: "Spanish",
    dayjs: () => import("dayjs/locale/es"),
    flatpickr: () =>
      import("flatpickr/dist/l10n/es").then((module) => module.Spanish),
    i18n: () => import("./locales/es/translations.json"),
    flag: "spain",
  },
  en: {
    label: "English",
    dayjs: () => import("dayjs/locale/en"),
    flatpickr: null,
    i18n: () => import("./locales/en/translations.json"),
    flag: "united-kingdom",
  },
};
