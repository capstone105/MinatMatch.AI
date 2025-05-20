export default class FeaturesPage {
  async render() {
    return `
<section class="min-h-screen max-w-6xl mx-auto flex flex-col justify-center px-4">
  <h1 class="text-3xl lg:text-4xl font-bold text-center mt-20 sm:mt-16 mb-10 lg:mt-0">Features</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-10 sm:p-20">
    <div class="flex gap-4 items-center">
      <img src="images/image-features-1.png" alt="Career Prediction" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Smart Career Prediction</h2>
        <p class="text-sm text-gray-600">Get personalized career suggestions based on your GPA, skills, and experiences — powered by AI.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center">
      <img src="images/image-features-3.png" alt="Transparent Output" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Simple & Transparent Output</h2>
        <p class="text-sm text-gray-600">Receive career recommendations in an easy-to-understand format, showing job labels.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center">
      <img src="images/image-features-2.png" alt="Skill Assessment" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Skill-Based Assessment</h2>
        <p class="text-sm text-gray-600">Evaluate your capabilities across key soft and hard skills (0–4 scale) to match suitable career fields.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center">
      <img src="images/image-features-4.png" alt="Responsive Design" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Responsive and Intuitive Design</h2>
        <p class="text-sm text-gray-600">The platform is optimized for both mobile and desktop use, with a clean and user-friendly interface.</p>
      </div>
    </div>
  </div>
</section>
    `;
  }

  async afterRender() {
   
  }
}