// Import Dependencies
import Chart from "react-apexcharts";

// Local Imports
import { Card, Select } from "components/ui";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAuthContext } from "app/contexts/auth/context";
import { useLocaleContext } from "app/contexts/locale/context";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function CompanyChart() {
  const { t } = useTranslation();

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const { user } = useAuthContext();

  const [companies, setCompanies] = useState([]);

  const [config, setConfig] = useState({});
  const [series, setSerise] = useState([]);

  const { locale } = useLocaleContext();

  const [companyId, setCompanyId] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      const companyResponse = await fetch(
        `${API_URL}/api/company/get_all_company`,
      );

      const companyResult = await companyResponse.json();

      const selectData = companyResult?.data.map((item, key) => ({
        key: key,
        value: item?.id,
        label: item?.name,
        disabled: false,
      }));

      setCompanies(selectData);

      const overviewChartResponse = await fetch(
        `${API_URL}/api/report/overview_chart?company_id=${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const overviewData = await overviewChartResponse.json();

      setSerise([
        {
          name: t("nav.report.purchase"),
          data: [
            overviewData.data.last_month.purchase,
            overviewData.data.this_month.purchase,
          ],
        },
        {
          name: t("nav.report.sale"),
          data: [
            overviewData.data.last_month.sale,
            overviewData.data.this_month.sale,
          ],
        },
      ]);

      setConfig({
        colors: ["#4467EF", "#FF9800"],
        chart: {
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "55%",
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return Number(val).toLocaleString();
          },
          offsetY: -30,
        },
        xaxis: {
          categories: [
            dayjs(overviewData.data.last_month.month_name, "MMMM YYYY")
              .locale(locale)
              .format("MMMM YYYY"),
            dayjs(overviewData.data.this_month.month_name, "MMMM YYYY")
              .locale(locale)
              .format("MMMM YYYY"),
          ],
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
      });
    };

    fetchData();
  }, [companyId, token, t, locale]);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="text-sm-plus dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          {t("nav.report.overview_chart")}
        </h2>
        {user?.role === "admin" && (
          <div className="flex items-center gap-3">
            <h2 className="text-sm">{t("nav.company")} :</h2>
            <Select
              data={companies}
              onChange={(e) => {
                setCompanyId(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      <div className="ax-transparent-gridline ltr:pr-2 rtl:pl-2">
        <Chart type="bar" height="265" options={config} series={series} />
      </div>
    </Card>
  );
}
