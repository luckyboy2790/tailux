import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import DashboardIcon from "assets/dualicons/dashboards.svg?react";
import Overview from "./overview";
import OverviewChart from "./overview_chart";
import { Spinner } from "components/ui";
import { useCookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;

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

export default function Home() {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyId, setCompanyId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const breadcrumbs = [
    { title: t("nav.dashboards.dashboards"), path: "/dashboards" },
    { title: t("nav.dashboards.home") },
  ];

  const [cookies] = useCookies("authToken");

  const token = cookies.authToken;

  const fetchData = useCallback(async (url, params, signal) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }, [token]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        // Use the selected dates if available, otherwise use current month range
        const dateRange =
          startDate && endDate
            ? { firstDay: startDate, lastDay: endDate }
            : getCurrentMonthRange();

        const [mainData, additionalData] = await Promise.all([
          fetchData(
            `${API_URL}/api/dashboard/dashboard-data`,
            {
              company_id: companyId,
              startDate: dateRange.firstDay,
              endDate: dateRange.lastDay,
            },
            abortController.signal,
          ),
          fetchData(
            `${API_URL}/api/dashboard/extra-dashboard-data`,
            { company_id: companyId },
            abortController.signal,
          ),
        ]);

        setDashboardData(mainData);
        setExtraData(additionalData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => abortController.abort();
  }, [companyId, startDate, endDate, fetchData]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner color="info" isElastic className="size-15" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <DashboardIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.dashboards.dashboards")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <Overview
            data={dashboardData?.return}
            extraData={extraData}
            setCompanyId={setCompanyId}
            companyId={companyId}
          />

          <OverviewChart
            data={dashboardData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
    </Page>
  );
}
