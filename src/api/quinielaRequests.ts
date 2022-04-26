import axios from 'axios';
import Cookies from 'js-cookie';

export const getTeams = async (week_id: number) => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela', {
    params: {
      week_id,
    },
    headers: {
      Authorization: `Bearer ${Cookies.get('sanctum-session')}`,
    }
  });

  return data;
}