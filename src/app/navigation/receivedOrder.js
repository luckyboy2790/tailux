import ReceiveIcon from "assets/dualicons/receive.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_RECEIVED = "/received-order";

const path = (root, item) => `${root}${item}`;

export const received = {
  id: "order",
  type: NAV_TYPE_ROOT,
  path: "/received-order",
  title: "Received Order",
  transKey: "nav.order.received",
  Icon: ReceiveIcon,
  childs: [
    {
      id: "order.order",
      path: path(ROOT_RECEIVED, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Received Order",
      transKey: "nav.order.received",
      Icon: ReceiveIcon,
    },
  ],
};
