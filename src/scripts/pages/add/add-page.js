import AddPresenter from "./add-presenter";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken } from "../../utils/auth.js";

export default class AddPage {
  #presenter;
  #resultContainer;

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
              <input type="text" name="name" id="name" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter name" required aria-describedby="name-error">
              <p id="name-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Gender</label>
              <select name="gender" id="gender" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="gender-error">
                <option value="" disabled selected>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p id="gender-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Age</label>
              <input type="number" name="age" id="age" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter age" required aria-describedby="age-error">
              <p id="age-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">GPA</label>
              <input type="number" name="gpa" id="gpa" step="0.01" min="0" max="4" class="border border-gray-300 rounded-md p-2 w-full" placeholder="2.0 - 4.0" required aria-describedby="gpa-error">
              <p id="gpa-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interested Domain</label>
              <select name="interestedDomain" id="interestedDomain" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="interestedDomain-error">
                <option value="" disabled selected>Select</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Software Development">Software Development</option>
              </select>
              <p id="interestedDomain-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Project</label>
              <select name="projects" id="projects" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="projects-error">
                <option value="" disabled selected>Select</option>
                <option value="Chatbot Development">Chatbot Development</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="E-commerce Website">E-commerce Website</option>
                <option value="Full-Stack Web App">Full-Stack Web App</option>
                <option value="Network Security">Network Security</option>
              </select>
              <p id="projects-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Data Science</label>
              <select name="datascience" id="datascience" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="datascience-error">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="datascience-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Database</label>
              <select name="database" id="database" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="database-error">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="database-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold">Interest in Programming</label>
              <select name="programming" id="programming" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="programming-error">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="programming-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex justify-center mt-6">
              <button type="submit" id="add-button-form" class="bg-[#4834D4] text-white px-6 py-2 rounded-md hover:bg-[#5946d6] transition duration-200">
                Submit
              </button>
            </div>
          </form>
          <div id="prediction-result" class="mt-8 w-full max-w-2xl"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddPresenter({
      view: this,
      model: MinatMatch,
      authModel: getAccessToken(),
    });
    this.#resultContainer = document.getElementById("prediction-result");
    const form = document.getElementById('addForm');
    const fields = [
      "name", "gender", "age", "gpa", "interestedDomain", "projects", "datascience", "database", "programming"
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field);
      if (!input) return;
      input.addEventListener("input", () => {
        let message = "";
        if (field === "name" && input.value.length < 3) {
          message = "Name must be at least 3 characters.";
        }
        if (field === "age" && (input.value < 10 || input.value > 150)) {
          message = "Age must be between 10 and 150.";
        }
        if (field === "gpa" && (input.value < 2 || input.value > 4)) {
          message = "GPA must be between 2.0 and 4.0.";
        }
        this.showFieldError(field, message);
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      this.#presenter.handleAdd({
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        age: document.getElementById("age").value,
        gpa: document.getElementById("gpa").value,
        interestedDomain: document.getElementById("interestedDomain").value,
        projects: document.getElementById("projects").value,
        datascience: document.getElementById("datascience").value,
        database: document.getElementById("database").value,
        programming: document.getElementById("programming").value,
      });
    });
  }

  showFieldError(fieldId, message) {
    const errorField = document.getElementById(`${fieldId}-error`);
    if (errorField) {
      errorField.textContent = message;
    }
  }

  showError(message) {
    alert(`Error: ${message}`);
  }

  showLoading() {
    const button = document.getElementById("add-button-form");
    button.innerHTML = `
      <div class="loader flex items-center justify-center">
        <span class="inline-block w-5 h-5 loader border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span class="ml-2 text-white">Processing...</span>
      </div>`;
    button.setAttribute("disabled", true);
    button.classList.add("cursor-wait");
  }

  hideLoading() {
    const button = document.getElementById("add-button-form");
    button.innerHTML = "Submit";
    button.removeAttribute("disabled");
    button.classList.remove("cursor-wait");
  }

  showPredictionResult(result) {
    if (!this.#resultContainer) return;
    if (result && result.status === "success") {
      this.#resultContainer.innerHTML = `
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Prediction Result:</strong> ${result.data}
        </div>
      `;
    } else {
      this.#resultContainer.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> ${result && result.message ? result.message : "Prediction failed."}
        </div>
      `;
    }
  }

  errorAdd(message) {
    alert(`Prediction failed: ${message}`);
  }
}