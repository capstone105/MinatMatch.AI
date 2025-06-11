export default class NotFoundPage {
  async render() {
    return `
      <section class="container mx-auto px-4" aria-label="404 Not Found">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center text-shadow-heavy" tabindex="0" aria-label="404 Not Found">404</h1>
          <p class="text-base sm:text-lg md:text-xl mb-8 text-center" tabindex="0">Page not found</p>
        </div>
      </section>
    `;
  }
  async afterRender() {}
}
