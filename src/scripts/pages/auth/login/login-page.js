import * as MinatMatch from "../../../data/api.js";
import LoginPresenter from "./login-presenter.js";
import * as AuthModel from "../../../utils/auth.js";

export default class LoginPage {
  #presenter;

  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Welcome Back
          </h1>
          <form id="login-form" class="mt-6 w-full max-w-md sm:w-96">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <button
              type="submit"
              id="login-button-form"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring w-full"
            >
              <i class="fa-solid fa-right-to-bracket"></i>
              <span class="ml-1">Login</span>
            </button>
          </form>
          <p class="p-3 text-base sm:text-lg md:text-xl mb-8 text-center">
            Don't have an account? <a href="#/register" class="text-blue-500">Register</a>
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector("#login-form");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    this.presenter = new LoginPresenter({
      view: this,
      model: MinatMatch,
      authModel: AuthModel,
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.presenter.getLogin({ email: email.value, password: password.value });
    });
  }

  loggedInSuccessfully() {
    location.hash = "/add";
  }

  showError(message) {
    alert(message);
  }

  showLoading() {
    const button = document.querySelector("#login-button-form");
    button.innerHTML = `
      <div class="loader flex items-center justify-center">
        <span class="inline-block w-5 h-5 loader border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span class="ml-2 text-white">Logging in...</span>
      </div>`;
    button.setAttribute("disabled", true);
    button.classList.add("cursor-wait");
  }

  hideLoading() {
    const button = document.querySelector("#login-button-form");
    button.innerHTML = "Login";
    button.removeAttribute("disabled");
    button.classList.remove("cursor-wait");
  }
}
