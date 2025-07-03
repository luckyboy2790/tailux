import { useEffect } from "react";
import { useAuthContext } from "./context";
import { useLocation, useNavigate } from "react-router";

const buyerPermissions = [
  "/purchase-order/list",
  "/purchase-order/add",
  "/received-order/list",
  /^\/purchase-order\/receive\/[^/]+$/,
  /^\/received-order\/edit\/[^/]+$/,
];

const adminDenied = [
  "/sale/add",
  /^\/sale\/edit\/[^/]+$/,
  "/purchase-order/add",
  /^\/purchase-order\/edit\/[^/]+$/,
];

const userDenied = [
  "/people/user",
  "/setting/company",
  "/setting/store",
  "/report/users_report",
];

const secretaryDenied = [
  "/people/user",
  "/setting/company",
  "/setting/store",
  "/setting/site_status",
  "/advanced_delete/form",
  "/report/users_report",
];

const buyerRedirect = "/purchase-order/list";

export default function RoleRouteGuard({ children }) {
  const { user, isInitialized } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized || !user) return;

    const currentPath = location.pathname.replace(/\/$/, "");
    const role = user?.role;

    let isAllowed = true;

    if (role === "buyer") {
      isAllowed = buyerPermissions.some((p) =>
        typeof p === "string" ? p === currentPath : p.test(currentPath),
      );
    } else if (role === "admin") {
      isAllowed = !adminDenied.some((p) =>
        typeof p === "string" ? p === currentPath : p.test(currentPath),
      );
    } else if (role === "user") {
      isAllowed = !userDenied.some((p) =>
        typeof p === "string" ? p === currentPath : p.test(currentPath),
      );
    } else if (role === "secretary") {
      isAllowed = !secretaryDenied.some((p) =>
        typeof p === "string" ? p === currentPath : p.test(currentPath),
      );
    }

    if (!isAllowed) {
      navigate(role === "buyer" ? buyerRedirect : "/dashboards/home", {
        replace: true,
      });
    }
  }, [isInitialized, location.pathname, user, navigate]);

  return children;
}
