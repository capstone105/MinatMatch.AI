import ProfilePresenter from "./profile-presenter.js";
import * as MinatMatch from "../../data/api.js";
import { getAccessToken, removeAccessToken } from "../../utils/auth";
import Swal from "sweetalert2";

export default class ProfilePage {
  #presenter;
  #profileData;

  async render() {
    return `
             <section class="min-h-screen via-white to-indigo-50 pt-24">
              <div class="container mx-auto px-4 py-8 sm:py-12">
                <div class="flex flex-col items-center">
                  <!-- Header Section -->
                  <div class="text-center mb-12">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center" tabindex="0" id="profile-main-heading">
                      My Profile
                    </h1>
                    <p class="text-gray-600 text-sm sm:text-base max-w-md mx-auto" tabindex="0">
                    Manage Your Account
                    </p>
                  </div>

            <!-- Main Profile Card -->
            <div class="w-full max-w-md">
              <div id="profile-view" class="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300" role="region" aria-labelledby="profile-main-heading">
                <!-- Header Section -->
                <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-center relative">
                  <div class="absolute inset-0 bg-black/10"></div>
                  <div class="relative z-10">
                    <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30 overflow-hidden">
                      <img id="profile-pic-view" src="images/profile/puffin.jpg" alt="Profile picture" class="w-full h-full object-cover rounded-full" />
                    </div>
                    <h2 id="profile-name-view" class="text-2xl font-bold text-white mb-2" tabindex="0"></h2>
                    <div id="profile-email-view" class="flex items-center justify-center text-white/90" tabindex="0">
                      <i class="fas fa-envelope mr-2"></i>
                      <span class="text-sm font-medium"></span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="p-8">
                  <div class="grid grid-cols-1 gap-4 mb-6">
                    <button id="edit-profile-btn" class="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <i class="fas fa-edit mr-3 group-hover:scale-110 transition-transform"></i>
                      <span>Edit Profile</span>
                    </button>
                    <button id="change-password-btn" class="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <i class="fas fa-key mr-3 group-hover:scale-110 transition-transform"></i>
                      <span>Change Password</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Delete Account Button -->
              <button id="delete-account-btn" class="mt-6 w-full group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <i class="fas fa-trash-alt mr-3 group-hover:scale-110 transition-transform"></i>
                <span>Delete Account</span>
              </button>
            </div>

            <!-- Edit Profile Modal -->
            <div id="edit-profile-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" tabindex="-1">
              <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 relative border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
                <button id="close-edit-profile" aria-label="Close edit profile modal" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                  <i class="fas fa-times text-lg"></i>
                </button>
                
                <div class="text-center mb-8">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
                    <i class="fas fa-user-edit text-2xl text-white"></i>
                  </div>
                  <h2 id="edit-profile-title" class="text-2xl font-bold text-gray-800">Edit Profile</h2>
                  <p class="text-gray-600 mt-2">Update your account information</p>
                </div>

                <form id="profile-form" class="space-y-6">
                  <!-- Profile Picture Section -->
                  <div class="flex flex-col items-center mb-6">
                    <div class="relative mb-4">
                      <img id="profile-pic-preview" src="images/profile/puffin.jpg" alt="Profile picture preview" class="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg" />
                      <div class="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer transition-colors shadow-lg">
                        <label for="profilePic" class="cursor-pointer">
                          <i class="fas fa-camera text-white text-sm"></i>
                          <input type="file" id="profilePic" accept="image/*" class="hidden" />
                        </label>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 text-center">Click camera icon to change photo<br>Max file size: 2MB</p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-gray-700 text-sm font-semibold" for="name">
                      Username
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your username"
                        aria-describedby="name-error"
                        class="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                        <i class="fas fa-user text-gray-400"></i>
                      </div>
                    </div>
                    <p id="name-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-gray-700 text-sm font-semibold" for="email">
                      Email Address
                    </label>
                    <div class="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        aria-describedby="email-error"
                        class="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                        <i class="fas fa-envelope text-gray-400"></i>
                      </div>
                    </div>
                    <p id="email-error" class="text-red-500 text-sm mt-1" role="alert" aria-live="polite"></p>
                  </div>

                  <button type="submit" id="profile-save-btn" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <i class="fas fa-save mr-3"></i>
                    <span>Save Changes</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Change Password Modal -->
            <div id="change-password-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="change-password-title" tabindex="-1">
              <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 relative border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
                <button id="close-change-password" aria-label="Close change password modal" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                  <i class="fas fa-times text-lg"></i>
                </button>
                
                <div class="text-center mb-8">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4">
                    <i class="fas fa-lock text-2xl text-white"></i>
                  </div>
                  <h2 id="change-password-title" class="text-2xl font-bold text-gray-800">Change Password</h2>
                  <p class="text-gray-600 mt-2">Update your account security</p>
                </div>

                <form id="password-form-modal" class="space-y-6">
                  <div class="space-y-2">
                    <label class="block text-gray-700 text-sm font-semibold" for="oldPassword">
                      Current Password
                    </label>
                    <div class="relative">
                      <input type="password" id="oldPassword" name="oldPassword" required placeholder="Enter current password"
                        class="w-full py-4 pl-12 pr-12 text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                        <i class="fas fa-key text-gray-400"></i>
                      </div>
                      <i class="fas fa-eye-slash absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors toggle-password" data-target="oldPassword"></i>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-gray-700 text-sm font-semibold" for="newPassword">
                      New Password
                    </label>
                    <div class="relative">
                      <input type="password" id="newPassword" name="newPassword" required placeholder="Enter new password"
                        class="w-full py-4 pl-12 pr-12 text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" />
                      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
                        <i class="fas fa-key text-gray-400"></i>
                      </div>
                      <i class="fas fa-eye-slash absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors toggle-password" data-target="newPassword"></i>
                    </div>
                  </div>

                  <button type="submit" id="password-save-btn" class="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                    <i class="fas fa-sync-alt mr-3"></i>
                    <span>Update Password</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Loading Indicator -->
            <div id="loading-indicator" class="fixed inset-0 items-center justify-center bg-white/80 backdrop-blur-sm z-50 hidden">
              <div class="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div class="flex flex-col items-center">
                  <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
                  <p class="text-gray-600 font-medium">Loading...</p>
                </div>
              </div>
            </div>

            <!-- Accessibility -->
            <div id="aria-live-message" class="sr-only" aria-live="polite" role="status" tabindex="-1"></div>
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

    // Profile Picture Upload Handler
    const profilePicInput = document.getElementById("profilePic");
    const profilePicPreview = document.getElementById("profile-pic-preview");
    profilePicInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
          this.showError("Profile picture must be less than 2MB.");
          profilePicInput.value = "";
          profilePicPreview.src = this.#profileData?.profilePic || "images/profile/puffin.jpg";
          return;
        }
        
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          this.showError("Please select a valid image file (JPEG, PNG, or GIF).");
          profilePicInput.value = "";
          profilePicPreview.src = this.#profileData?.profilePic || "images/profile/puffin.jpg";
          return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
          profilePicPreview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    document.querySelectorAll(".toggle-password").forEach((icon) => {
      icon.addEventListener("click", function () {
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
      
      // Include profile picture file
      const profilePic = profilePicInput.files[0] || null;
      await this.#presenter.saveProfile({ name, email, profilePic });
      
      const modal = document.getElementById("edit-profile-modal");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }

      setTimeout(() => {
        const editBtn = document.getElementById("edit-profile-btn");
        if (editBtn) editBtn.focus();
      }, 100);
    });

    const changePasswordBtn = document.getElementById("change-password-btn");
    const changePasswordModal = document.getElementById("change-password-modal");
    const closeChangePassword = document.getElementById("close-change-password");
    changePasswordBtn.addEventListener("click", () => {
      changePasswordModal.classList.remove("hidden");
      changePasswordModal.classList.add("flex");
      setTimeout(() => {
        const oldPasswordInput = document.getElementById("oldPassword");
        if (oldPasswordInput) oldPasswordInput.focus();
      }, 100);
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
      const changePasswordModal = document.getElementById("change-password-modal");
      if (changePasswordModal) {
        changePasswordModal.classList.add("hidden");
        changePasswordModal.classList.remove("flex");
      }
      setTimeout(() => {
        const changeBtn = document.getElementById("change-password-btn");
        if (changeBtn) changeBtn.focus();
      }, 100);
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
    
    // Update profile picture
    const profilePicView = document.getElementById("profile-pic-view");
    if (profilePic) {
      profilePicView.src = profilePic;
    } else {
      profilePicView.src = "images/profile/puffin.jpg";
    }
    
    this.#profileData = { name, email, profilePic };
  }

  showEditProfileModal() {
    document.getElementById("name").value = this.#profileData?.name || "";
    document.getElementById("email").value = this.#profileData?.email || "";
    
    // Set profile picture preview
    const profilePicPreview = document.getElementById("profile-pic-preview");
    if (this.#profileData?.profilePic) {
      profilePicPreview.src = this.#profileData.profilePic;
    } else {
      profilePicPreview.src = "images/profile/puffin.jpg";
    }
    
    setTimeout(() => {
      const nameInput = document.getElementById("name");
      if (nameInput) nameInput.focus();
    }, 100);
  }

  showFieldError(fieldId, message) {
    const errorField = document.getElementById(`${fieldId}-error`);
    if (errorField) {
      errorField.textContent = message;
    }
  }

  showLoading() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.remove("hidden");
    loadingIndicator.classList.add("flex");
  }
  hideLoading() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.add("hidden");
    loadingIndicator.classList.remove("flex");
  }

  showLoadingSave() {
    const btn = document.getElementById("profile-save-btn");
    if (btn) {
      btn.innerHTML = `
        <div class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
        <span>Saving...</span>
      `; 
      btn.setAttribute("disabled", true);
      btn.classList.add("cursor-wait", "opacity-75");
    }
  }

  hideLoadingSave() {
    const btn = document.getElementById("profile-save-btn");
    if (btn) {
      btn.innerHTML = `<i class="fas fa-save mr-3"></i><span>Save Changes</span>`;
      btn.removeAttribute("disabled");
      btn.classList.remove("cursor-wait", "opacity-75");
    }
  }

  showLoadingPassword() {
    const btn = document.getElementById("password-save-btn");
    if (btn) {
      btn.innerHTML = `
        <div class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
        <span>Updating...</span>
      `;
      btn.setAttribute("disabled", true);
      btn.classList.add("cursor-wait", "opacity-75");
    }
  }

  hideLoadingPassword() {
    const btn = document.getElementById("password-save-btn");
    if (btn) {
      btn.innerHTML = `<i class="fas fa-sync-alt mr-3"></i><span>Update Password</span>`;
      btn.removeAttribute("disabled");
      btn.classList.remove("cursor-wait", "opacity-75");
    }
  }

  showSuccess(message) {
    const ariaLive = document.getElementById("aria-live-message");
    if (ariaLive) {
      ariaLive.textContent = "";
      setTimeout(() => {
        ariaLive.textContent = message;
        ariaLive.focus && ariaLive.focus();
      }, 100);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "linear-gradient(135deg, #10b981, #059669)",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl shadow-2xl px-6 py-4 border border-white/20",
        title: "text-white font-semibold",
        icon: "text-white",
      },
    });
  }

  showError(message) {
    const ariaLive = document.getElementById("aria-live-message");
    if (ariaLive) {
      ariaLive.textContent = "";
      setTimeout(() => {
        ariaLive.textContent = message;
        ariaLive.focus && ariaLive.focus();
      }, 100);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "linear-gradient(135deg, #f87171, #ef4444)",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl shadow-2xl px-6 py-4 border border-white/20",
        title: "text-white font-semibold",
        icon: "text-white",
      },
    });
  }

  accountDeleted() {
    this.showSuccess("Account deleted successfully.");
    removeAccessToken();
    location.hash = "/login";
  }
}