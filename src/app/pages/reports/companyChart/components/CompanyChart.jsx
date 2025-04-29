// Import Dependencies
import Chart from "react-apexcharts";

// Local Imports
import { Card, Select } from "components/ui";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const series = [
  {
    name: "Purchase",
    data: [500000, 262114],
  },
  {
    name: "Sale",
    data: [256311, 249131],
  },
];

const chartConfig = {
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
      return val >= 1000 ? (val / 1000).toFixed(2) + "k" : val;
    },
    offsetY: -30,
  },
  xaxis: {
    categories: ["March 2025", "April 2025"],
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
};

export function CompanyChart() {
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="text-sm-plus dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          {t("nav.report.company_chart")}
        </h2>
        <div className="flex items-center gap-3">
          <h2 className="text-sm">{t("nav.company")} :</h2>
          <Select
            defaultValue="Potato"
            data={["Apple", "Orange", "Potato", "Tomato"]}
          />
        </div>
      </div>
      <div className="ax-transparent-gridline ltr:pr-2 rtl:pl-2">
        <Chart type="bar" height="265" options={chartConfig} series={series} />
      </div>
    </Card>
  );
}
