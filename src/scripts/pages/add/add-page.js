export default class AddPage {
  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center">
            Add Data
          </h1>
        </div>
      </section>
    `;
  }

  async afterRender() {}
}