import AddPresenter from "./add-presenter";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken } from "../../utils/auth.js";
import Swal from "sweetalert2";

export default class AddPage {
  #presenter;
  #resultContainer;

  async render() {
    return `
      <section class="container mx-auto px-4 bg">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center" tabindex="0">
            Add Data
          </h1>

          <form id="addForm" class="space-y-6 w-full max-w-2xl p-6" aria-label="Add Data Form" role="form">
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="name">Name</label>
              <input type="text" name="name" id="name" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter name" required aria-describedby="name-error" aria-label="Name input" />
              <p id="name-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="gender">Gender</label>
              <select name="gender" id="gender" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="gender-error" aria-label="Gender select">
                <option value="" disabled selected>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p id="gender-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="age">Age</label>
              <input type="number" name="age" id="age" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Enter age" required aria-describedby="age-error" aria-label="Age input" />
              <p id="age-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="gpa">GPA</label>
              <input type="number" name="gpa" id="gpa" step="0.01" min="0" max="4" class="border border-gray-300 rounded-md p-2 w-full" placeholder="2.0 - 4.0" required aria-describedby="gpa-error" aria-label="GPA input" />
              <p id="gpa-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="interestedDomain">Interested Domain</label>
              <select name="interestedDomain" id="interestedDomain" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="interestedDomain-error" aria-label="Interested Domain select">
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
              <label class="font-semibold" for="projects">Project</label>
              <select name="projects" id="projects" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="projects-error" aria-label="Project select">
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
              <label class="font-semibold" for="datascience">Interest in Data Science</label>
              <select name="datascience" id="datascience" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="datascience-error" aria-label="Interest in Data Science select">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="datascience-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="database">Interest in Database</label>
              <select name="database" id="database" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="database-error" aria-label="Interest in Database select">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="database-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex flex-col gap-1 mb-2">
              <label class="font-semibold" for="programming">Interest in Programming</label>
              <select name="programming" id="programming" class="border border-gray-300 rounded-md p-2 w-full" required aria-describedby="programming-error" aria-label="Interest in Programming select">
                <option value="" disabled selected>Select level</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
              </select>
              <p id="programming-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
            </div>
            <div class="flex justify-center mt-6">
              <button type="submit" id="add-button-form" class="w-32 py-1 rounded-full text-[#4834D4] text-center border border-[#4834D4] bg-white shadow-[0_4px_20px_rgba(93,52,241,0.3)] hover:bg-indigo-50 transition" aria-label="Submit data for recommendation" title="Submit Data">
                Submit
              </button>
            </div>
          </form>
          <section id="result-container" class="fixed hidden items-center justify-center bg-slate-400 bg-opacity-50 top-0 bottom-0 right-0 left-0 z-50">
            <div class="center bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-md relative">
              <h2 class="text-2xl text-center font-semibold mb-4" id="result-heading" tabindex="-1" aria-live="polite" role="status">Your Career</h2>
              <div id="result-content" class="text-gray-700">
              </div>
              <span id="close-result"  class="absolute top-2 right-2 cursor-pointe text-xl px-2 text-gray-500 hover:text-gray-700">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </div>
          </section>
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
    this.#resultContainer = document.getElementById("result-container");
    const form = document.getElementById("addForm");
    const fields = [
      "name",
      "gender",
      "age",
      "gpa",
      "interestedDomain",
      "projects",
      "datascience",
      "database",
      "programming",
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

    form.addEventListener("submit", async (event) => {
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
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#ef4444",
      color: "#fff",
      customClass: {
        popup: "rounded-lg shadow-lg px-4 py-2",
        title: "text-white",
        icon: "text-white",
      },
    });
  }

  showSuccess(message) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#22c55e",
      color: "#fff",
      customClass: {
        popup: "rounded-lg shadow-lg px-4 py-2",
        title: "text-white",
        icon: "text-white",
      },
    });
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

  showResult(result) {
    this.#resultContainer.style.display = "flex";
    const resultContent = document.getElementById("result-content");
    const closeButton = document.getElementById("close-result");

    resultContent.setAttribute("tabindex", "-1");
    resultContent.setAttribute("aria-live", "polite");
    resultContent.setAttribute("role", "status");

    const predictions = result.data.predictions;
    let resultHTML = "";
    predictions.forEach((prediction, index) => {
      resultHTML += `
          <li tabindex="0" role="listitem" aria-label="${prediction.career} with recommendation probability ${(prediction.probability * 100).toFixed(2)} percent">
            <span id="result-${index + 1}">${prediction.career}: </span>
            <span id="result-persentase-${index + 1}">${(prediction.probability * 100).toFixed(2)}%</span>
          </li>`;
    });
    resultContent.innerHTML = `<ul class="pl-5 text-center text-lg" role="list" aria-label="Recommendation results">${resultHTML}</ul>`;

    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("aria-label", "Close result");
    closeButton.setAttribute("title", "Close result");
    closeButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeButton.click();
      }
    });

    setTimeout(() => {
      resultContent.focus();
    }, 100);

    closeButton.addEventListener("click", () => {
      this.#resultContainer.style.display = "none";
    });
  }

  errorAdd(message) {
    alert(`Prediction failed: ${message}`);
  }
}
