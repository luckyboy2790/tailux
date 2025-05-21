import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import { useTranslation } from "react-i18next";
import PaymentTable from "./paymentTable";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const PurchaseList = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { title: t("nav.payment.payment"), path: "/payment" },
    { title: t("nav.payment.list") },
  ];

  const [referenceNo, setReferenceNo] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/api/${params.type === "purchase" ? "purchase" : "sales"}/get_detail?${params.type}Id=${params.purchase_id}`,
      );

      const result = await response.json();

      setReferenceNo(result.data?.reference_no);
    };

    fetchData();
  }, [params.purchase_id, params.type]);

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PaymentIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.payment.payment")}({referenceNo})
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <PaymentTable />
        </div>
      </div>
    </Page>
  );
};

export default PurchaseList;
