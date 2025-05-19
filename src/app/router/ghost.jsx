import GhostGuard from "middleware/GhostGuard";

const ghostRoutes = {
  id: "ghost",
  Component: GhostGuard,
  children: [
    {
      path: "login",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/Login")).default,
      }),
    },
    {
      path: "verification",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/google2Fa")).default,
      }),
    },
    {
      path: "qr",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/QRGenerate")).default,
      }),
    },
  ],
};

export { ghostRoutes };
