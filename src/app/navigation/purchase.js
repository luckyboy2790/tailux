import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
// import DashboardsIcon from "assets/dualicons/dashboards.svg?react";
import PurchaseIcon from "assets/dualicons/purchase.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/purchase";

const path = (root, item) => `${root}${item}`;

export const purchase = {
  id: "purchase",
  type: NAV_TYPE_ROOT,
  path: "/purchase",
  title: "",
  transKey: "nav.purchase.purchase",
  Icon: PurchaseIcon,
  childs: [
    {
      id: "purchase.list",
      path: path(ROOT_DASHBOARDS, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Purchases List",
      title_translate: "Lista de compras",
      transKey: "nav.purchase.purchase_list",
      Icon: ClipboardDocumentListIcon,
    },
    {
      id: "purchase.add",
      path: path(ROOT_DASHBOARDS, "/add"),
      type: NAV_TYPE_ITEM,
      title: "Add Purchase",
      title_translate: "Agregar compra",
      transKey: "nav.purchase.add_purchase",
      Icon: DocumentPlusIcon,
    },
  ],
};
