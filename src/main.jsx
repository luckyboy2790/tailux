import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "i18n/config";

import "simplebar-react/dist/simplebar.min.css";

import "styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
