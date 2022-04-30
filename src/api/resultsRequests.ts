import { getMatches } from './adminRequests';
import axios from 'axios';

export const getLeaderboard: any = async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela/leaderBoard');

  return data;
}

export const getResults: any = async (week_id: number) => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela/results/' + week_id);

  return data;
}

export const getMatchs: any = async (week_id: number) => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + 'quiniela/matches/' + week_id);

  return data;
}
