import * as MinatMatch from "../../../data/api.js";
import RegisterPresenter from "./register-presenter";

export default class RegisterPage {
  #presenter;

  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Create Account
          </h1>
          <form id="register-form" class="mt-6 w-full max-w-md sm:w-96">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
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
              id="register-button-form"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring w-full"
            >
              Register
            </button>
          </form>
          <p class="p-3 text-base sm:text-lg md:text-xl mb-8 text-center">
            Already have an account? <a href="#/login" class="text-blue-500">Login</a>
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector("#register-form");
    const name = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    this.#presenter = new RegisterPresenter({
      view: this,
      model: MinatMatch,
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.#presenter.getRegister({
        name: name.value,
        email: email.value,
        password: password.value,
      });
    });
  }

  registeredSuccessfully() {
    location.hash = "/login";
  }

  errorRegister(message) {
    alert(`Registration failed: ${message}`);
  }

  showLoading() {
    const button = document.querySelector("#register-button-form");
    button.innerHTML = `
      <div class="loader flex items-center justify-center">
        <span class="inline-block w-5 h-5 loader border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span class="ml-2 text-white">Registering...</span>
      </div>`;
    button.setAttribute("disabled", true);
    button.classList.add("cursor-wait");
  }

  hideLoading() {
    const button = document.querySelector("#register-button-form");
    button.innerHTML = "Login";
    button.removeAttribute("disabled");
    button.classList.remove("cursor-wait");
  }
}
