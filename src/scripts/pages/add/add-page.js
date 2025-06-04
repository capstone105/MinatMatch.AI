export default class AddPage {
  async render() {
    return `
      <section class="container mx-auto px-4 bg">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center">
            Add Data
          </h1>

          <form id="addForm" class="space-y-6 w-full max-w-2xl p-6">
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Name</label>
              <input type="text" name="name" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter name" required>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Gender</label>
              <select name="gender" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Age</label>
              <input type="number" name="age" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter age" required>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">GPA</label>
              <input type="number" name="gpa" step="0.01" min="0" max="4" class="border border-gray-300 rounded-md p-2 w-full" placeholder="2.0 - 4.0" required>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interested Domain</label>
              <select name="interestedDomain" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Software Development">Software Development</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Project</label>
              <select name="projects" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select</option>
                <option value="Chatbot Development">Chatbot Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="E-commerce Website">E-commerce Website</option>
                <option value="Full-Stack Web App">Full-Stack Web App</option>
                <option value="Network Security">Network Security</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Data Science</label>
              <select name="datascience" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Database</label>
              <select name="database" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Programming</label>
              <select name="programming" class="border border-gray-300 rounded-md p-2 w-full" required>
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            <div class="flex justify-center mt-6">
              <button type="submit" class="bg-[#4834D4] text-white px-6 py-2 rounded-md hover:bg-[#5946d6] transition duration-200">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('addForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
    });
  }
}