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
import { sale } from "./sale";
import { setting } from "./setting";

export const navigation = [
  dashboards,
  purchase,
  sale,
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

export { baseNavigation } from "./baseNavigation";
