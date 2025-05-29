// Local Imports
import { useThemeContext } from "app/contexts/theme/context";
import RepairServer from "assets/illustrations/repair-server.svg?react";
import { Page } from "components/shared/Page";
import { Button } from "components/ui";

// ----------------------------------------------------------------------

export default function Disabled() {
  const {
    primaryColorScheme: primary,
    lightColorScheme: light,
    darkColorScheme: dark,
    isDark,
  } = useThemeContext();

  return (
    <Page title="Disabled">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[36rem] p-4 sm:px-5">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <RepairServer
              className="w-3/5"
              style={{
                "--primary": primary[500],
                "--dark-400": isDark ? dark[400] : light[500],
                "--dark-600": isDark ? dark[600] : light[700],
              }}
            />

            <div className="mt-4 flex flex-col items-center justify-center gap-3">
              <h2 className="dark:text-dark-100 text-4xl font-semibold text-gray-600">
                We&apos;re currently offline
              </h2>

              <p className="dark:text-dark-300 text-[16px] text-gray-400">
                We can&apos;t show you this images because you aren&apos;t
                connected to the internet. When you&apos;re back online refresh
                the page or hit the button below
              </p>
            </div>

            <Button
              onClick={() => window.location.reload()}
              color="primary"
              className="h-11 text-base"
            >
              Refresh
            </Button>
          </div>
        </div>
      </main>
    </Page>
  );
}
