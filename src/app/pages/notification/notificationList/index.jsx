import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { useTranslation } from "react-i18next";
import PurchaseTable from "./dataTable";
import { TfiHarddrives } from "react-icons/tfi";

const NotificationList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("nav.notification.notification_list"),
      path: "/notification/list",
    },
    { title: t("nav.notification.notification_list") },
  ];

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TfiHarddrives className="size-5 shrink-0 stroke-[0.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.notification.notification_list")}
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

export default NotificationList;
