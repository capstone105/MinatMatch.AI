export default class HomePage {
  async render() {
    return `
       <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen">
          <h1
            class="text-3xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center"
          >
            One Step Closer to Your Dream Job
          </h1>
          <p class="text-base sm:text-lg md:text-xl mb-8 text-center">
            The Value of Career
          </p>
        </div>
      </section>
    `;
  }
}
