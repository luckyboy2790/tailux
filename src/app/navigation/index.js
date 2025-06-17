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
import { report } from "./report";
import { getSaleNav } from "./sale";
import { getSettingNav } from "./setting";
import { category } from "./category";
import { getBaseNavigation } from "./baseNavigation";

export const useNavigation = () => {
  const { user } = useAuthContext();
  const role = user?.role;

  // Default navigation data
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
    report,
    getPeopleNav(role),
    getSettingNav(role),
    concurrent_payments,
  ];

  // Check if role is 'buyer' and return only specific data
  if (role === "buyer") {
    returnData = [getPurchaseOrder(role), received];
  }

  // If the role is 'admin', add advanced delete option
  if (role === "admin") {
    returnData.push(advanced_delete);
  }

  return returnData;
};

export { getBaseNavigation };
