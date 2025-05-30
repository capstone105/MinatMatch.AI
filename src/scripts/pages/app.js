import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { getAccessToken, logout } from "../utils/auth";
import { generateLoggedInTemplate, generateLoggedOutTemplate } from "../template/template";
import { transitionHelper, activeLink } from "../utils";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("-translate-x-full");
    });

    document.addEventListener("click", (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.add("-translate-x-full");
      }
      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.add("-translate-x-full");
        }
      });
    });
  }

  #setupNavigation() {
    const token = getAccessToken();

    if (token) {
      this.#navigationDrawer.innerHTML = generateLoggedInTemplate();
      const logoutButton = this.#navigationDrawer.querySelector("#logout-button");
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (confirm("Apakah Anda yakin ingin keluar?")) {
          logout();

          location.hash = "/login";
        }
      });
    } else {
      this.#navigationDrawer.innerHTML = generateLoggedOutTemplate();
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = await routes[url]
    const page = route || routes["*"];

   const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this.#setupNavigation();
      activeLink();
    });
  }
}

export default App;
