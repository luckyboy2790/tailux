import { colors } from "constants/colors.constant";

const DEFAULT_DARK_COLOR = "black";
// Options: "cinder", "navy", "mirage", "black", "mint"

const DEFAULT_LIGHT_COLOR = "slate";
// Options: "slate", "gray", "neutral"

const DEFAULT_PRIMARY_COLOR = "amber";
// Options: "indigo", "blue", "green", "amber", "purple", "rose"

// Default theme configuration
export const defaultTheme = {
  themeMode: "dark",
  // Options: "light", "dark", "system"
  isMonochrome: false,
  // If true, the theme uses a monochrome color palette

  themeLayout: "sideblock",
  // Options: "main-layout", "sideblock"
  cardSkin: "shadow-sm",
  // Options: "bordered", "shadow-sm"

  // Dark mode color scheme
  darkColorScheme: {
    name: DEFAULT_DARK_COLOR,
    ...colors[DEFAULT_DARK_COLOR],
  },

  // Light mode color scheme
  lightColorScheme: {
    name: DEFAULT_LIGHT_COLOR,
    ...colors[DEFAULT_LIGHT_COLOR],
  },

  // Primary color scheme
  primaryColorScheme: {
    name: DEFAULT_PRIMARY_COLOR,
    ...colors[DEFAULT_PRIMARY_COLOR],
  },

  // Language settings
  defaultLang: "es",
  fallbackLang: "es",

  // Notification settings
  notification: {
    isExpanded: false,
    position: "bottom-right",
    visibleToasts: 3,
  },
};
