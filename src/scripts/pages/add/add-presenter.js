export default class AddPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async handleAdd({ name, gender, age, gpa, interestedDomain, projects, datascience, database, programming }) {
    this.#view.showLoading();
    try {
      const response = await this.#model.predict(this.#authModel, {
        name,
        gender,
        age,
        gpa, 
        interestedDomain,
        projects,
        datascience,
        database,
        programming
      });
      if (response.status !== "success") {
        this.#view.showError(error.message);
        throw new Error(response.message);
      }
      this.#view.showSuccess("Prediction successful!");
      this.#view.showResult(response);
    } catch (error) {
      this.#view.showError(error.message);
    }
    finally {
      this.#view.hideLoading();
    }
  }
}
