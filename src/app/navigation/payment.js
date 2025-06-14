import PaymentIcon from "assets/dualicons/payments.svg?react";
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from "constants/app.constant";

const ROOT_PAYMENTS = "/concurrent_payments";

const path = (root, item) => `${root}${item}`;

export const concurrent_payments = {
  id: "payments",
  type: NAV_TYPE_ROOT,
  path: "/concurrent_payments",
  title: "",
  transKey: "nav.payment.concurrent_payments",
  Icon: PaymentIcon,
  childs: [
    {
      id: "payments.concurrent_payments",
      path: path(ROOT_PAYMENTS, "/form"),
      type: NAV_TYPE_ITEM,
      title: "Concurrent Payment",
      title_translate: "Pago concurrente",
      transKey: "nav.payment.concurrent_payments",
      Icon: PaymentIcon,
    },
  ],
};
