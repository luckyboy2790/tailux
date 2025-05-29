import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import SiteSutatusIcon from "assets/dualicons/siteStatus.svg?react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { FaPlus } from "react-icons/fa";
import { useDisclosure } from "hooks";
import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { IoCloseSharp } from "react-icons/io5";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const promise = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000),
  );

const PurchaseList = () => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { title: t("nav.setting.setting"), path: "/setting" },
    { title: t("nav.setting.site_status") },
  ];

  const [isOpen, { open, close }] = useDisclosure();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [settings, setSettings] = useState([]);

  const state = error ? "error" : success ? "success" : "pending";

  const messages = {
    pending: {
      Icon: ExclamationTriangleIcon,
      title: t("nav.confirm_message.sure"),
      description: "",
      actionText: t("nav.site_status.save"),
    },
    success: {
      title: t("nav.confirm_message.success"),
      description: "",
      actionText: t("nav.site_status.done"),
    },
  };

  const onOk = () => {
    setConfirmLoading(true);
    promise()
      .then(() => {
        setConfirmLoading(false);
        setSuccess(true);
        setError(false);
      })
      .catch(() => {
        setConfirmLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/api/site_setting/get?key=site_disable_time`,
      );

      const result = await response.json();

      setSettings(result.data);
    };

    fetchData();
  }, []);

  const handleAddTime = async () => {
    if (!start || !end) {
      alert("Please select start and end time.");
      return;
    }

    console.log(format(start, "HH:mm"));
    console.log(format(end, "HH:mm"));

    const newEntry = {
      start: format(start, "HH:mm"),
      end: format(end, "HH:mm"),
    };

    const updatedTimeline = [...settings, newEntry];

    console.log(updatedTimeline);

    const res = await fetch(`${API_URL}/api/site_setting/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "site_disable_time",
        value: JSON.stringify(updatedTimeline),
      }),
    });

    if (res.ok) {
      setSettings(updatedTimeline);
      setStart(null);
      setEnd(null);
    } else {
      alert("Failed to save time range.");
    }
  };

  const handleRemoveTime = async (index) => {
    const updatedTimeline = settings.filter((_, i) => i !== index);

    const res = await fetch(`${API_URL}/api/site_setting/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "site_disable_time",
        value: JSON.stringify(updatedTimeline),
      }),
    });

    if (res.ok) {
      setSettings(updatedTimeline);
    } else {
      alert("Failed to remove time range.");
    }
  };

  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <SiteSutatusIcon className="size-6 shrink-0 stroke-[1.5]" />
              <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
                {t("nav.setting.site_status")}
              </h2>
            </div>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-5 sm:px-5 dark:shadow-none">
            <h3 className="dark:text-dark-50 truncate text-lg font-medium tracking-wide text-gray-800">
              {t("nav.site_status.disable_all_domains")}
            </h3>

            <Button
              color="warning"
              onClick={() => {
                setSuccess(false);
                setError(false);
                open();
              }}
            >
              {t("nav.site_status.disable_site")}
            </Button>
          </Box>

          <Box className="shadow-soft dark:bg-dark-700 flex flex-col gap-4 rounded-lg bg-white px-4 py-4 sm:gap-7 sm:px-5 dark:shadow-none">
            <h3 className="dark:text-dark-50 truncate text-lg font-medium tracking-wide text-gray-800">
              {t("nav.site_status.disable_time_for_secretary")}
            </h3>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex w-auto items-center gap-3">
                <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                  {t("nav.site_status.start")} :
                </h3>
                <DatePicker
                  options={{
                    enableTime: true,
                    noCalendar: true,
                  }}
                  value={start ?? undefined}
                  onChange={(date) => setStart(date)}
                  placeholder={t("nav.select.select_time")}
                  hasCalenderIcon={false}
                />
              </div>
              <div className="flex w-auto items-center gap-3">
                <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                  {t("nav.site_status.end")} :
                </h3>
                <DatePicker
                  options={{
                    enableTime: true,
                    noCalendar: true,
                  }}
                  value={end ?? undefined}
                  onChange={(date) => setEnd(date)}
                  placeholder={t("nav.select.select_time")}
                  hasCalenderIcon={false}
                />
              </div>
              <Button
                color="primary"
                className="flex items-center gap-2"
                onClick={handleAddTime}
              >
                <FaPlus />
                {t("nav.site_status.add")}
              </Button>
            </div>

            <div className="flex w-full flex-col gap-5">
              {settings.map((item, index) => (
                <Box
                  key={index}
                  className="border-gray-150 dark:border-dark-600 dark:bg-dark-450 bg-gray-150 flex items-center justify-between rounded-lg border px-4 py-4 sm:px-5"
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="flex items-center justify-start gap-2">
                      <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                        {t("nav.site_status.from")}
                      </h3>
                      <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                        {item.start}
                      </h3>
                    </div>

                    <div>
                      <div className="flex items-center justify-start gap-2">
                        <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                          {t("nav.site_status.to")}
                        </h3>
                        <h3 className="dark:text-dark-50 truncate text-sm font-medium tracking-wide text-gray-800">
                          {item.end}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <IoCloseSharp
                      className="dark:text-dark-50 cursor-pointer truncate text-sm font-medium tracking-wide text-gray-800"
                      onClick={() => handleRemoveTime(index)}
                    />
                  </div>
                </Box>
              ))}
            </div>
          </Box>
        </div>
      </div>
      <ConfirmModal
        show={isOpen}
        onClose={close}
        messages={messages}
        onOk={onOk}
        confirmLoading={confirmLoading}
        state={state}
      />
    </Page>
  );
};

export default PurchaseList;
