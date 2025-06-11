export default class HomePage {
  async render() {
    return `
       <section class="container mx-auto px-4" aria-label="Home Page">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen">
          <h1
            class="max-w-xl text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center text-shadow-heavy"
            tabindex="0"
          >
            One Step Closer to Your Dream Job
          </h1>
          <p class="text-base sm:text-lg md:text- text-center" tabindex="0">
            The Value of Career
          </p>
          <a href="#/login" class="inline-block w-36 py-2 rounded-full text-[#4834D4] text-center border border-[#4834D4] bg-white shadow-[0_4px_20px_rgba(93,52,241,0.3)] hover:bg-indigo-50 transition font-bold mt-4 focus:outline-none focus:ring" role="button" aria-label="Login to get started">
            Get Started
          </a>
        </div>
      </section>
    `;
  }

  async afterRender() {}
}
