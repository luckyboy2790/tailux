import ReceiveIcon from "assets/dualicons/receive.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_RECEIVED = "/order";

const path = (root, item) => `${root}${item}`;

export const received = {
  id: "order",
  type: NAV_TYPE_ROOT,
  path: "/order",
  title: "Received Order",
  transKey: "nav.order.received",
  Icon: ReceiveIcon,
  childs: [
    {
      id: "order.order",
      path: path(ROOT_RECEIVED, "/order"),
      type: NAV_TYPE_ITEM,
      title: "Received Order",
      transKey: "nav.order.received",
      Icon: ReceiveIcon,
    },
  ],
};
