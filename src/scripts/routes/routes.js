import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import FeaturesPage from '../pages/features/features';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import AddPage from '../pages/add/add-page';
import CareerPage from '../pages/career/career-page';

const routes = {
  '/': new HomePage(),
  '/features': new FeaturesPage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add': new AddPage(),
  '/career': new CareerPage(),
};

export default routes;
