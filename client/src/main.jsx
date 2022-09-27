import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Axios
import axios from "axios";
axios.defaults.baseURL = "https://server-wgqw5nkdsa-uw.a.run.app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
