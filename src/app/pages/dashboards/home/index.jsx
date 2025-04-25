import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import DashboardIcon from "assets/dualicons/dashboards.svg?react";
import Overview from "./overview";
import OverviewChart from "./overview_chart";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.dashboards.dashboards"), path: "/dashboards" },
    { title: t("nav.dashboards.home") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <DashboardIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.dashboards.dashboards")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <Overview />

          <OverviewChart />
        </div>
      </div>
    </Page>
  );
}
