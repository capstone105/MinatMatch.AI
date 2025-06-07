import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import FeaturesPage from "../pages/features/features";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import AddPage from "../pages/add/add-page";
import HistoryPage from "../pages/history/history-page";
import NotFoundPage from "../pages/not-found/not-found-page";
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from "../utils/auth";
import ProfilePage from "../pages/profile/profile-page";

const routes = {
  "/": () => checkUnauthenticatedRouteOnly(new HomePage()),
  "/features": () => checkUnauthenticatedRouteOnly(new FeaturesPage()),
  "/about": () => checkUnauthenticatedRouteOnly(new AboutPage()),
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  "/add": () => checkAuthenticatedRoute(new AddPage()),
  "/history": () => checkAuthenticatedRoute(new HistoryPage()),
  "/profile": () => checkAuthenticatedRoute(new ProfilePage()),
  "*": new NotFoundPage(),
};

export default routes;
