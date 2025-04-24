import SettingIcon from "assets/dualicons/setting_data.svg?react";
import CompanyIcon from "assets/dualicons/company.svg?react";
import StoreIcon from "assets/dualicons/store.svg?react";
import SiteSutatusIcon from "assets/dualicons/siteStatus.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_PEOPLE = "/people";

const path = (root, item) => `${root}${item}`;

export const setting = {
  id: "setting",
  type: NAV_TYPE_ROOT,
  path: "/setting",
  title: "Setting",
  transKey: "nav.setting.setting",
  Icon: SettingIcon,
  childs: [
    {
      id: "setting.company",
      path: path(ROOT_PEOPLE, "/company"),
      type: NAV_TYPE_ITEM,
      title: "Customer",
      transKey: "nav.setting.company",
      Icon: CompanyIcon,
    },
    {
      id: "setting.store",
      path: path(ROOT_PEOPLE, "/store"),
      type: NAV_TYPE_ITEM,
      title: "Supplier",
      transKey: "nav.setting.store",
      Icon: StoreIcon,
    },
    {
      id: "setting.site_status",
      path: path(ROOT_PEOPLE, "/site_status"),
      type: NAV_TYPE_ITEM,
      title: "User",
      transKey: "nav.setting.site_status",
      Icon: SiteSutatusIcon,
    },
  ],
};
