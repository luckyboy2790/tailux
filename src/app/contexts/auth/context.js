import { createSafeContext } from "utils/createSafeContext";

export const [AuthContext, useAuthContext] = createSafeContext(
    "useAuthContext must be used within AuthProvider"
);
