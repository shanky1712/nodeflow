import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);