export default class LoginPresenter {
  constructor({ view, model}) {
    this.view = view;
    this.model = model;
  }

  async getLogin({ email, password }) {
    const user = this.model.validateUser(email, password);
    if (user) {
      this.view.loggedInSuccessfully("Login berhasil!");
      this.model.login(email, password);
    } else {
      this.view.showError("Email atau password salah!");
    }
  }
}
