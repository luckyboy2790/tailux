import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import ReceivedOrderIcon from "assets/dualicons/receive.svg?react";
import { useTranslation } from "react-i18next";
import { CompanyChart } from "./components/CompanyChart";

const OverviewChart = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.report.report"), path: "/report" },
    { title: t("nav.report.company_chart") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ReceivedOrderIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.report.company_chart")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <CompanyChart />
        </div>
      </div>
    </Page>
  );
};

export default OverviewChart;
