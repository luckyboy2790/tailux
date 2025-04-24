import PaymentIcon from "assets/dualicons/delete.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_ADVANCED_DELETE = "/advanced_delete";

const path = (root, item) => `${root}${item}`;

export const advanced_delete = {
  id: "advanced_delete",
  type: NAV_TYPE_ROOT,
  path: "/advanced_delete",
  title: "Advanced Delete",
  transKey: "nav.advanced_delete.advanced_delete",
  Icon: PaymentIcon,
  childs: [
    {
      id: "advanced_delete.advanced_delete",
      path: path(ROOT_ADVANCED_DELETE, ""),
      type: NAV_TYPE_ITEM,
      title: "Payment",
      transKey: "nav.advanced_delete.advanced_delete",
      Icon: PaymentIcon,
    },
  ],
};
