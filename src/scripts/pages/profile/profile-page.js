import ProfilePresenter from "./profile-presenter.js";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken, removeAccessToken } from "../../utils/auth";

export default class ProfilePage {
  #presenter;
  #profileData;

  async render() {
    return `
      <section class="container mx-auto px-4">
        <div class="p-5 flex flex-col items-center min-h-screen">
          <div class="w-full max-w-md sm:w-96">
            <h1 class="mt-24 md:mt-28 lg:mt-32 text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800">
              <i class="fas fa-user-circle mr-2"></i>My Profile
            </h1>
            
            <div id="profile-view" class="w-full bg-white shadow-lg rounded-xl overflow-hidden">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-24 relative">
                <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img id="profile-pic-view" src="" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                </div>
              </div>
              <div class="pt-16 pb-6 px-6 text-center">
                <h2 id="profile-name-view" class="text-xl font-bold text-gray-800 mb-1"></h2>
                <p id="profile-email-view" class="text-gray-600 mb-6 flex items-center justify-center">
                  <i class="fas fa-envelope mr-2 text-sm"></i>
                  <span class="text-sm"></span>
                </p>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <button id="edit-profile-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                    <i class="fas fa-edit mr-2"></i> Edit
                  </button>
                  <button id="change-password-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                    <i class="fas fa-key mr-2"></i> Password
                  </button>
                </div>
              </div>
            </div>

            <button id="delete-account-btn" class="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-full flex items-center justify-center transition-colors">
              <i class="fas fa-trash-alt mr-2"></i> Delete Account
            </button>
          </div>

          <div id="edit-profile-modal" class="fixed inset-0 bg-black bg-opacity-40 items-center justify-center z-50 hidden">
            <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 relative">
              <button id="close-edit-profile" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
                <i class="fas fa-times"></i>
              </button>
              <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-user-edit mr-2 text-blue-500"></i> Edit Profile
              </h2>
              <form id="profile-form">
                <div class="flex flex-col items-center mb-6">
                  <img id="profile-pic-preview" src="" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4" />
                  <label for="profilePic" class="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
                    <i class="fas fa-camera mr-2"></i> Change Photo
                    <input type="file" id="profilePic" accept="image/*" class="hidden" />
                  </label>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="name">
                    Username
                  </label>
                  <div class="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Username"
                      aria-describedby="name-error"
                      class="shadow appearance-none border rounded w-full py-2 pl-11 pr-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
                    />
                    <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                      <i class="fa-solid fa-user"></i>
                    </span>
                  </div>
                  <p id="name-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm md:text-base font-bold mb-2" for="email">
                    Email
                  </label>
                  <div class="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Email"
                      aria-describedby="email-error"
                      class="shadow appearance-none border rounded w-full py-2 pl-11 pr-3 text-sm md:text-base text-gray-700 leading-tight focus:outline-none focus:ring"
                    />
                    <span class="absolute inset-y-0 left-0 px-3 flex items-center justify-center text-gray-600 bg-slate-200 rounded-l">
                      <i class="fa-solid fa-envelope"></i>
                    </span>
                  </div>
                  <p id="email-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
                </div>
                <button type="submit" id="profile-save-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring w-full flex items-center justify-center">
                  <i class="fas fa-save mr-2"></i> Save Changes
                </button>
              </form>
            </div>
          </div>

          <div id="change-password-modal" class="fixed inset-0 bg-black bg-opacity-40 items-center justify-center z-50 hidden">
            <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 relative">
              <button id="close-change-password" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
                <i class="fas fa-times"></i>
              </button>
              <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <i class="fas fa-lock mr-2 text-yellow-500"></i> Change Password
              </h2>
              <form id="password-form-modal">
                <div class="mb-4">
                  <label class="text-gray-700 text-sm font-bold mb-2 flex items-center" for="oldPassword">
                    <i class="fas fa-key mr-2 text-yellow-500"></i> Current Password
                  </label>
                  <div class="relative">
                    <input type="password" id="oldPassword" name="oldPassword" required 
                      class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300 pr-10" />
                    <i class="fas fa-eye-slash absolute right-3 top-3.5 text-gray-400 cursor-pointer toggle-password" data-target="oldPassword"></i>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="text-gray-700 text-sm font-bold mb-2 flex items-center" for="newPassword">
                    <i class="fas fa-key mr-2 text-yellow-500"></i> New Password
                  </label>
                  <div class="relative">
                    <input type="password" id="newPassword" name="newPassword" required 
                      class="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300 pr-10" />
                    <i class="fas fa-eye-slash absolute right-3 top-3.5 text-gray-400 cursor-pointer toggle-password" data-target="newPassword"></i>
                  </div>
                </div>
                <button type="submit" id="password-save-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg w-full flex items-center justify-center transition-colors">
                  <i class="fas fa-sync-alt mr-2"></i> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: MinatMatch,
      authModel: getAccessToken(),
    });
    await this.#presenter.loadProfile();

    const editBtn = document.getElementById("edit-profile-btn");
    const modal = document.getElementById("edit-profile-modal");
    const closeModal = document.getElementById("close-edit-profile");
    editBtn.addEventListener("click", () => {
      this.showEditProfileModal();
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    nameInput.addEventListener("input", () => {
      if (nameInput.value.length < 3) {
        this.showFieldError("name", "Name must be at least 3 characters long.");
      } else {
        this.showFieldError("name", "");
      }
    });
    emailInput.addEventListener("input", () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        this.showFieldError("email", "Please enter a valid email address.");
      } else {
        this.showFieldError("email", "");
      }
    });

    const profilePicInput = document.getElementById("profilePic");
    const profilePicPreview = document.getElementById("profile-pic-preview");
    profilePicInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.showError("Profile picture must be less than 2MB.");
          profilePicInput.value = "";
          profilePicPreview.src = this.#profileData?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(this.#profileData?.name || "User");
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          profilePicPreview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    document.querySelectorAll(".toggle-password").forEach(icon => {
      icon.addEventListener("click", function() {
        const targetId = this.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (input.type === "password") {
          input.type = "text";
          this.classList.replace("fa-eye-slash", "fa-eye");
        } else {
          input.type = "password";
          this.classList.replace("fa-eye", "fa-eye-slash");
        }
      });
    });

    document.getElementById("profile-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = nameInput.value;
      const email = emailInput.value;
      let valid = true;
      if (name.length < 3) {
        this.showFieldError("name", "Name must be at least 3 characters long.");
        valid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        this.showFieldError("email", "Please enter a valid email address.");
        valid = false;
      }
      if (!valid) return;
      const profilePic = profilePicInput.files[0] || null;
      await this.#presenter.saveProfile({ name, email, profilePic });
    });

    const changePasswordBtn = document.getElementById("change-password-btn");
    const changePasswordModal = document.getElementById("change-password-modal");
    const closeChangePassword = document.getElementById("close-change-password");
    changePasswordBtn.addEventListener("click", () => {
      changePasswordModal.classList.remove("hidden");
      changePasswordModal.classList.add("flex");
    });
    closeChangePassword.addEventListener("click", () => {
      changePasswordModal.classList.add("hidden");
      changePasswordModal.classList.remove("flex");
    });

    document.getElementById("password-form-modal").addEventListener("submit", async (e) => {
      e.preventDefault();
      const oldPassword = document.getElementById("oldPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      await this.#presenter.changePassword({ oldPassword, newPassword });
    });

    document.getElementById("delete-account-btn").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        await this.#presenter.deleteAccount();
      }
    });
  }

  showProfile({ name, email, profilePic }) {
    document.getElementById("profile-name-view").textContent = name || "";
    document.getElementById("profile-email-view").querySelector("span").textContent = email || "";
    const profilePicView = document.getElementById("profile-pic-view");
    if (profilePic) {
      profilePicView.src = profilePic;
    } else {
      profilePicView.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name || "User");
    }
    this.#profileData = { name, email, profilePic };
  }

  showEditProfileModal() {
    document.getElementById("name").value = this.#profileData?.name || "";
    document.getElementById("email").value = this.#profileData?.email || "";
    const profilePicPreview = document.getElementById("profile-pic-preview");
    if (this.#profileData?.profilePic) {
      profilePicPreview.src = this.#profileData.profilePic;
    } else {
      profilePicPreview.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(this.#profileData?.name || "User");
    }
  }

  showFieldError(fieldId, message) {
    const errorField = document.getElementById(`${fieldId}-error`);
    if (errorField) {
      errorField.textContent = message;
    }
  }

  showLoading() {
    const btn = document.getElementById("profile-save-btn");
    if (btn) {
      btn.innerHTML = `<span class="loader inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Saving...`;
      btn.setAttribute("disabled", true);
      btn.classList.add("cursor-wait");
    }
  }

  hideLoading() {
    const btn = document.getElementById("profile-save-btn");
    if (btn) {
      btn.innerHTML = `<i class="fas fa-save mr-2"></i> Save Changes`;
      btn.removeAttribute("disabled");
      btn.classList.remove("cursor-wait");
    }
  }

  showLoadingPassword() {
    const btn = document.getElementById("password-save-btn");
    if (btn) {
      btn.innerHTML = `<span class="loader inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Updating...`;
      btn.setAttribute("disabled", true);
      btn.classList.add("cursor-wait");
    }
  }

  hideLoadingPassword() {
    const btn = document.getElementById("password-save-btn");
    if (btn) {
      btn.innerHTML = `<i class="fas fa-sync-alt mr-2"></i> Update Password`;
      btn.removeAttribute("disabled");
      btn.classList.remove("cursor-wait");
    }
  }

  showSuccess(message) {
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in";
    toast.innerHTML = `
      <i class="fas fa-check-circle mr-2"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.replace("animate-fade-in", "animate-fade-out");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  showError(message) {
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in";
    toast.innerHTML = `
      <i class="fas fa-exclamation-circle mr-2"></i>
      <span>Error: ${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.replace("animate-fade-in", "animate-fade-out");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  accountDeleted() {
    this.showSuccess("Account deleted successfully.");
    setTimeout(() => {
      window.location.hash = "/login";
    }, 1500);
  }
}