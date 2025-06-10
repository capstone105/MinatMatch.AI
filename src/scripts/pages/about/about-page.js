export default class AboutPage {
  async render() {
    return `
      <section class="container mx-auto px-4" aria-label="About MinatMatch.AI">
        <div class="p-5 flex flex-col items-center justify-center min-h-screen gap-6">
          <h1 class="text-2xl md:text-3xl font-bold text-center mb-4" tabindex="0">About MinatMatch.AI</h1>
          <p class="text-base sm:text-lg md:text-xl text-center max-w-3xl leading-relaxed animate-fadeIn" tabindex="0">
            <span class="font-bold text-primary">MinatMatch.AI</span> is an artificial intelligence-based platform developed by a team of university students to help the younger generation determine the most suitable career path based on their personal potential.
            We believe that career decisions should be made <span class="font-semibold text-gray-700">based on data, not guesses.</span>
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
  }
}
