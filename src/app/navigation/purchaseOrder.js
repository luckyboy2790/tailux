import PurchaseOrderIcon from "assets/dualicons/purchaseOrder.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/purchase-order";

const path = (root, item) => `${root}${item}`;

export const getPurchaseOrder = (role) => {
  const childs = [
    {
      id: "purchase.order",
      path: path(ROOT_DASHBOARDS, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Order Purchase",
      transKey: "nav.purchase.order",
      Icon: PurchaseOrderIcon,
    },
  ];

  if (role === "user" || role === "secretary") {
    childs.push({
      id: "purchase.order.add",
      path: path(ROOT_DASHBOARDS, "/add"),
      type: NAV_TYPE_ITEM,
      title: "Add Order Purchase",
      transKey: "nav.purchase.add_purchase_order",
      Icon: PurchaseOrderIcon,
    });
  }

  return {
    id: "purchaseOrder",
    type: NAV_TYPE_ROOT,
    path: "/purchase-order",
    title: "Order Purchase",
    transKey: "nav.purchase.order",
    Icon: PurchaseOrderIcon,
    childs,
  };
};
