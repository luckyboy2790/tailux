// import { HomeIcon } from "@heroicons/react/24/outline";
import ProductIcon from "assets/dualicons/products.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_PRODUCTS = "/product";

const path = (root, item) => `${root}${item}`;

export const product = {
  id: "product",
  type: NAV_TYPE_ROOT,
  path: "/product",
  title: "Product",
  transKey: "nav.product.product",
  Icon: ProductIcon,
  childs: [
    {
      id: "product.list",
      path: path(ROOT_PRODUCTS, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Product",
      transKey: "nav.product.product",
      Icon: ProductIcon,
    },
  ],
};
