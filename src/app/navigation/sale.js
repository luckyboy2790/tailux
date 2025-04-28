import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import SaleIcon from "assets/dualicons/sale.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/sale";

const path = (root, item) => `${root}${item}`;

export const sale = {
  id: "sale",
  type: NAV_TYPE_ROOT,
  path: "/sale",
  title: "Sale",
  transKey: "nav.sale.sale",
  Icon: SaleIcon,
  childs: [
    {
      id: "sale.list",
      path: path(ROOT_DASHBOARDS, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Sales List",
      transKey: "nav.sale.sale_list",
      Icon: ClipboardDocumentListIcon,
    },
  ],
};
