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

const buyerRedirect = "/purchase-order/list";

export default function RoleRouteGuard({ children }) {
  const { user, isInitialized } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitialized || user?.role !== "buyer") return;

    const currentPath = location.pathname.replace(/\/$/, "");

    const isAllowed = buyerPermissions.some((p) =>
      typeof p === "string" ? p === currentPath : p.test(currentPath),
    );

    if (!isAllowed) {
      navigate(buyerRedirect, { replace: true });
    }
  }, [isInitialized, location.pathname, user, navigate]);

  return children;
}
