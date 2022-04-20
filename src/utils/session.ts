import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserStore } from '../stores/UserStore';

export const getUserInfo: any  = (token: string) => {
  const userStore = useUserStore();
  userStore.test();
  return axios.get(import.meta.env.VITE_BASE_URL + 'user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const logout: any = () => {
  
  Cookies.remove('token');
  Cookies.remove('user-info');
  Cookies.remove('sanctum-session');
  return axios.get(import.meta.env.VITE_BASE_URL + 'logout');
}