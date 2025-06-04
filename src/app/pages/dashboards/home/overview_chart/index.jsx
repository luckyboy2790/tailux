import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

// Local Imports
import { useThemeContext } from "app/contexts/theme/context";
import { DatePicker } from "components/shared/form/Datepicker";
import { format, parseISO } from "date-fns";

const options = {
  chart: {
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.35,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  tooltip: {
    shared: true,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetX: -10,
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getCurrentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return {
    firstDay: formatDate(new Date(year, month, 1)),
    lastDay: formatDate(new Date(year, month + 1, 0)),
  };
};

const OverviewChart = ({
  data = {},
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const { primaryColorScheme } = useThemeContext();

  const currentYear = new Date().getFullYear();

  const { firstDay, lastDay } = getCurrentMonthRange();

  const { t } = useTranslation();

  const series = [
    {
      name: "Purchase",
      data: data?.purchase_array || [],
      color: "#3B82F6",
    },
    {
      name: "Sale",
      data: data?.sale_array || [],
      color: "#FFBA1A",
    },
    {
      name: "Payment",
      data: data?.payment_array || [],
      color: "#10B981",
    },
  ];

  const chartOptions = {
    ...options,
    xaxis: {
      type: "datetime",
      categories:
        data?.key_array.map((d) => {
          const [month, day] = d.split("/");

          const date = new Date(`${currentYear}-${month}-${day}`);

          return date.toISOString().split("T")[0] + "T01:00:00";
        }) || [],
    },
    colors: [primaryColorScheme[500], "#ffba1a"],
  };

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) return;

    try {
      // Ensure we have valid Date objects
      const start = dates[0] instanceof Date ? dates[0] : new Date(dates[0]);
      const end = dates[1] instanceof Date ? dates[1] : new Date(dates[1]);

      setStartDate(format(start, "yyyy-MM-dd"));
      setEndDate(format(end, "yyyy-MM-dd"));
    } catch (error) {
      console.error("Error formatting dates:", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center justify-end gap-4">
        <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
          {t("nav.dashboards.date")} :
        </h3>
        <DatePicker
          options={{
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate: [startDate || firstDay, endDate || lastDay],
          }}
          value={[
            startDate ? parseISO(startDate) : firstDay,
            endDate ? parseISO(endDate) : lastDay,
          ]}
          onChange={handleDateChange}
        />
      </div>
      <Chart
        series={series}
        type="area"
        width="100%"
        height="350"
        className="!w-full !overflow-hidden"
        options={chartOptions}
      />
    </div>
  );
};

export default OverviewChart;
