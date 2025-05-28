export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async getLogin({email, password}) {
    this.#view.showLoading();
    try {
      const response = await this.#model.login({ email, password });
      if (response.error) {
        throw new Error(response.message);
      }
      this.#authModel.putAccessToken(response.data.token);
      this.#view.loggedInSuccessfully();
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
