import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Avatar, AvatarDot, Badge, Button } from "components/ui";
import { useThemeContext } from "app/contexts/theme/context";
import AlarmIcon from "assets/dualicons/alarm.svg?react";
import GirlEmptyBox from "assets/illustrations/girl-empty-box.svg?react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const types = {
  purchase: {
    title: "Purchase",
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

export function Notifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [notificationAmount, setNotificationAmount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [cookies] = useCookies(["authToken"]);
  const token = cookies.authToken;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/api/notification/get_notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      setNotificationAmount(result.data.notification_count);

      switch (activeTab) {
        case 0:
          setNotifications(result.data.notifications);
          break;
        case 1:
          setNotifications(result.data.purchase_notifications);
          break;
        case 2:
          setNotifications(result.data.payment_notifications);
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [token, activeTab, isChanged]);

  const removeNotification = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notification/delete_notification/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        toast.error("Failed to remove notification");

        throw new Error("Network response was not ok");
      }

      toast.success("Notification removed successfully");

      setIsChanged(!isChanged);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 0) return true;
    if (activeTab === 1 && notification.message === "purchase_approved") {
      return true;
    }
    if (activeTab === 2 && notification.message === "payment_approved") {
      return true;
    }
    return false;
  });

  return (
    <Popover className="relative flex">
      <PopoverButton
        as={Button}
        variant="flat"
        isIcon
        className="relative size-9 rounded-full"
      >
        <AlarmIcon className="dark:text-dark-100 size-6 text-gray-900" />
        {notificationAmount > 0 && (
          <AvatarDot
            color="error"
            isPing
            className="top-0 ltr:right-0 rtl:left-0"
          />
        )}
      </PopoverButton>
      <Transition
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <PopoverPanel
          anchor={{ to: "bottom end", gap: 8 }}
          className="border-gray-150 shadow-soft dark:border-dark-800 dark:bg-dark-700 dark:shadow-soft-dark z-70 mx-4 flex h-[min(32rem,calc(100vh-6rem))] w-[calc(100vw-2rem)] flex-col rounded-lg border bg-white sm:m-0 sm:w-80"
        >
          {({ close }) => (
            <div className="flex grow flex-col overflow-hidden">
              <div className="dark:bg-dark-800 rounded-t-lg bg-gray-100">
                <div className="flex items-center justify-between px-4 pt-2">
                  <div className="flex items-center gap-2">
                    <h3 className="dark:text-dark-100 font-medium text-gray-800">
                      {t("nav.notification.notifications")}
                    </h3>
                    {notificationAmount > 0 && (
                      <Badge
                        color="primary"
                        className="h-5 rounded-full px-1.5"
                        variant="soft"
                      >
                        {notificationAmount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <TabGroup
                as={Fragment}
                selectedIndex={activeTab}
                onChange={setActiveTab}
              >
                <TabList className="hide-scrollbar dark:bg-dark-800 flex shrink-0 overflow-x-auto scroll-smooth bg-gray-100 px-3">
                  <Tab
                    onFocus={(e) => {
                      e.target.parentNode.scrollLeft =
                        e.target.offsetLeft -
                        e.target.parentNode.offsetWidth / 2;
                    }}
                    className={({ selected }) =>
                      clsx(
                        "shrink-0 scroll-mx-16 border-b-2 px-3 py-2 font-medium whitespace-nowrap",
                        selected
                          ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                          : "dark:hover:text-dark-100 dark:focus:text-dark-100 border-transparent hover:text-gray-800 focus:text-gray-800",
                      )
                    }
                    as={Button}
                    unstyled
                  >
                    {t("nav.notification.all")}
                  </Tab>
                  {typesKey.map((key) => (
                    <Tab
                      onFocus={(e) => {
                        e.target.parentNode.scrollLeft =
                          e.target.offsetLeft -
                          e.target.parentNode.offsetWidth / 2;
                      }}
                      key={key}
                      className={({ selected }) =>
                        clsx(
                          "shrink-0 scroll-mx-16 border-b-2 px-3 py-2 font-medium whitespace-nowrap",
                          selected
                            ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400"
                            : "dark:hover:text-dark-100 dark:focus:text-dark-100 border-transparent hover:text-gray-800 focus:text-gray-800",
                        )
                      }
                      as={Button}
                      unstyled
                    >
                      {t(`nav.notification.${key}`)}
                    </Tab>
                  ))}
                </TabList>
                {(notifications.length > 0 && activeTab === 0) ||
                filteredNotifications.length > 0 ? (
                  <TabPanels as={Fragment}>
                    <TabPanel className="custom-scrollbar grow space-y-4 overflow-x-hidden overflow-y-auto p-4 outline-hidden">
                      {notifications.map((item) => (
                        <NotificationItem
                          key={item.id}
                          remove={removeNotification}
                          data={item}
                        />
                      ))}
                    </TabPanel>
                    {typesKey.map((key) => (
                      <TabPanel
                        key={key}
                        className="custom-scrollbar scrollbar-hide grow space-y-4 overflow-x-hidden overflow-y-auto p-4"
                      >
                        {filteredNotifications.map((item) => (
                          <NotificationItem
                            key={item.id}
                            remove={removeNotification}
                            data={item}
                          />
                        ))}
                      </TabPanel>
                    ))}
                  </TabPanels>
                ) : (
                  <Empty />
                )}
              </TabGroup>
              {((notifications.length > 0 && activeTab === 0) ||
                filteredNotifications.length > 0) && (
                <div className="dark:bg-dark-800 shrink-0 overflow-hidden rounded-b-lg bg-gray-100">
                  <Button
                    component={Link}
                    to="/notification/list"
                    className="w-full rounded-t-none"
                    onClick={close}
                  >
                    <span>{t("nav.notification.view_all_notification")}</span>
                  </Button>
                </div>
              )}
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

function Empty() {
  const { primaryColorScheme: primary, darkColorScheme: dark } =
    useThemeContext();
  return (
    <div className="grid grow place-items-center text-center">
      <div className="">
        <GirlEmptyBox
          className="mx-auto w-40"
          style={{ "--primary": primary[500], "--dark": dark[500] }}
        />
        <div className="mt-6">
          <p>No new notifications yet</p>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ data, remove }) {
  const { t } = useTranslation();

  let Icon;

  if (data.message.includes("purchase")) {
    Icon = types["purchase"].Icon;
  } else if (data.message.includes("payment")) {
    Icon = types["payment"].Icon;
  }

  return (
    <div className="group flex items-center justify-between gap-3">
      <div className="flex min-w-0 gap-3">
        <Avatar
          size={10}
          initialColor={types[data.message]?.color}
          classNames={{ display: "rounded-lg" }}
        >
          <Icon className="size-4.5" />
        </Avatar>
        <div className="min-w-0">
          <p className="dark:text-dark-100 -mt-0.5 truncate font-medium text-gray-800">
            {t(`nav.notification.${data.message}`)}
          </p>
          <div className="mt-0.5 truncate text-xs">{data.reference_no}</div>
          <div className="dark:text-dark-300 mt-1 truncate text-xs text-gray-400">
            {dayjs(data.created_at).format("DD/MM/YYYY HH:mm")}
          </div>
        </div>
      </div>
      <Button
        variant="flat"
        isIcon
        onClick={() => remove(data.id)}
        className="size-7 rounded-full opacity-0 group-hover:opacity-100 ltr:-mr-2 rtl:-ml-2"
      >
        <ArchiveBoxXMarkIcon className="size-4" />
      </Button>
    </div>
  );
}

NotificationItem.propTypes = {
  data: PropTypes.object,
  remove: PropTypes.func,
};
