import {
  ChartPieIcon,
  BellAlertIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import ReportIcon from "assets/dualicons/report.svg?react";
import ProductIcon from "assets/dualicons/products.svg?react";
import SaleIcon from "assets/dualicons/sale.svg?react";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import SupplierIcon from "assets/dualicons/supplier.svg?react";
import IncomeIcon from "assets/dualicons/income.svg?react";

import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_REPORT = "/report";

const path = (root, item) => `${root}${item}`;

export const report = {
  id: "report",
  type: NAV_TYPE_ROOT,
  path: "/report",
  title: "Reports",
  transKey: "nav.report.report",
  Icon: ReportIcon,
  childs: [
    {
      id: "report.overview_chart",
      path: path(ROOT_REPORT, "/overview_chart"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.overview_chart",
      Icon: ChartPieIcon,
    },
    {
      id: "report.company_chart",
      path: path(ROOT_REPORT, "/company_chart"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.company_chart",
      Icon: ChartPieIcon,
    },
    {
      id: "report.store_chart",
      path: path(ROOT_REPORT, "/store_chart"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.store_chart",
      Icon: ChartPieIcon,
    },
    {
      id: "report.product_quantity_alert",
      path: path(ROOT_REPORT, "/product_quantity_alert"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.product_quantity_alert",
      Icon: BellAlertIcon,
    },
    {
      id: "report.product_expiry_alert",
      path: path(ROOT_REPORT, "/product_expiry_alert"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.product_expiry_alert",
      Icon: BellAlertIcon,
    },
    {
      id: "report.expired_purchases_report",
      path: path(ROOT_REPORT, "/expired_purchases_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.expired_purchases_report",
      Icon: PurchaseIcon,
    },
    {
      id: "report.product_report",
      path: path(ROOT_REPORT, "/product_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.product_report",
      Icon: ProductIcon,
    },
    {
      id: "report.sales_report",
      path: path(ROOT_REPORT, "/sales_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.sales_report",
      Icon: SaleIcon,
    },
    {
      id: "report.purchases_report",
      path: path(ROOT_REPORT, "/purchases_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.purchases_report",
      Icon: PurchaseIcon,
    },
    {
      id: "report.payment_report",
      path: path(ROOT_REPORT, "/payment_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.payment_report",
      Icon: PaymentIcon,
    },
    {
      id: "report.income_report",
      path: path(ROOT_REPORT, "/income_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.income_report",
      Icon: IncomeIcon,
    },
    {
      id: "report.customers_report",
      path: path(ROOT_REPORT, "/customers_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.customers_report",
      Icon: UsersIcon,
    },
    {
      id: "report.suppliers_report",
      path: path(ROOT_REPORT, "/suppliers_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.suppliers_report",
      Icon: SupplierIcon,
    },
    {
      id: "report.users_report",
      path: path(ROOT_REPORT, "/users_report"),
      type: NAV_TYPE_ITEM,
      title: "Overview Chart",
      transKey: "nav.report.users_report",
      Icon: UsersIcon,
    },
  ],
};
