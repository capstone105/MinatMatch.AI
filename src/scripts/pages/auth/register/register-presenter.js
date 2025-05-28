export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegister({ name, email, password }) {
    this.#view.showLoading();
    try {
      const response = await this.#model.register({ name, email, password });
      if (response.error) {
        throw new Error(response.message);
      }
      this.#view.registeredSuccessfully();
    } catch (error) {
      this.#view.errorRegister(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}