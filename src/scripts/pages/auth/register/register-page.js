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
              <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="username">
                Username
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  aria-describedby="username-error"
                  required
                  class="shadow appearance-none border rounded w-full py-2 pl-11 pr-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
                />
                <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                  <i class="fa-solid fa-user"></i>
                </span>
              </div>
              <p id="username-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="email">
                Email
              </label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  aria-describedby="email-error"
                  required
                  class="shadow appearance-none border rounded w-full py-2 pl-11 pr-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
                />
                <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                  <i class="fa-solid fa-envelope"></i>
                </span>
              </div>
              <p id="email-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="password">
                Password
              </label>
              <div class="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  aria-describedby="password-error"
                  required
                  class="shadow appearance-none border rounded w-full py-2 px-11 text-gray-700 text-sm md:text-base leading-tight focus:outline-none focus:ring"
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
              <p id="password-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <button
            type="submit"
            id="login-button-form"
            class="inline-block w-full py-2 rounded text-white text-center shadow-[0_4px_20px_rgba(93,52,241,0.5)] bg-gradient-to-r from-[#686DE0] to-[#4834D4] hover:opacity-90 transition font-bold"
          >
            <i class="fa-solid fa-right-to-bracket"></i>
            <span class="ml-1">Register</span>
          </button>
          </form>
          <p class="p-3 text-sm md:text-base mt-5 text-center">
            Already have an account? <a href="#/login" class="text-[#4834D4]">Login</a>
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

    name.addEventListener("input", () => {
      if (name.value.length < 3) {
        this.showFieldError("username", "Username must be at least 3 characters long.");
      } else {
        this.showFieldError("username", "");
      }
    });
    
    email.addEventListener("input", () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        this.showFieldError("email", "Please enter a valid email address.");
      } else {
        this.showFieldError("email", "");
      }
    });

    password.addEventListener("input", () => {
      if (password.value.length < 6) {
        this.showFieldError("password", "Password must be at least 6 characters long.");
      } else {
        this.showFieldError("password", "");
      }
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!name.value || !email.value || !password.value) {
        alert("Please fill in all fields.");
        return;
      }
      if (password.value.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }
      if (name.value.length < 3) {
        alert("Username must be at least 3 characters long.");
        return;
      }

      await this.#presenter.getRegister({
        name: name.value,
        email: email.value,
        password: password.value,
      });
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

  showFieldError(fieldId, message) {
    const errorField = document.getElementById(`${fieldId}-error`);
    if (errorField) {
      errorField.textContent = message;
    }
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
    button.innerHTML = "Register";
    button.removeAttribute("disabled");
    button.classList.remove("cursor-wait");
  }
}
