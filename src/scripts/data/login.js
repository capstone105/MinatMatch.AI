export default class LoginModel {
  constructor() {
    this.users = [
      { email: "admin@gmail.com", password: "1234" },
      { email: "user@gmail.com", password: "password" },
    ];
  }

  validateUser(email, password) {
    return this.users.some((user) => user.email === email && user.password === password);
  }

  async login(email, password) {
    const user = this.validateUser(email, password);
    if (user) {
      const token = generateToken();
      putAccesToken(token);
    } else {
      throw new Error("Invalid email or password");
    }
  }
}

function generateToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

export function putAccesToken(token) {
  try {
    localStorage.setItem("access_token", token);
  } catch (error) {
    console.error("Error storing access token:", error);
  }
}

export function getAccesToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
}

export function removeAccesToken() {
  try {
    localStorage.removeItem("access_token");
  } catch (error) {
    console.error("Error removing access token:", error);
  }
}
