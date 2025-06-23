import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { TfiMobile } from "react-icons/tfi";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import { Fragment, useState } from "react";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import clsx from "clsx";
import SalesReportDetail from "./salesReportSection";
import PaymentReportDetail from "./paymentReportSection";

const CustomerReportDetail = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.report.report"), path: "/report" },
    {
      title: t("nav.report.customers_report"),
      path: "/report/customers_report",
    },
    { title: t("nav.report.overview") },
  ];

  const types = {
    sale: {
      title: "Sale",
      Icon: PurchaseIcon,
      color: "info",
    },
    payment: {
      title: "Payment",
      Icon: PaymentIcon,
      color: "success",
    },
  };

  const typesKey = Object.keys(types);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TfiMobile className="size-5 shrink-0 stroke-[0.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.report.customers_report")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <TabGroup
            as={Fragment}
            selectedIndex={activeTab}
            onChange={setActiveTab}
          >
            <TabList className="hide-scrollbar dark:bg-dark-800 flex shrink-0 overflow-x-auto scroll-smooth bg-gray-100 px-3">
              {typesKey.map((key) => (
                <Tab
                  onFocus={(e) => {
                    e.target.parentNode.scrollLeft =
                      e.target.offsetLeft - e.target.parentNode.offsetWidth / 2;
                  }}
                  key={key}
                  className={({ selected }) =>
                    clsx(
                      "w-30 shrink-0 scroll-mx-16 border-b-2 px-3 py-2 font-medium whitespace-nowrap",
                      selected
                        ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                        : "dark:hover:text-dark-100 dark:focus:text-dark-100 border-transparent hover:text-gray-800 focus:text-gray-800",
                    )
                  }
                  as={Button}
                >
                  {t(`nav.report.${key}`)}
                </Tab>
              ))}
            </TabList>
            <TabPanels as={Fragment}>
              {typesKey.map((key) => (
                <TabPanel
                  key={key}
                  className="custom-scrollbar scrollbar-hide grow space-y-4 overflow-x-hidden overflow-y-auto p-4"
                >
                  {key === "sale" ? (
                    <SalesReportDetail />
                  ) : (
                    <PaymentReportDetail />
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </Page>
  );
};

export default CustomerReportDetail;
