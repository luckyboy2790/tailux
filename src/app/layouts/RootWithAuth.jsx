import { AuthProvider } from "app/contexts/auth/Provider";
import Root from "./Root";
import RoleRouteGuard from "app/contexts/auth/route_guard";

export default function RootWithAuth() {
  return (
    <AuthProvider>
      <RoleRouteGuard>
        <Root />
      </RoleRouteGuard>
    </AuthProvider>
  );
}
