import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { Select, Swap, SwapOff, SwapOn } from "components/ui";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Avatar, Card } from "components/ui";
// import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Overview = ({ data, extraData, companyId, setCompanyId }) => {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);

  const [isShowed, setIsShowed] = useState(false);

  const { user } = useAuthContext();

  const role = user?.role;

  const handleShow = () => {
    setIsShowed((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/api/dashboard/get-companies`);

      const data = await response.json();

      const selectData = data.map((item, key) => ({
        key: key,
        value: item?.id,
        label: item?.name,
        disabled: false,
      }));

      setCompanies(selectData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4">
      <div className="flex w-full items-center justify-end gap-4">
        <div className="flex h-full items-center justify-center">
          <Swap defaultValue="on" effect="flip">
            <SwapOn>
              <EyeIcon
                className="size-7 cursor-pointer stroke-[1.5] text-[#155dfc]"
                onClick={handleShow}
              />
            </SwapOn>
            <SwapOff>
              <EyeSlashIcon
                className="size-7 cursor-pointer stroke-[1.5] text-[#155dfc]"
                onClick={handleShow}
              />
            </SwapOff>
          </Swap>
        </div>
        {role && role === "admin" && (
          <div className="flex items-center justify-end gap-2">
            <h2 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
              {t("nav.setting.company")} :
            </h2>
            <Select
              value={companyId || ""}
              onChange={(e) => {
                setCompanyId(e.target.value);
              }}
              data={companies}
              className="w-32"
            />
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.today_purchase")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {data?.today_purchases.total || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>

        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.week_purchase")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {data?.week_purchases.total || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>

        {isShowed && (
          <Card className="flex justify-between p-5">
            <div>
              <p>{t("nav.dashboards.month_purchase")}</p>
              <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
                {data?.month_purchases.total || 0}
              </p>
            </div>
            <Avatar
              size={12}
              classNames={{
                display: "mask is-squircle rounded-none",
              }}
              initialVariant="soft"
              initialColor="info"
            >
              <PresentationChartBarIcon className="size-6" />
            </Avatar>
          </Card>
        )}

        {isShowed && (
          <Card className="flex justify-between p-5">
            <div>
              <p>{t("nav.dashboards.company_balance")}</p>
              <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
                {extraData?.company_balance || 0}
              </p>
            </div>
            <Avatar
              size={12}
              classNames={{
                display: "mask is-squircle rounded-none",
              }}
              initialVariant="soft"
              initialColor="info"
            >
              <PresentationChartBarIcon className="size-6" />
            </Avatar>
          </Card>
        )}

        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.today_sale")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {data?.today_sales.total || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>

        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.week_sales")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {data?.week_sales.total || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>

        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.expiries_in_5days_purchases")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {data?.expired_in_5days_purchases || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>

        <Card className="flex justify-between p-5">
          <div>
            <p>{t("nav.dashboards.expired_purchase")}</p>
            <p className="this:info text-this dark:text-this-lighter mt-0.5 text-2xl font-medium">
              {extraData?.expired_purchases || 0}
            </p>
          </div>
          <Avatar
            size={12}
            classNames={{
              display: "mask is-squircle rounded-none",
            }}
            initialVariant="soft"
            initialColor="info"
          >
            <PresentationChartBarIcon className="size-6" />
          </Avatar>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
