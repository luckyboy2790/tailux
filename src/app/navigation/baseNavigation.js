import { NAV_TYPE_ITEM } from "constants/app.constant";
import DashboardsIcon from "assets/dualicons/dashboards.svg?react";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import SaleIcon from "assets/dualicons/sale.svg?react";
import PendingPurchaseIcon from "assets/dualicons/pending.svg?react";
import pendingPaymentIcon from "assets/dualicons/pending.svg?react";
import ProductIcon from "assets/dualicons/products.svg?react";
import PurchaseOrderIcon from "assets/dualicons/purchaseOrder.svg?react";
import ReceiveIcon from "assets/dualicons/receive.svg?react";
import ReportIcon from "assets/dualicons/report.svg?react";
import PeopleIcon from "assets/dualicons/people.svg?react";
import SettingIcon from "assets/dualicons/setting_data.svg?react";
import PaymentIcon from "assets/dualicons/payments.svg?react";
import AdvancedDeleteIcon from "assets/dualicons/delete.svg?react";

export const baseNavigation = [
  {
    id: "dashboards",
    type: NAV_TYPE_ITEM,
    path: "/dashboards",
    title: "Dashboards",
    transKey: "nav.dashboards.dashboards",
    Icon: DashboardsIcon,
  },
  {
    id: "purchase",
    type: NAV_TYPE_ITEM,
    path: "/purchases",
    title: "Purchase",
    transKey: "nav.purchase.purchase",
    Icon: PurchaseIcon,
  },
  {
    id: "sale",
    type: NAV_TYPE_ITEM,
    path: "/sales",
    title: "Sale",
    transKey: "nav.sale.sale",
    Icon: SaleIcon,
  },
  {
    id: "pendingPurchase",
    type: NAV_TYPE_ITEM,
    path: "/purchase",
    title: "Pending Purchase",
    transKey: "nav.purchase.pending",
    Icon: PendingPurchaseIcon,
  },
  {
    id: "pendingPayment",
    type: NAV_TYPE_ITEM,
    path: "/payment",
    title: "Pending Payment",
    transKey: "nav.payment.pending",
    Icon: pendingPaymentIcon,
  },
  {
    id: "product",
    type: NAV_TYPE_ITEM,
    path: "/product",
    title: "Product",
    transKey: "nav.product.product",
    Icon: ProductIcon,
  },
  {
    id: "purchaseOrder",
    type: NAV_TYPE_ITEM,
    path: "/purchase/order",
    title: "Order Purchase",
    transKey: "nav.purchase.order",
    Icon: PurchaseOrderIcon,
  },
  {
    id: "order",
    type: NAV_TYPE_ITEM,
    path: "/order",
    title: "Received Order",
    transKey: "nav.order.received",
    Icon: ReceiveIcon,
  },
  {
    id: "report",
    type: NAV_TYPE_ITEM,
    path: "/report",
    title: "Reports",
    transKey: "nav.report.report",
    Icon: ReportIcon,
  },
  {
    id: "people",
    type: NAV_TYPE_ITEM,
    path: "/people",
    title: "People",
    transKey: "nav.people.people",
    Icon: PeopleIcon,
  },
  {
    id: "setting",
    type: NAV_TYPE_ITEM,
    path: "/setting",
    title: "Setting",
    transKey: "nav.setting.setting",
    Icon: SettingIcon,
  },
  {
    id: "payments",
    type: NAV_TYPE_ITEM,
    path: "/concurrent_payments",
    title: "Payments",
    transKey: "nav.payment.concurrent_payments",
    Icon: PaymentIcon,
  },
  {
    id: "advanced_delete",
    type: NAV_TYPE_ITEM,
    path: "/advanced_delete",
    title: "Advanced Delete",
    transKey: "nav.advanced_delete.advanced_delete",
    Icon: AdvancedDeleteIcon,
  },
];
