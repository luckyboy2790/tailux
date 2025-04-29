import { Avatar, Card } from "components/ui";
import { useTranslation } from "react-i18next";
import { FiPieChart } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";
import {
  TfiInfoAlt,
  TfiAlarmClock,
  TfiHarddrives,
  TfiWallet,
  TfiReceipt,
  TfiMobile,
  TfiStar,
  TfiUser,
} from "react-icons/tfi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router";

const Statistics = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const buttonData = [
    {
      title: t("nav.report.company_chart"),
      icon: <FiPieChart className="size-5" />,
      link: "/report/company_chart",
    },
    {
      title: t("nav.report.store_chart"),
      icon: <IoBarChartOutline className="size-5" />,
      link: "/report/store_chart",
    },
    {
      title: t("nav.report.product_quantity_alert"),
      icon: <TfiInfoAlt className="size-5" />,
      link: "/report/product_quantity_alert",
    },
    {
      title: t("nav.report.expired_purchases_report"),
      icon: <TfiAlarmClock className="size-5" />,
      link: "/report/expired_purchases_report",
    },
    {
      title: t("nav.report.product_report"),
      icon: <TfiHarddrives className="size-5" />,
      link: "/report/product_report",
    },
    {
      title: t("nav.report.sales_report"),
      icon: <AiOutlineShoppingCart className="size-5" />,
      link: "/report/sales_report",
    },
    {
      title: t("nav.report.purchases_report"),
      icon: <TfiWallet className="size-5" />,
      link: "/report/purchases_report",
    },
    {
      title: t("nav.report.payment_report"),
      icon: <TfiReceipt className="size-5" />,
      link: "/report/payment_report",
    },
    {
      title: t("nav.report.income_report"),
      icon: <TfiReceipt className="size-5" />,
      link: "/report/income_report",
    },
    {
      title: t("nav.report.customers_report"),
      icon: <TfiMobile className="size-5" />,
      link: "/report/customers_report",
    },
    {
      title: t("nav.report.suppliers_report"),
      icon: <TfiStar className="size-5" />,
      link: "/report/suppliers_report",
    },
    {
      title: t("nav.report.users_report"),
      icon: <TfiUser className="size-5" />,
      link: "/report/users_report",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {buttonData.map((item, index) => (
        <Card
          className="cursor-pointer p-4.5"
          key={index}
          onClick={() => {
            navigate(item.link);
          }}
        >
          <div className="flex min-w-0 items-center justify-between">
            <div>
              <p className="dark:text-dark-100 text-base font-semibold text-gray-800">
                {item.title}
              </p>
            </div>
            <Avatar
              size={10}
              classNames={{ display: "mask is-star rounded-none" }}
            >
              {item.icon}
            </Avatar>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Statistics;
