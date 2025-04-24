import { createSafeContext } from "utils/createSafeContext";

export const [SidebarContext, useSidebarContext] = createSafeContext(
    "useSidebarContext must be used within SidebarProvider"
);
