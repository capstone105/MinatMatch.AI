export default class NotFoundPage {
  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center text-shadow-heavy">
            404
          </h1>
          <p class="text-base sm:text-lg md:text-xl mb-8 text-center">
            Halaman tidak ditemukan
          </p>
        </div>
      </section>
    `;
  }
  async afterRender() {}
}
