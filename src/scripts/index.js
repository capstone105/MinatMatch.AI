import "../styles/styles.css";

import App from "./pages/app";
import { registerServiceWorker } from "./utils/index";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
    skipToContent: document.querySelector("#skip-to-content"),
  });

  await app.renderPage();
  await registerServiceWorker();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
