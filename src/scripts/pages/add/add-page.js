import AddPresenter from "./add-presenter";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken } from "../../utils/auth.js";
import Swal from "sweetalert2";

export default class AddPage {
  #presenter;
  #resultContainer;

  async render() {
    return `
     <section class="min-h-screen via-white to-indigo-50 pt-24">
      <div class="container mx-auto px-4 py-8 sm:py-12">
        <!-- Header Section -->
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4" tabindex="0">
            Add Your Data
          </h1>
          <p class="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Fill in your information to get personalized career recommendations
          </p>
        </div>

          <!-- Form Card -->
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 sm:px-8 sm:py-6">
                <h2 class="text-white text-lg sm:text-xl font-semibold">Personal Information</h2>
              </div>
              
              <form id="addForm" class="p-6 sm:p-8" aria-label="Add Data Form" role="form">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Name Field -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700" for="name">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Full Name
                      </span>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                      placeholder="Enter your full name" 
                      required 
                      aria-describedby="name-error" 
                      aria-label="Name input" 
                    />
                    <p id="name-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>

                  <!-- Gender Field -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700" for="gender">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                        Gender
                      </span>
                    </label>
                    <select 
                      name="gender" 
                      id="gender" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                      required 
                      aria-describedby="gender-error" 
                      aria-label="Gender select"
                    >
                      <option value="" disabled selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <p id="gender-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>

                  <!-- Age Field -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700" for="age">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Age
                      </span>
                    </label>
                    <input 
                      type="number" 
                      name="age" 
                      id="age" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                      placeholder="Enter your age" 
                      required 
                      min="10" 
                      max="150"
                      aria-describedby="age-error" 
                      aria-label="Age input" 
                    />
                    <p id="age-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>

                  <!-- GPA Field -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700" for="gpa">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        GPA
                      </span>
                    </label>
                    <input 
                      type="number" 
                      name="gpa" 
                      id="gpa" 
                      step="0.01" 
                      min="2" 
                      max="4" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                      placeholder="2.00 - 4.00" 
                      required 
                      aria-describedby="gpa-error" 
                      aria-label="GPA input" 
                    />
                    <p id="gpa-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>

                  <!-- Interested Domain Field -->
                  <div class="space-y-2 md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700" for="interestedDomain">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        Interested Domain
                      </span>
                    </label>
                    <select 
                      name="interestedDomain" 
                      id="interestedDomain" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                      required 
                      aria-describedby="interestedDomain-error" 
                      aria-label="Interested Domain select"
                    >
                      <option value="" disabled selected>Select your field of interest</option>
                      <option value="Artificial Intelligence">🤖 Artificial Intelligence</option>
                      <option value="Web Development">🌐 Web Development</option>
                      <option value="Data Science">📊 Data Science</option>
                      <option value="Cybersecurity">🔒 Cybersecurity</option>
                      <option value="Software Development">💻 Software Development</option>
                    </select>
                    <p id="interestedDomain-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>

                  <!-- Projects Field -->
                  <div class="space-y-2 md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700" for="projects">
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        Project Experience
                      </span>
                    </label>
                    <select 
                      name="projects" 
                      id="projects" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                      required 
                      aria-describedby="projects-error" 
                      aria-label="Project select"
                    >
                      <option value="" disabled selected>Select your project type</option>
                      <option value="Chatbot Development">💬 Chatbot Development</option>
                      <option value="Data Analytics">📈 Data Analytics</option>
                      <option value="E-commerce Website">🛒 E-commerce Website</option>
                      <option value="Full-Stack Web App">🔧 Full-Stack Web App</option>
                      <option value="Network Security">🛡️ Network Security</option>
                    </select>
                    <p id="projects-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                  </div>
                </div>

                <!-- Interest Levels Section -->
                <div class="mt-8">
                  <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    Interest Levels
                  </h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Data Science Interest -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700" for="datascience">
                        <span class="flex items-center gap-2">
                          <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Data Science
                        </span>
                      </label>
                      <select 
                        name="datascience" 
                        id="datascience" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                        required 
                        aria-describedby="datascience-error" 
                        aria-label="Interest in Data Science select"
                      >
                        <option value="" disabled selected>Select level</option>
                        <option value="Weak">⭐ Weak</option>
                        <option value="Average">⭐⭐ Average</option>
                        <option value="Strong">⭐⭐⭐ Strong</option>
                      </select>
                      <p id="datascience-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                    </div>

                    <!-- Database Interest -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700" for="database">
                        <span class="flex items-center gap-2">
                          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                          Database
                        </span>
                      </label>
                      <select 
                        name="database" 
                        id="database" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                        required 
                        aria-describedby="database-error" 
                        aria-label="Interest in Database select"
                      >
                        <option value="" disabled selected>Select level</option>
                        <option value="Weak">⭐ Weak</option>
                        <option value="Average">⭐⭐ Average</option>
                        <option value="Strong">⭐⭐⭐ Strong</option>
                      </select>
                      <p id="database-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                    </div>

                    <!-- Programming Interest -->
                    <div class="space-y-2">
                      <label class="block text-sm font-semibold text-gray-700" for="programming">
                        <span class="flex items-center gap-2">
                          <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Programming
                        </span>
                      </label>
                      <select 
                        name="programming" 
                        id="programming" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white" 
                        required 
                        aria-describedby="programming-error" 
                        aria-label="Interest in Programming select"
                      >
                        <option value="" disabled selected>Select level</option>
                        <option value="Weak">⭐ Weak</option>
                        <option value="Average">⭐⭐ Average</option>
                        <option value="Strong">⭐⭐⭐ Strong</option>
                      </select>
                      <p id="programming-error" class="text-red-500 text-xs mt-1 min-h-[16px]" role="alert" aria-live="polite"></p>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-center mt-8 pt-6 border-t border-gray-200">
                  <button 
                    type="submit" 
                    id="add-button-form" 
                    class="group relative px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                    aria-label="Submit data for recommendation" 
                    title="Submit Data"
                  >
                    <span class="flex items-center gap-2">
                      <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Get Recommendations
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Result Modal -->
        <div id="result-container" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 hidden overflow-y-auto">
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full my-8 relative animate-in zoom-in-95 duration-200">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-2xl relative">
              <h2 class="text-white text-xl font-bold text-center pr-8" id="result-heading" tabindex="-1" aria-live="polite" role="status">
                🎯 Your Career Recommendations
              </h2>
              <button 
                id="close-result" 
                class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-white transition-all duration-200" 
                tabindex="0" 
                role="button" 
                aria-label="Close result" 
                title="Close result"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="p-6 max-h-[70vh] overflow-y-auto">
              <div id="result-content" class="space-y-3" tabindex="-1" aria-live="polite" role="status">
                <!-- Results will be populated here -->
              </div>
            </div>
          </div>
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
        this.validateField(field, input.value);
      });

      input.addEventListener("blur", () => {
        this.validateField(field, input.value);
      });

     
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("ring-2", "ring-indigo-200");
      });

      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("ring-2", "ring-indigo-200");
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      
     
      let isValid = true;
      fields.forEach((field) => {
        const input = document.getElementById(field);
        if (!this.validateField(field, input.value)) {
          isValid = false;
        }
      });

      if (!isValid) {
        this.showError("Please fix all validation errors before submitting.");
        return;
      }

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


    this.#resultContainer.addEventListener("click", (e) => {
      if (e.target === this.#resultContainer) {
        this.#resultContainer.style.display = "none";
      }
    });


    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.#resultContainer.style.display === "flex") {
        this.#resultContainer.style.display = "none";
      }
    });
  }

  validateField(fieldId, value) {
    let message = "";
    let isValid = true;

    switch (fieldId) {
      case "name":
        if (!value.trim()) {
          message = "Name is required.";
          isValid = false;
        } else if (value.trim().length < 3) {
          message = "Name must be at least 3 characters.";
          isValid = false;
        }
        break;
      case "age":
        const age = parseInt(value);
        if (!value) {
          message = "Age is required.";
          isValid = false;
        } else if (age < 10 || age > 150) {
          message = "Age must be between 10 and 150.";
          isValid = false;
        }
        break;
      case "gpa":
        const gpa = parseFloat(value);
        if (!value) {
          message = "GPA is required.";
          isValid = false;
        } else if (gpa < 2 || gpa > 4) {
          message = "GPA must be between 2.0 and 4.0.";
          isValid = false;
        }
        break;
      default:
        if (!value) {
          message = "This field is required.";
          isValid = false;
        }
        break;
    }

    this.showFieldError(fieldId, message);
    
   
    const input = document.getElementById(fieldId);
    if (input) {
      if (isValid && value) {
        input.classList.remove("border-red-300", "focus:ring-red-500");
        input.classList.add("border-green-300", "focus:ring-green-500");
      } else if (!isValid) {
        input.classList.remove("border-green-300", "focus:ring-green-500");
        input.classList.add("border-red-300", "focus:ring-red-500");
      } else {
        input.classList.remove("border-red-300", "focus:ring-red-500", "border-green-300", "focus:ring-green-500");
      }
    }

    return isValid;
  }

  showFieldError(fieldId, message) {
    const errorField = document.getElementById(`${fieldId}-error`);
    if (errorField) {
      errorField.textContent = message;
      if (message) {
        errorField.classList.add("opacity-100");
      } else {
        errorField.classList.remove("opacity-100");
      }
    }
  }

  showError(message) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: message,
      confirmButtonColor: "#ef4444",
      background: "#fef2f2",
      color: "#991b1b",
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__faster"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__faster"
      }
    });
  }

  showSuccess(message) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      confirmButtonColor: "#22c55e",
      background: "#f0fdf4",
      color: "#166534",
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__faster"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__faster"
      }
    });
  }

  showLoading() {
    const button = document.getElementById("add-button-form");
    button.innerHTML = `
      <span class="flex items-center gap-2">
        <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
        </svg>
        Processing...
      </span>`;
    button.setAttribute("disabled", true);
    button.classList.add("cursor-wait", "opacity-80");
  }

  hideLoading() {
    const button = document.getElementById("add-button-form");
    button.innerHTML = `
      <span class="flex items-center gap-2">
        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Get Recommendations
      </span>`;
    button.removeAttribute("disabled");
    button.classList.remove("cursor-wait", "opacity-80");
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
      const percentage = (prediction.probability * 100).toFixed(1);
      const color = this.getColorByPercentage(percentage);
      const icon = this.getIconByCareer(prediction.career);
      
      resultHTML += `
        <div class="flex items-center justify-between p-4 bg-gradient-to-r ${color.bg} rounded-xl border ${color.border} hover:shadow-md transition-all duration-200" 
             tabindex="0" 
             role="listitem" 
             aria-label="${prediction.career} with recommendation probability ${percentage} percent">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 ${color.iconBg} rounded-full flex items-center justify-center">
              <span class="text-lg">${icon}</span>
            </div>
            <div>
              <h3 class="font-semibold ${color.text} text-sm sm:text-base">${prediction.career}</h3>
              <p class="text-xs ${color.subtext}">Career Match</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xl sm:text-2xl font-bold ${color.text}">${percentage}%</span>
            <div class="w-16 sm:w-20 h-2 bg-gray-200 rounded-full mt-1">
              <div class="${color.progress} h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
            </div>
          </div>
        </div>`;
    });
    
    resultContent.innerHTML = `
      <div class="space-y-3" role="list" aria-label="Career recommendation results">
        <div class="text-center mb-4">
          <p class="text-gray-600 text-sm">Based on your profile, here are your top career matches:</p>
        </div>
        ${resultHTML}
        <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-blue-800 text-sm">Recommendation Tip</h4>
              <p class="text-blue-700 text-xs mt-1">Higher percentages indicate better alignment with your skills and interests. Consider exploring the top recommendations for your career path!</p>
            </div>
          </div>
        </div>
      </div>`;

   
    closeButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeButton.click();
      }
    });

    closeButton.addEventListener("click", () => {
      this.#resultContainer.style.display = "none";
    });

   
    setTimeout(() => {
      resultContent.focus();
    }, 100);
  }

  getColorByPercentage(percentage) {
    if (percentage >= 80) {
      return {
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        text: "text-emerald-800",
        subtext: "text-emerald-600",
        iconBg: "bg-emerald-100",
        progress: "bg-gradient-to-r from-emerald-400 to-green-500"
      };
    } else if (percentage >= 60) {
      return {
        bg: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        text: "text-blue-800",
        subtext: "text-blue-600",
        iconBg: "bg-blue-100",
        progress: "bg-gradient-to-r from-blue-400 to-indigo-500"
      };
    } else if (percentage >= 40) {
      return {
        bg: "from-amber-50 to-orange-50",
        border: "border-amber-200",
        text: "text-amber-800",
        subtext: "text-amber-600",
        iconBg: "bg-amber-100",
        progress: "bg-gradient-to-r from-amber-400 to-orange-500"
      };
    } else {
      return {
        bg: "from-gray-50 to-slate-50",
        border: "border-gray-200",
        text: "text-gray-800",
        subtext: "text-gray-600",
        iconBg: "bg-gray-100",
        progress: "bg-gradient-to-r from-gray-400 to-slate-500"
      };
    }
  }

  getIconByCareer(career) {
    const icons = {
      "Artificial Intelligence": "🤖",
      "Web Development": "🌐",
      "Data Science": "📊",
      "Cybersecurity": "🔒",
      "Software Development": "💻",
      "Machine Learning": "🧠",
      "Mobile Development": "📱",
      "Cloud Computing": "☁️",
      "DevOps": "⚙️",
      "UI/UX Design": "🎨"
    };
    return icons[career] || "💼";
  }

  errorAdd(message) {
    this.showError(`Prediction failed: ${message}`);
  }
}