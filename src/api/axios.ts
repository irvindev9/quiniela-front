import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import { useUserStore } from '../stores/UserStore';

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user-info');
  sessionStorage.clear();

  Cookies.remove('sanctum-session', { path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
  Cookies.remove('user-info', { path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

  try {
    const userStore = useUserStore();
    userStore.logout();
  } catch (e) {
    // Pinia store might not be mounted in certain contexts (e.g. unit tests)
  }
}

export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const url = error.config?.url || '';
        const isAuthRequest =
          url.includes('/login') ||
          url.includes('login') ||
          url.includes('/register') ||
          url.includes('register');

        if (!isAuthRequest) {
          clearSession();

          if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            router.push('/');
          }
        }
      }
      return Promise.reject(error);
    }
  );
}
