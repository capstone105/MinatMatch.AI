export default class LoginPage {
  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Welcome Back
          </h1>
          <form id="login-form" class="m-6 w-full max-w-md sm:w-96">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              id="login-button"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </form>
          <p class="p-3 text-base sm:text-lg md:text-xl mb-8 text-center">
            Don't have an account? <a href="#/register" class="text-blue-500">Register</a>
          </p>
        </div>
      </section>
    `;
  }
}