import axios from 'axios';
import Cookies from 'js-cookie';

export const getUserInfo: any  = (token: string) => {
  const userInfo: any = [];

  axios.get(import.meta.env.VITE_BASE_URL + 'user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    userInfo.push(res.data);
  });

  return userInfo;
}

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user-info');
  Cookies.remove('sanctum-session');
  return axios.get(import.meta.env.VITE_BASE_URL + 'logout');
}