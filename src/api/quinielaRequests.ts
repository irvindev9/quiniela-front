import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from '../utils/toast';

export const getQuiniela = async (week_id: number) => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela/' + week_id, {
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  });

  return data;
}

export const saveQuiniela = async (week_id: number, quiniela: any) => {
  await axios.post(import.meta.env.VITE_API_URL + 'quiniela/' + week_id, {quinielas: quiniela}, {
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  }).then((res) => {
    toast('Quiniela guardada', {type: 'success', timeout: 1000});
  }).catch((err) => {
    toast(err.response.data.message , { type: 'error' });
  });
}

export const getWeeks = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela/weeks', {
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  });

  return data;
}

export const getBackgroundsImages = async () => {
  await axios.get(import.meta.env.VITE_API_URL + 'backgrounds/images', {
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  }).then((res) => {
    if(res.data.length > 0) {
      const minutes = 2;
      const random = Math.floor(Math.random() * res.data.length);
      Cookies.set('background', res.data[random], { expires: (1 / 1440) * minutes , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
    } else {
      Cookies.remove('background', { path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
    }
  }).catch((err) => {
    toast(err.response.data.message , { type: 'error' });
  });
}

export const getScore = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'user/score', {
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  });

  return data;
}