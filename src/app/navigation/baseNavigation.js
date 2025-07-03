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
import { LiaSitemapSolid } from "react-icons/lia";

export const getBaseNavigation = (role) => {
  let baseNavigation = [
    {
      id: "dashboards",
      type: NAV_TYPE_ITEM,
      path: "/dashboards",
      title: "Dashboards",
      title_translate: "Tablero",
      transKey: "nav.dashboards.dashboards",
      Icon: DashboardsIcon,
    },
    {
      id: "purchase",
      type: NAV_TYPE_ITEM,
      path: "/purchase",
      title: "Purchase",
      title_translate: "Compra",
      transKey: "nav.purchase.purchase",
      Icon: PurchaseIcon,
    },
    {
      id: "sale",
      type: NAV_TYPE_ITEM,
      path: "/sale",
      title: "Sale",
      title_translate: "Venta",
      transKey: "nav.sale.sale",
      Icon: SaleIcon,
    },
    {
      id: "pendingPurchase",
      type: NAV_TYPE_ITEM,
      path: "/pending-data/purchase",
      title: "Pending Purchase",
      title_translate: "Compra pendiente",
      transKey: "nav.purchase.pending",
      Icon: PendingPurchaseIcon,
    },
    {
      id: "pendingPayment",
      type: NAV_TYPE_ITEM,
      path: "/payment",
      title: "Pending Payment",
      title_translate: "Pago pendiente",
      transKey: "nav.payment.pending",
      Icon: pendingPaymentIcon,
    },
    {
      id: "product",
      type: NAV_TYPE_ITEM,
      path: "/product",
      title: "Product",
      title_translate: "Producto",
      transKey: "nav.product.product",
      Icon: ProductIcon,
    },
    {
      id: "purchaseOrder",
      type: NAV_TYPE_ITEM,
      path: "/purchase-order/list",
      title: "Order Purchase",
      title_translate: "Orden de compra",
      transKey: "nav.purchase.order",
      Icon: PurchaseOrderIcon,
    },
    {
      id: "order",
      type: NAV_TYPE_ITEM,
      path: "/received-order/list",
      title: "Received Order",
      title_translate: "Orden recibida",
      transKey: "nav.order.received",
      Icon: ReceiveIcon,
    },
    {
      id: "category",
      type: NAV_TYPE_ITEM,
      path: "/category",
      title: "Category",
      title_translate: "Categoria",
      transKey: "nav.category.category",
      Icon: LiaSitemapSolid,
    },
    {
      id: "report",
      type: NAV_TYPE_ITEM,
      path: "/report",
      title: "Reports",
      title_translate: "Reporte",
      transKey: "nav.report.report",
      Icon: ReportIcon,
    },
    {
      id: "people",
      type: NAV_TYPE_ITEM,
      path: "/people",
      title: "People",
      title_translate: "Persona",
      transKey: "nav.people.people",
      Icon: PeopleIcon,
    },
  ];

  if (role === "admin" || role === "user") {
    baseNavigation.push({
      id: "setting",
      type: NAV_TYPE_ITEM,
      path: role === "admin" ? "/setting" : "/setting/site_status",
      title: "Setting",
      title_translate: "Configuración",
      transKey: "nav.setting.setting",
      Icon: SettingIcon,
    });
  }

  if (role !== "buyer") {
    baseNavigation.push({
      id: "payments",
      type: NAV_TYPE_ITEM,
      path: "/concurrent_payments",
      title: "Payments",
      title_translate: "Pago concurrente",
      transKey: "nav.payment.concurrent_payments",
      Icon: PaymentIcon,
    });
  }

  if (role === "admin") {
    baseNavigation.push({
      id: "advanced_delete",
      type: NAV_TYPE_ITEM,
      path: "/advanced_delete",
      title: "Advanced Delete",
      title_translate: "Eliminación avanzada",
      transKey: "nav.advanced_delete.advanced_delete",
      Icon: AdvancedDeleteIcon,
    });
  }

  if (role === "buyer") {
    baseNavigation = [
      {
        id: "purchaseOrder",
        type: NAV_TYPE_ITEM,
        path: "/purchase-order/list",
        title: "Order Purchase",
        title_translate: "Orden de compra",
        transKey: "nav.purchase.order",
        Icon: PurchaseOrderIcon,
      },
      {
        id: "order",
        type: NAV_TYPE_ITEM,
        path: "/received-order/list",
        title: "Received Order",
        title_translate: "Orden recibida",
        transKey: "nav.order.received",
        Icon: ReceiveIcon,
      },
    ];
  }

  return baseNavigation;
};

export default getBaseNavigation;
