import { ClockIcon } from "@heroicons/react/24/outline";
import DashboardsIcon from "assets/dualicons/pending.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/payment";

const path = (root, item) => `${root}${item}`;

export const pendingPayment = {
  id: "pendingPayment",
  type: NAV_TYPE_ROOT,
  path: "/payment",
  title: "Pending Payment",
  transKey: "nav.payment.pending",
  Icon: DashboardsIcon,
  childs: [
    {
      id: "pendingPayment.pending",
      path: path(ROOT_DASHBOARDS, "/pending"),
      type: NAV_TYPE_ITEM,
      title: "Pending Payment",
      transKey: "nav.payment.pending",
      Icon: ClockIcon,
    },
  ],
};
