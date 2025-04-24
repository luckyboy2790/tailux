// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { defaultTheme } from "configs/theme.config";
import { colors } from "constants/colors.constant";
import { useIsomorphicEffect, useLocalStorage, useMediaQuery } from "hooks";
import { ThemeContext } from "./context";

// ----------------------------------------------------------------------

const initialState = {
  ...defaultTheme,
  isDark: false,
  setThemeMode: () => {},
  setThemeLayout: () => {},
  toggleMonochromeMode: () => {},
  setLightColorScheme: () => {},
  setDarkColorScheme: () => {},
  setPrimaryColorScheme: () => {},
  setNotificationPosition: () => {},
  setNotificationExpand: () => {},
  resetTheme: () => {},
};

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const _html = document?.documentElement;

export function ThemeProvider({ children }) {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
    themeLayout: initialState.themeLayout,
    cardSkin: initialState.cardSkin,
    isMonochrome: initialState.isMonochrome,
    darkColorScheme: initialState.darkColorScheme,
    lightColorScheme: initialState.lightColorScheme,
    primaryColorScheme: initialState.primaryColorScheme,
    notification: { ...initialState.notification },
  });

  const isDark =
    (settings.themeMode === "system" && isDarkOS) ||
    settings.themeMode === "dark";

  const setThemeMode = (val) => {
    setSettings((settings) => {
      return {
        ...settings,
        themeMode: val,
      };
    });
  };

  const setThemeLayout = (val) => {
    setSettings({
      ...settings,
      themeLayout: val,
    });
  };

  const setMonochromeMode = (val) => {
    setSettings({
      ...settings,
      isMonochrome: val,
    });
  };

  const setDarkColorScheme = (val) => {
    setSettings({
      ...settings,
      darkColorScheme: {
        name: val,
        ...colors[val],
      },
    });
  };

  const setLightColorScheme = (val) => {
    setSettings({
      ...settings,
      lightColorScheme: {
        name: val,
        ...colors[val],
      },
    });
  };

  const setPrimaryColorScheme = (val) => {
    setSettings((settings) => {
      return {
        ...settings,
        primaryColorScheme: {
          name: val,
          ...colors[val],
        },
      };
    });
  };

  const setNotificationPosition = (val) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        position: val,
      },
    });
  };

  const setNotificationExpand = (val) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        isExpanded: val,
      },
    });
  };

  const setNotificationMaxCount = (val) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        visibleToasts: val,
      },
    });
  };

  const setCardSkin = (val) => {
    setSettings((settings) => {
      return { ...settings, cardSkin: val };
    });
  };

  const resetTheme = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      isMonochrome: initialState.isMonochrome,
      darkColorScheme: initialState.darkColorScheme,
      lightColorScheme: initialState.lightColorScheme,
      primaryColorScheme: initialState.primaryColorScheme,
      cardSkin: initialState.cardSkin,
      notification: { ...initialState.notification },
    });
  };

  useIsomorphicEffect(() => {
    isDark ? _html.classList.add("dark") : _html.classList.remove("dark");
  }, [isDark]);

  useIsomorphicEffect(() => {
    settings.isMonochrome
      ? document.body.classList.add("is-monochrome")
      : document.body.classList.remove("is-monochrome");
  }, [settings.isMonochrome]);

  useIsomorphicEffect(() => {
    _html.dataset.themeLight = settings.lightColorScheme.name;
  }, [settings.lightColorScheme]);

  useIsomorphicEffect(() => {
    _html.dataset.themeDark = settings.darkColorScheme.name;
  }, [settings.darkColorScheme]);

  useIsomorphicEffect(() => {
    _html.dataset.themePrimary = settings.primaryColorScheme.name;
  }, [settings.primaryColorScheme]);

  useIsomorphicEffect(() => {
    _html.dataset.cardSkin = settings.cardSkin;
  }, [settings.cardSkin]);

  useIsomorphicEffect(() => {
    if (document) document.body.dataset.layout = settings.themeLayout;
  }, [settings.themeLayout]);

  if (!children) {
    return null;
  }

  return (
    <ThemeContext
      value={{
        ...settings,
        isDark,
        setMonochromeMode,
        setThemeMode,
        setThemeLayout,
        setLightColorScheme,
        setDarkColorScheme,
        setPrimaryColorScheme,
        setNotificationPosition,
        setNotificationExpand,
        setNotificationMaxCount,
        setCardSkin,
        setSettings,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
