import { LiaSitemapSolid } from "react-icons/lia";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_DASHBOARDS = "/category";

const path = (root, item) => `${root}${item}`;

export const category = {
  id: "category",
  type: NAV_TYPE_ROOT,
  path: "/category",
  title: "Category",
  transKey: "nav.category.category",
  Icon: LiaSitemapSolid,
  childs: [
    {
      id: "category.list",
      path: path(ROOT_DASHBOARDS, "/list"),
      type: NAV_TYPE_ITEM,
      title: "Category",
      transKey: "nav.category.category",
      Icon: LiaSitemapSolid,
    },
  ],
};
