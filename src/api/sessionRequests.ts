import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserStore } from '../stores/UserStore';
import router from '../router';

axios.defaults.withCredentials = true;

export const getUserInfo: any  = (token: string) => {
  const userStore = useUserStore();
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

export const loginUser: any = async (email: string, password: string) => {
  const userStore = useUserStore();

  await axios.post(import.meta.env.VITE_API_URL + 'login', { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    Cookies.set('sanctum-session', response.data.token, { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

    const { data } = await getUserInfo(response.data.token);

    userStore.updateUserInfo(data, response.data.token);
    
    Cookies.set('user-info', JSON.stringify(data), { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

    router.push('/marcador');
  }).catch((err) => {
    console.log(err);
  });
}

export const registerUser: any = async (data: any) => {
  const userStore = useUserStore();

  await axios.post(import.meta.env.VITE_API_URL + 'register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const { data } = await getUserInfo(response.data.token);

    userStore.updateUserInfo(data, response.data.token);

    Cookies.set('sanctum-session', response.data.token, { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
    
    Cookies.set('user-info', JSON.stringify(data), { expires: 7 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });

    router.push('/marcador');
  }).catch((err) => {
    console.log(err);
  });
}