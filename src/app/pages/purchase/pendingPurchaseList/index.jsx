import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import { useTranslation } from "react-i18next";
import PurchaseTable from "./purchaseTable";

const PurchaseList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.purchase.purchase"), path: "/purchase" },
    { title: t("nav.purchase.pending") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PurchaseIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.purchase.purchase")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <PurchaseTable />
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
