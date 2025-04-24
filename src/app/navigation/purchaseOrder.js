import PurchaseOrderIcon from "assets/dualicons/purchaseOrder.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/purchase";

const path = (root, item) => `${root}${item}`;

export const purchaseOrder = {
  id: "purchaseOrder",
  type: NAV_TYPE_ROOT,
  path: "/purchase/order",
  title: "Order Purchase",
  transKey: "nav.purchase.order",
  Icon: PurchaseOrderIcon,
  childs: [
    {
      id: "purchase.order",
      path: path(ROOT_DASHBOARDS, "/order"),
      type: NAV_TYPE_ITEM,
      title: "Order Purchase",
      transKey: "nav.purchase.order",
      Icon: PurchaseOrderIcon,
    },
  ],
};
