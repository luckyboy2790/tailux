import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

// Local Imports
import { useThemeContext } from "app/contexts/theme/context";
import { DatePicker } from "components/shared/form/Datepicker";

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

const OverviewChart = () => {
  const { primaryColorScheme } = useThemeContext();

  const { t } = useTranslation();

  const series = [
    {
      name: "PRODUCT C",
      data: [15, 52, 56, 52, 12, 32, 41, 63],
    },
    {
      name: "PRODUCT B",
      data: [45, 75, 50, 70, 85, 90, 70, 62],
    },
    {
      name: "PRODUCT A",
      data: [30, 16, 27, 30, 55, 60, 48, 43],
    },
  ];

  const chartOptions = {
    ...options,
    colors: [primaryColorScheme[500], "#ffba1a"],
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center justify-end gap-4">
        <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
          {t("nav.dashboards.date")} :
        </h3>
        <DatePicker />
      </div>
      <Chart
        series={series}
        type="area"
        height="350"
        className="!w-full"
        options={chartOptions}
      />
    </div>
  );
};

export default OverviewChart;
