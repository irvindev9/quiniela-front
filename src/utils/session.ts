import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserStore } from '../stores/UserStore';

export const getUserInfo: any  = (token: string) => {
  const userStore = useUserStore();
  userStore.test();
  return axios.get(import.meta.env.VITE_API_URL + 'user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const logout: any = async () => {
  Cookies.remove('user-info', { path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
  axios.get(import.meta.env.VITE_API_URL + 'logout',{
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    },
  });
  Cookies.remove('sanctum-session', { path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
}