import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMonaco } from "./lib/monaco.ts";
import { onUpdaterEvent } from "@tauri-apps/api/updater";
// import { checkAppUpdate } from "./store.ts";

// checkAppUpdate(false)

initMonaco();

onUpdaterEvent(({ error, status }) => {
  // This will log all updater events, including status updates and errors.
  console.log("Updater event", error, status);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
