// Import Dependencies
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useIsomorphicEffect } from "hooks";
import { defaultTheme } from "configs/theme.config";
import i18n from "i18n/config";
import { LocaleContext } from "./context";
import { locales } from "i18n/langs";

// ----------------------------------------------------------------------

// Set the initial language from i18n or fallback to the default theme language
const initialLang =
  localStorage.getItem("i18nextLng") || defaultTheme.defaultLang;

const initialDir = i18n.dir(initialLang);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(initialLang);
  const [direction, setDirection] = useState(initialDir);

  // Function to update the locale dynamically
  const updateLocale = useCallback(async (newLocale) => {
    try {
      // Dynamically load the locale and update dependencies
      await locales[newLocale].dayjs();
      dayjs.locale(newLocale);
      const i18nResources = await locales[newLocale].i18n();
      i18n.addResourceBundle(newLocale, "translations", i18nResources);
      i18n.changeLanguage(newLocale);

      // Update the state if the locale changes
      setLocale(newLocale);
    } catch (error) {
      console.error("Failed to update locale:", error);

      // Fallback to updating language in case of an error
      i18n.changeLanguage(newLocale);
      setLocale(newLocale);
    }
  }, []);

  // Load the initial locale resourses
  useIsomorphicEffect(() => {
    if (locale) {
      updateLocale(locale);
    }
  }, []);

  // Update text direction based on the current locale
  useIsomorphicEffect(() => {
    const newDir = i18n.dir(locale);
    if (newDir !== direction) {
      setDirection(newDir);
    }
  }, [locale]);

  useIsomorphicEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <LocaleContext
      value={{
        locale,
        updateLocale,
        direction,
        setDirection,
        isRtl: direction === "rtl",
      }}
    >
      {children}
    </LocaleContext>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
