import { useAuthContext } from "app/contexts/auth/context";
import { advanced_delete } from "./advancedDelete";
import { dashboards } from "./dashboards";
import { concurrent_payments } from "./payment";
import { pendingPayment } from "./pendingPayment";
import { pendingPurchase } from "./pendingPurchase";
import { getPeopleNav } from "./people";
import { product } from "./product";
import { purchase } from "./purchase";
import { purchaseOrder } from "./purchaseOrder";
import { received } from "./receivedOrder";
import { report } from "./report";
import { getSaleNav } from "./sale";
import { getSettingNav } from "./setting";

export const useNavigation = () => {
  const { user } = useAuthContext();

  const role = user?.role;

  const returnData = [
    dashboards,
    purchase,
    getSaleNav(role),
    pendingPurchase,
    pendingPayment,
    product,
    purchaseOrder,
    received,
    report,
    getPeopleNav(role),
    getSettingNav(role),
    concurrent_payments,
  ];

  if (role === "admin") {
    returnData.push(advanced_delete);
  }

  return returnData;
};

export { baseNavigation } from "./baseNavigation";
