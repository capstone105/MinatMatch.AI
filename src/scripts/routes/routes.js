import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import FeaturesPage from "../pages/features/features";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import AddPage from "../pages/add/add-page";
import CareerPage from "../pages/history/history-page";
import NotFoundPage from "../pages/not-found/not-found-page";
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from "../utils/auth";

const routes = {
  "/": () => checkUnauthenticatedRouteOnly(new HomePage()),
  "/features": () => checkUnauthenticatedRouteOnly(new FeaturesPage()),
  "/about": () => checkUnauthenticatedRouteOnly(new AboutPage()),
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  "/add": () => checkAuthenticatedRoute(new AddPage()),
  "/career": () => checkAuthenticatedRoute(new CareerPage()),
  "*": new NotFoundPage(),
};

export default routes;
