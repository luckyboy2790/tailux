const publicRoutes = {
  id: "public",
  children: [
    {
      path: "activate",
      lazy: async () => ({
        Component: (await import("app/pages/setting/activate")).default,
      }),
    },
    {
      path: "disabled",
      lazy: async () => ({
        Component: (await import("app/pages/setting/disabled")).default,
      }),
    },
  ],
};

export { publicRoutes };
