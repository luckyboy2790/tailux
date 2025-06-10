// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/home")).default,
              }),
            },
          ],
        },
        {
          path: "purchase",
          children: [
            {
              index: true,
              element: <Navigate to="/purchase/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (await import("app/pages/purchase/purchaseList"))
                  .default,
              }),
            },
            {
              path: "add",
              lazy: async () => ({
                Component: (await import("app/pages/purchase/addPurchase"))
                  .default,
              }),
            },
            {
              path: "edit/:id",
              lazy: async () => ({
                Component: (await import("app/pages/purchase/editPurchase"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "sale",
          children: [
            {
              index: true,
              element: <Navigate to="/sale/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (await import("app/pages/sales/salesList")).default,
              }),
            },
            {
              path: "edit/:id",
              lazy: async () => ({
                Component: (await import("app/pages/sales/editSale")).default,
              }),
            },
            {
              path: "add",
              lazy: async () => ({
                Component: (await import("app/pages/sales/addSale")).default,
              }),
            },
          ],
        },
        {
          path: "pending-data",
          children: [
            {
              index: true,
              element: <Navigate to="/pending-data/purchase" />,
            },
            {
              path: "purchase",
              lazy: async () => ({
                Component: (
                  await import("app/pages/purchase/pendingPurchaseList")
                ).default,
              }),
            },
          ],
        },
        {
          path: "payment",
          children: [
            {
              index: true,
              element: <Navigate to="/payment/pending" />,
            },
            {
              path: "pending",
              lazy: async () => ({
                Component: (
                  await import("app/pages/payment/pendingPaymentList")
                ).default,
              }),
            },
          ],
        },
        {
          path: "payments",
          children: [
            {
              path: ":type/:purchase_id",
              lazy: async () => ({
                Component: (await import("app/pages/payment/paymentList"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "preturn",
          children: [
            {
              path: "list/:purchase_id",
              lazy: async () => ({
                Component: (await import("app/pages/preturn/preturnList"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "product",
          children: [
            {
              index: true,
              element: <Navigate to="/product/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (await import("app/pages/product/productList"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "purchase-order",
          children: [
            {
              index: true,
              element: <Navigate to="/purchase-order/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (
                  await import("app/pages/purchase/purchaseOrdersList")
                ).default,
              }),
            },
            {
              path: "add",
              lazy: async () => ({
                Component: (await import("app/pages/purchase/addPurchaseOrder"))
                  .default,
              }),
            },
            {
              path: "edit/:id",
              lazy: async () => ({
                Component: (
                  await import("app/pages/purchase/editPurchaseOrder")
                ).default,
              }),
            },
          ],
        },
        {
          path: "received-order",
          children: [
            {
              index: true,
              element: <Navigate to="/received_order/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (
                  await import("app/pages/purchase/receivedOrdersList")
                ).default,
              }),
            },
          ],
        },
        {
          path: "category",
          children: [
            {
              index: true,
              element: <Navigate to="/category/list" />,
            },
            {
              path: "list",
              lazy: async () => ({
                Component: (await import("app/pages/category/categoryList"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "report",
          children: [
            {
              index: true,
              element: <Navigate to="/report/overview_chart" />,
            },
            {
              path: "overview_chart",
              lazy: async () => ({
                Component: (await import("app/pages/reports/overviewChart"))
                  .default,
              }),
            },
            {
              path: "company_chart",
              lazy: async () => ({
                Component: (await import("app/pages/reports/companyChart"))
                  .default,
              }),
            },
            {
              path: "store_chart",
              lazy: async () => ({
                Component: (await import("app/pages/reports/storeChart"))
                  .default,
              }),
            },
            {
              path: "product_quantity_alert",
              lazy: async () => ({
                Component: (
                  await import("app/pages/reports/productQuantityAlert")
                ).default,
              }),
            },
            {
              path: "product_expiry_alert",
              lazy: async () => ({
                Component: (
                  await import("app/pages/reports/productExpiryAlert")
                ).default,
              }),
            },
            {
              path: "expired_purchases_report",
              lazy: async () => ({
                Component: (
                  await import("app/pages/reports/expiredPurchaseReport")
                ).default,
              }),
            },
            {
              path: "product_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/productReport"))
                  .default,
              }),
            },
            {
              path: "sales_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/salesReport"))
                  .default,
              }),
            },
            {
              path: "purchases_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/purchaseReport"))
                  .default,
              }),
            },
            {
              path: "payment_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/paymentReport"))
                  .default,
              }),
            },
            {
              path: "income_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/incomeReport"))
                  .default,
              }),
            },
            {
              path: "customers_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/customersReport"))
                  .default,
              }),
            },
            {
              path: "suppliers_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/supplierChart"))
                  .default,
              }),
            },
            {
              path: "users_report",
              lazy: async () => ({
                Component: (await import("app/pages/reports/usersReport"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "people",
          children: [
            {
              index: true,
              element: <Navigate to="/people/customer" />,
            },
            {
              path: "customer",
              lazy: async () => ({
                Component: (await import("app/pages/people/customer")).default,
              }),
            },
            {
              path: "supplier",
              lazy: async () => ({
                Component: (await import("app/pages/people/supplier")).default,
              }),
            },
            {
              path: "user",
              lazy: async () => ({
                Component: (await import("app/pages/people/user")).default,
              }),
            },
          ],
        },
        {
          path: "setting",
          children: [
            {
              index: true,
              element: <Navigate to="/setting/company" />,
            },
            {
              path: "company",
              lazy: async () => ({
                Component: (await import("app/pages/setting/company")).default,
              }),
            },
            {
              path: "store",
              lazy: async () => ({
                Component: (await import("app/pages/setting/store")).default,
              }),
            },
            {
              path: "site_status",
              lazy: async () => ({
                Component: (await import("app/pages/setting/siteStatus"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "concurrent_payments",
          children: [
            {
              index: true,
              element: <Navigate to="/concurrent_payments/form" />,
            },
            {
              path: "form",
              lazy: async () => ({
                Component: (
                  await import(
                    "app/pages/concurrentPayment/concurrentPaymentForm"
                  )
                ).default,
              }),
            },
          ],
        },
        {
          path: "advanced_delete",
          children: [
            {
              index: true,
              element: <Navigate to="/advanced_delete/form" />,
            },
            {
              path: "form",
              lazy: async () => ({
                Component: (
                  await import("app/pages/advancedDelete/advancedDeleteForm")
                ).default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "password",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Password")
                ).default,
              }),
            },
            {
              path: "google2fa",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Google2Fa")
                ).default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
