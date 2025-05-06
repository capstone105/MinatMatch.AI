import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import CekMinat from '../pages/cek-minat/cek-minat-page';

const routes = {
  '/': new HomePage(),
  '/minat': new CekMinat(),
  '/about': new AboutPage(),

};

export default routes;
