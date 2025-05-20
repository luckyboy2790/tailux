// sale.js
import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import SaleIcon from "assets/dualicons/sale.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_SALE = "/sale";
const path = (root, item) => `${root}${item}`;

export const getSaleNav = (role) => {
  const childs = [
    {
      id: "sale.list",
      path: path(ROOT_SALE, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Sales List",
      transKey: "nav.sale.sale_list",
      Icon: ClipboardDocumentListIcon,
    },
  ];

  if (role === "user") {
    childs.push({
      id: "sale.add",
      path: path(ROOT_SALE, "/add"),
      type: NAV_TYPE_ITEM,
      title: "Add Sale",
      transKey: "nav.sale.sale_add",
      Icon: DocumentPlusIcon,
    });
  }

  return {
    id: "sale",
    type: NAV_TYPE_ROOT,
    path: ROOT_SALE,
    title: "Sale",
    transKey: "nav.sale.sale",
    Icon: SaleIcon,
    childs,
  };
};
