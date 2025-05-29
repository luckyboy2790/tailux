import { AuthProvider } from "app/contexts/auth/Provider";
import Root from "./Root";

export default function RootWithAuth() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}