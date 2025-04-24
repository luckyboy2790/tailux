import { createSafeContext } from "utils/createSafeContext";

export const [BreakpointsContext, useBreakpointsContext] = createSafeContext(
    "useBreakpointsContext must be used within BreakpointsContext"
);
