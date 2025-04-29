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
