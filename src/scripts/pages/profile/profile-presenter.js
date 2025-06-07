export default class ProfilePresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async loadProfile() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getProfile(this.#authModel);
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      this.#view.showProfile(response.data);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async saveProfile({ name, email, profilePic }) {
    this.#view.showLoadingSave();
    try {
      const response = await this.#model.updateProfile(this.#authModel, { name, email, profilePic });
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      this.#view.showProfile(response.data);
      this.#view.showSuccess("Profile updated successfully.");
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoadingSave();
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    this.#view.showLoadingPassword();
    try {
      const response = await this.#model.changePassword(this.#authModel, { oldPassword, newPassword });
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      this.#view.showSuccess("Password changed successfully.");
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoadingPassword();
    }
  }

  async deleteAccount() {
    try {
      const response = await this.#model.deleteAccount(this.#authModel);
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      this.#view.accountDeleted();
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}
