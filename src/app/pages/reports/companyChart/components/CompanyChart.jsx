// Import Dependencies
import Chart from "react-apexcharts";

// Local Imports
import { Card } from "components/ui";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateFilter } from "components/shared/table/DateFilter";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export function CompanyChart() {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const [series, setSerise] = useState([
    {
      name: "",
      data: [0, 0],
    },
    {
      name: "",
      data: [0, 0],
    },
  ]);
  const [chartConfig, setChartConfig] = useState({
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
      categories: ["", ""],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/report/company_chart?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const companyCartData = await response.json();

        console.log(companyCartData);

        if (companyCartData.status !== "Success") {
          console.error(
            "Failed to fetch company chart data:",
            companyCartData.message,
          );
          return;
        }

        setSerise([
          {
            name: t("nav.purchase.purchase"),
            data: companyCartData.data.company_purchases_array,
          },
          {
            name: t("nav.sale.sale"),
            data: companyCartData.data.company_sales_array,
          },
        ]);

        setChartConfig({
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
            categories: companyCartData.data.company_names,
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
      } catch (error) {
        console.error("Error fetching company chart data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate, t, token]);

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) return;

    try {
      if (dates[0] !== "" && dates[1] !== "") {
        const start = dates[0] instanceof Date ? dates[0] : new Date(dates[0]);
        const end = dates[1] instanceof Date ? dates[1] : new Date(dates[1]);

        setStartDate(format(start, "yyyy-MM-dd"));
        setEndDate(format(end, "yyyy-MM-dd"));
      } else {
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error("Error formatting dates:", error);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="text-sm-plus dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          {t("nav.report.company_chart")}
        </h2>
        <div className="flex items-center gap-3">
          <h2 className="text-sm">{t("nav.date")} :</h2>
          <DateFilter
            config={{
              mode: "range",
            }}
            onChange={handleDateChange}
            title={t("nav.select_date_range")}
          />
        </div>
      </div>
      <div className="ax-transparent-gridline ltr:pr-2 rtl:pl-2">
        <Chart type="bar" height="265" options={chartConfig} series={series} />
      </div>
    </Card>
  );
}
