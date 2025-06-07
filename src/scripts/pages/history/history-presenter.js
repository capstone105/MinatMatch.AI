export default class HistoryPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async getHistory() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getPredictionHistory(this.#authModel);
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      console.log(response.data);
      this.#view.displayHistory(response.data);
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async deleteHistory() {
    this.#view.showLoading();
    try {
      const response = await this.#model.deletePredictionHistory(this.#authModel);
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      this.getHistory();
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async deleteHistoryById(id) {
    this.#view.showLoading();
    try {
      const response = await this.#model.deletePredictionById(id, this.#authModel);
      if (response.status !== "success") {
        throw new Error(response.message);
      }
      await this.getHistory();
    } catch (error) {
      this.#view.showError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}