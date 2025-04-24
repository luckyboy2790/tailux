import { createSafeContext } from "utils/createSafeContext";

export const [ThemeContext, useThemeContext] = createSafeContext(
    "useThemeContext must be used within ThemeProvider",
);
