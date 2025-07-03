import { useAuthContext } from "app/contexts/auth/context";
import { advanced_delete } from "./advancedDelete";
import { dashboards } from "./dashboards";
import { concurrent_payments } from "./payment";
import { pendingPayment } from "./pendingPayment";
import { pendingPurchase } from "./pendingPurchase";
import { getPeopleNav } from "./people";
import { product } from "./product";
import { purchase } from "./purchase";
import { getPurchaseOrder } from "./purchaseOrder";
import { received } from "./receivedOrder";
import { getReportNav } from "./report";
import { getSaleNav } from "./sale";
import { getSettingNav } from "./setting";
import { category } from "./category";
import { getBaseNavigation } from "./baseNavigation";

export const useNavigation = () => {
  const { user } = useAuthContext();
  const role = user?.role;

  let returnData = [
    dashboards,
    purchase,
    getSaleNav(role),
    pendingPurchase,
    pendingPayment,
    product,
    getPurchaseOrder(role),
    received,
    category,
    getReportNav(role),
    getPeopleNav(role),
  ];

  if (role === "buyer") {
    returnData = [getPurchaseOrder(role), received];
  }

  if (role === "admin" || role === "user") {
    returnData.push(getSettingNav(role));
  }

  if (role !== "buyer") {
    returnData.push(concurrent_payments);
  }

  if (role === "admin" || role === "user") {
    returnData.push(advanced_delete);
  }

  return returnData;
};

export { getBaseNavigation };
