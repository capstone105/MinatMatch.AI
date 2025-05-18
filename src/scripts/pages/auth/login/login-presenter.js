export default class LoginPresenter {
  constructor({ view, model}) {
    this.view = view;
    this.model = model;
  }

    async login(email, password) {
      const user = this.validateUser(email, password);
      if (user) {
        const token = generateToken();
        putAccesToken(token);
        return { success: true, token };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
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
