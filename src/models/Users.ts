import { Team } from './Quinielas';

export type User = {
  id: number;
  name: string;
  email: string;
  img: string;
  team?: Team;
  role_id: number;
  is_hide: number;
  is_paid: number;
  team_id: number;
}

export type Users = {
  [key: number]: User;
}