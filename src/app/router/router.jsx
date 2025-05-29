// Import Dependencies
import { createBrowserRouter } from "react-router";

// Local Imports
import RootErrorBoundary from "app/pages/errors/RootErrorBoundary";
import { SplashScreen } from "components/template/SplashScreen";
import { protectedRoutes } from "./protected";
import { ghostRoutes } from "./ghost";
import { publicRoutes } from "./public";
import RootWithAuth from "app/layouts/RootWithAuth";

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    id: "root",
    Component: RootWithAuth,
    hydrateFallbackElement: <SplashScreen />,
    ErrorBoundary: RootErrorBoundary,
    children: [protectedRoutes, ghostRoutes, publicRoutes],
  },
]);

export default router;
