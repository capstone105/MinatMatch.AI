export default class AddPage {
  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center">
            Add Data
          </h1>

        <form class="space-y-6 p-1">
          <div class="flex space-x-8 justify-between items-center max-w-xl mx-auto">
            <div class="flex flex-col">
              <label class="font-semibold">Name</label>
              <input type="text" name="name" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter name">
            </div>
            <div class="flex flex-col">
              <label class="font-semibold">GPA</label>
              <input type="text" name="gpa" class="border border-gray-300 rounded-md p-2 w-full" placeholder="2.0 - 4.0">
            </div>
          </div>

          <div id="rating-categories" class="space-y-12">
            <!-- Extracurricular Activities -->
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-yellow-400 rounded-full border-2 font-bold text-center text-sm">1</div>
                <div class="w-full">
                  <p class="font-semibold">Extracurricular Activities</p>
                  <p class="text-sm text-gray-600">The number of extracurricular activities the student has participated in
                    outside of their regular courses.</p>
                </div>
              </div>
              <div class="flex justify-between items-center max-w-xl mx-auto">
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="extracurricular" value="very_poor" class="form-radio text-blue-600">
                  Very poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="extracurricular" value="poor" class="form-radio text-blue-600">
                  Poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="extracurricular" value="fair" class="form-radio text-blue-600">
                  Fair
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="extracurricular" value="good" class="form-radio text-blue-600">
                  Good
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="extracurricular" value="excellent" class="form-radio text-blue-600">
                  Excellent
                </label>
                <div class="flex-row justify-center bg-purple-100 px-4 py-1 rounded text-sm font-semibold"><small>Score</small><p class="text-center">0–4</p></div>
              </div>
            </div>

            <!-- Internships -->
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-yellow-400 rounded-full border-2 font-bold text-center text-sm">2</div>
                <div class="w-full">
                  <p class="font-semibold">Internships</p>
                  <p class="text-sm text-gray-600">The number of internships the student has completed.</p>
                </div>
              </div>
              <div class="flex justify-between items-center max-w-xl mx-auto">
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="internship" value="very_poor" class="form-radio text-blue-600">
                  Very poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="internship" value="poor" class="form-radio text-blue-600">
                  Poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="internship" value="fair" class="form-radio text-blue-600">
                  Fair
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="internship" value="good" class="form-radio text-blue-600">
                  Good
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="internship" value="excellent" class="form-radio text-blue-600">
                  Excellent
                </label>
                <div class="flex-row justify-center bg-purple-100 px-4 py-1 rounded text-sm font-semibold"><small>Score</small><p class="text-center">0–4</p></div>
              </div>
            </div>

            <!-- Projects -->
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="w-6 h-6 bg-yellow-400 rounded-full border-2 font-bold text-center text-sm">3</div>
                <div class="w-full">
                  <p class="font-semibold">Projects</p>
                  <p class="text-sm text-gray-600">The number of relevant projects completed by the student.</p>
                </div>
              </div>
              <div class="flex justify-between items-center max-w-xl mx-auto">
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="projects" value="very_poor" class="form-radio text-blue-600">
                  Very poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="projects" value="poor" class="form-radio text-blue-600">
                  Poor
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="projects" value="fair" class="form-radio text-blue-600">
                  Fair
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="projects" value="good" class="form-radio text-blue-600">
                  Good
                </label>
                <label class="flex flex-col items-center text-xs">
                  <input type="radio" name="projects" value="excellent" class="form-radio text-blue-600">
                  Excellent
                </label>
                <div class="flex-row justify-center bg-purple-100 px-4 py-1 rounded text-sm font-semibold"><small>Score</small><p class="text-center">0–4</p></div>
              </div>
            </div>
          </div>
        </form>
        </div>
      </section>
    `;
  }

  async afterRender() {}
}