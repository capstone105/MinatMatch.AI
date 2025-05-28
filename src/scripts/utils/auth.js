import { getActiveRoute } from '../routes/url-parser';
import CONFIG from '../config';

const UNAUTHENTICATED_ROUTES = ['/', '/about', '/features','/login', '/register'];

export function getAccessToken() {
  try {
    const token = localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  } catch (error) {
    console.error('Gagal mengambil token:', error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Gagal menyimpan token:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Gagal menghapus token:', error);
    return false;
  }
}

export function checkUnauthenticatedRouteOnly(page) {
  const currentRoute = getActiveRoute();
  const hasToken = !!getAccessToken();

  if (UNAUTHENTICATED_ROUTES.includes(currentRoute) && hasToken) {
    window.location.hash = '/add';
    return null;
  }
  return page;
}

export function checkAuthenticatedRoute(page) {
  const hasToken = !!getAccessToken();
  
  if (!hasToken) {
    window.location.hash = '/';
    return null;
  }
  return page;
}


export function logout() {
  removeAccessToken();
  window.location.hash = '/login';
}

export function isLoggedIn() {
  return !!getAccessToken();
}