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
              <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="email">
                Email
              </label>
              <div class="mb-4 relative">
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  required
                  class="shadow appearance-none border rounded w-full py-2 pl-11 pr-3 md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
                />
                <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                  <i class="fa-solid fa-envelope"></i>
                </span>   
              </div>          
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="password">
                Password
              </label>
              <div class="mb-6 relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                class="shadow appearance-none border rounded w-full py-2 px-11 md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
              />
              <button
                type="button"
                id="toggle-password"
                aria-label="Show password"
                aria-pressed="false"   
                class="absolute inset-y-0 right-0 px-3 flex items-center justify-center text-gray-600"
              >
                <i class="fa-solid fa-eye" id="toggle-icon"></i>
              </button>
              <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                <i class="fa-solid fa-key"></i>
              </span>
            </div>
           <button
            type="submit"
            id="login-button-form"
            class="inline-block w-full py-2 rounded text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition font-bold"
          >
            <i class="fa-solid fa-right-to-bracket"></i>
            <span class="ml-1">Login</span>
          </button>

          </form>
          <p class="p-3 text-sm md:text-base mt-4 text-center">
            Don't have an account? <a href="#/register" class="text-[#4834D4]
            ">Register</a>
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

    const toggleBtn = document.querySelector("#toggle-password");
    const toggleIcon = document.querySelector("#toggle-icon");

    toggleBtn.addEventListener("click", () => {
      const isPassword = password.type === "password";
      password.type = isPassword ? "text" : "password";
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
      toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      toggleBtn.setAttribute("aria-pressed", isPassword ? "true" : "false");
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
