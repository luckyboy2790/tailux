import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import SaleIcon from "assets/dualicons/sale.svg?react";
import { useTranslation } from "react-i18next";
import SalesTable from "./salesTable";

const PurchaseList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.sale.sale"), path: "/sale" },
    { title: t("nav.sale.sale_list") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SaleIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.sale.sale")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <SalesTable />
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
