import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import FeaturesPage from '../pages/features/features';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';

const routes = {
  '/': new HomePage(),
  '/features': new FeaturesPage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),

};

export default routes;
