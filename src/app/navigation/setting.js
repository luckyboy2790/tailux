import SettingIcon from "assets/dualicons/setting_data.svg?react";
import CompanyIcon from "assets/dualicons/company.svg?react";
import StoreIcon from "assets/dualicons/store.svg?react";
import SiteSutatusIcon from "assets/dualicons/siteStatus.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_PEOPLE = "/setting";

const path = (root, item) => `${root}${item}`;

export const getSettingNav = (role) => {
  const childs = [];

  if (role !== "user") {
    childs.push(
      {
        id: "setting.company",
        path: path(ROOT_PEOPLE, "/company"),
        type: NAV_TYPE_ITEM,
        title: "Company",
        title_translate: "Empresa",
        transKey: "nav.setting.company",
        Icon: CompanyIcon,
      },
      {
        id: "setting.store",
        path: path(ROOT_PEOPLE, "/store"),
        type: NAV_TYPE_ITEM,
        title: "Store",
        title_translate: "Tienda",
        transKey: "nav.setting.store",
        Icon: StoreIcon,
      },
    );
  }

  if (role === "admin" || role === "user") {
    childs.push({
      id: "setting.site_status",
      path: path(ROOT_PEOPLE, "/site_status"),
      type: NAV_TYPE_ITEM,
      title: "Site Status",
      title_translate: "Estado del sitio",
      transKey: "nav.setting.site_status",
      Icon: SiteSutatusIcon,
    });
  }

  return {
    id: "setting",
    type: NAV_TYPE_ROOT,
    path: "/setting",
    title: "Setting",
    title_translate: "Configuración",
    transKey: "nav.setting.setting",
    Icon: SettingIcon,
    childs,
  };
};
