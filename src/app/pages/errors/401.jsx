// Local Imports
import Authorize from "assets/illustrations/authorize.svg?react";
import { Page } from "components/shared/Page";
import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

export default function Error401() {
  const {
    primaryColorScheme: primary,
    lightColorScheme: light,
    darkColorScheme: dark,
    isDark,
  } = useThemeContext();

  return (
    <Page title="Error 401">
      <main className="min-h-100vh relative grid w-full grow grid-cols-1 place-items-center p-4">
        <div className="w-full max-w-[26rem] text-center">
          <Authorize
            className="w-full"
            style={{
              "--primary": primary[500],
              "--dark-500": isDark ? dark[500] : light[700],
            }}
          />
          <p className="pt-4 text-7xl font-bold text-primary-600 dark:text-primary-500">
            401
          </p>
          <p className="pt-4 text-xl font-semibold text-gray-800 dark:text-dark-50">
            You are not authorized
          </p>
          <p className="text-balance pt-2 text-gray-500 dark:text-dark-200">
            You are missing the required rights to be able to access this page
          </p>
        </div>
      </main>
    </Page>
  );
}
