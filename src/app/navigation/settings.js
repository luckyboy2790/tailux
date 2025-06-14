// Import Dependencies
import { UserIcon } from "@heroicons/react/24/outline";
import { BsFillShieldLockFill } from "react-icons/bs";
import { TbPalette } from "react-icons/tb";
import { FaGooglePlusSquare } from "react-icons/fa";

// Local Imports
import SettingIcon from "assets/dualicons/setting.svg?react";
import { NAV_TYPE_ITEM } from "constants/app.constant";

// ----------------------------------------------------------------------

export const settings = {
  id: "settings",
  type: NAV_TYPE_ITEM,
  path: "/settings",
  title: "Settings",
  title_translate: "Configuración",
  transKey: "nav.settings.settings",
  Icon: SettingIcon,
  childs: [
    {
      id: "general",
      type: NAV_TYPE_ITEM,
      path: "/settings/general",
      title: "General Setting",
      title_translate: "Configuración General",
      transKey: "nav.settings.general",
      Icon: UserIcon,
    },
    {
      id: "password",
      type: NAV_TYPE_ITEM,
      path: "/settings/password",
      title: "Password Setting",
      title_translate: "Configuración de Contraseña",
      transKey: "nav.settings.password",
      Icon: BsFillShieldLockFill,
    },
    {
      id: "google2fa",
      type: NAV_TYPE_ITEM,
      path: "/settings/google2fa",
      title: "Google2FA Setting",
      title_translate: "Configuración de Google2FA",
      transKey: "nav.settings.google2fa",
      Icon: FaGooglePlusSquare,
    },
    {
      id: "appearance",
      type: NAV_TYPE_ITEM,
      path: "/settings/appearance",
      title: "Appearance Setting",
      title_translate: "Configuración de Apariencia",
      transKey: "nav.settings.appearance",
      Icon: TbPalette,
    },
  ],
};
