import { ClockIcon } from "@heroicons/react/24/outline";
import DashboardsIcon from "assets/dualicons/pending.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/purchase";

const path = (root, item) => `${root}${item}`;

export const pendingPurchase = {
  id: "pendingPurchase",
  type: NAV_TYPE_ROOT,
  path: "/purchase",
  title: "Pending Purchase",
  transKey: "nav.purchase.pending",
  Icon: DashboardsIcon,
  childs: [
    {
      id: "pendingPurchase.pending",
      path: path(ROOT_DASHBOARDS, "/pending"),
      type: NAV_TYPE_ITEM,
      title: "Pending Purchase",
      transKey: "nav.purchase.pending",
      Icon: ClockIcon,
    },
  ],
};
