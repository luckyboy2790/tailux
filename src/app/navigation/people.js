import { UsersIcon } from "@heroicons/react/24/outline";
import PeopleIcon from "assets/dualicons/people.svg?react";
import SupplierIcon from "assets/dualicons/supplier.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_PEOPLE = "/people";

const path = (root, item) => `${root}${item}`;

export const people = {
  id: "people",
  type: NAV_TYPE_ROOT,
  path: "/people",
  title: "People",
  transKey: "nav.people.people",
  Icon: PeopleIcon,
  childs: [
    {
      id: "people.customer",
      path: path(ROOT_PEOPLE, "/customer"),
      type: NAV_TYPE_ITEM,
      title: "Customer",
      transKey: "nav.people.customer",
      Icon: UsersIcon,
    },
    {
      id: "people.supplier",
      path: path(ROOT_PEOPLE, "/supplier"),
      type: NAV_TYPE_ITEM,
      title: "Supplier",
      transKey: "nav.people.supplier",
      Icon: SupplierIcon,
    },
    {
      id: "people.user",
      path: path(ROOT_PEOPLE, "/user"),
      type: NAV_TYPE_ITEM,
      title: "User",
      transKey: "nav.people.user",
      Icon: UsersIcon,
    },
  ],
};
