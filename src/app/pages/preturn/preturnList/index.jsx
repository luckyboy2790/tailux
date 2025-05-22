import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import { useTranslation } from "react-i18next";
import PreturnTable from "./preturnTable";

const PurchaseList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.return.return"), path: "/preturn" },
    { title: t("nav.return.list") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PaymentIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.table_fields.return_list")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <PreturnTable />
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
