import { useAuthContext } from "app/contexts/auth/context";
import { advanced_delete } from "./advancedDelete";
import { dashboards } from "./dashboards";
import { concurrent_payments } from "./payment";
import { pendingPayment } from "./pendingPayment";
import { pendingPurchase } from "./pendingPurchase";
import { people } from "./people";
import { product } from "./product";
import { purchase } from "./purchase";
import { purchaseOrder } from "./purchaseOrder";
import { received } from "./receivedOrder";
import { report } from "./report";
import { getSaleNav } from "./sale";
import { setting } from "./setting";

export const useNavigation = () => {
  const { user } = useAuthContext();

  const role = user?.role;

  return [
    dashboards,
    purchase,
    getSaleNav(role),
    pendingPurchase,
    pendingPayment,
    product,
    purchaseOrder,
    received,
    report,
    people,
    setting,
    concurrent_payments,
    advanced_delete,
  ];
};

export { baseNavigation } from "./baseNavigation";
