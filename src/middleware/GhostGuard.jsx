// Import Dependencies
import { Navigate, useOutlet } from "react-router";

// Local Imports
import { useAuthContext } from "app/contexts/auth/context";
import { HOME_PATH, REDIRECT_URL_KEY } from "constants/app.constant";

// ----------------------------------------------------------------------

export default function GhostGuard() {
  const outlet = useOutlet();
  const { isAuthenticated } = useAuthContext();

  const rawRedirect = new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY,
  );
  const url = rawRedirect && rawRedirect !== "null" ? rawRedirect : null;

  if (isAuthenticated) {
    if (url && url !== "") {
      return <Navigate to={url} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  return <>{outlet}</>;
}
