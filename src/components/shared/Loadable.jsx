// Import Dependencies
import { Suspense } from "react";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Loadable = (Component, Fallback) => (props) => (
  <Suspense fallback={Fallback && <Fallback />}>
    <Component {...props} />
  </Suspense>
);

export { Loadable };
