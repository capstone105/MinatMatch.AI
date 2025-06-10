export default class FeaturesPage {
  async render() {
    return `
<section class="min-h-screen max-w-6xl mx-auto flex flex-col justify-center px-4">
  <h1 class="text-3xl lg:text-4xl font-bold text-center mt-20 sm:mt-16 mb-10 lg:mt-0" tabindex="0">Features</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-10 sm:p-20" role="list" aria-label="List of Features">
    <div class="flex gap-4 items-center" role="listitem" tabindex="0" aria-label="AI Career Recommendation feature">
      <img src="images/image-features-1.png" alt="AI Career Recommendation" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">AI Career Recommendation</h2>
        <p class="text-sm text-gray-600">Get personalized recommendations for the top 3 careers that best match your profile, each with a clear probability percentage — powered by AI.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center" role="listitem" tabindex="0" aria-label="Clear Recommendation Output feature">
      <img src="images/image-features-3.png" alt="Clear Recommendation Output" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Clear Recommendation Output</h2>
        <p class="text-sm text-gray-600">See your top 3 recommended careers, each with a probability percentage, presented in a simple and transparent format.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center" role="listitem" tabindex="0" aria-label="Skill & Interest Assessment feature">
      <img src="images/image-features-2.png" alt="Skill & Interest Assessment" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Skill & Interest Assessment</h2>
        <p class="text-sm text-gray-600">Assess your skills and interests in Data Science, Database, and Programming (Weak, Average, Strong) to help match you with the most suitable career field.</p>
      </div>
    </div>

    <div class="flex gap-4 items-center" role="listitem" tabindex="0" aria-label="Responsive and Intuitive Design feature">
      <img src="images/image-features-4.png" alt="Responsive and Intuitive Design" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
      <div>
        <h2 class="font-bold text-lg sm:text-xl lg:text-2xl text-blue-700">Responsive and Intuitive Design</h2>
        <p class="text-sm text-gray-600">Enjoy a user-friendly interface that works seamlessly on both mobile and desktop devices.</p>
      </div>
    </div>
  </div>
</section>
    `;
  }

  async afterRender() {
   
  }
}