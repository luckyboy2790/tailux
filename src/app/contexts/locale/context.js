import { createSafeContext } from "utils/createSafeContext";

export const [LocaleContext, useLocaleContext] = createSafeContext(
    "useLocaleContext must be used within LocaleProvider",
);
