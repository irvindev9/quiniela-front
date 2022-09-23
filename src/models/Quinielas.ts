import { IziToastPosition } from 'izitoast';

export type Team = {
  id: number;
  name: string;
  logo: string;
}

export type Match = {
  id: number;
  week_id: number;
  team_id: number;
  team_id_2: number;
  winner_id: number;
  team_1?: Team
  team_2?: Team
}

export type Matches = {
  [key: number]: Match;
}

export type Week = {
  id: number;
  name: string;
  matches?: Matches;
  end_date: string;
  is_forced_open: number;
  is_forced_open_quiniela: number;
}

export type Weeks = {
  [key: number]: Week;
}

export type Season = {
  id: number;
  name: string;
  is_active: number;
  is_register_open: number;
}

export type Seasons = {
  [key: number]: Season;
}

export type Player = {
  user_id: number;
  name: string;
  position: number;
  points: number;
  img: string;
}

export type Players = {
  [key: number]: Player;
}

export type UserResult = {
  id: number;
  user_id: number;
  match_id: number;
  team_id: number;
}

export type UserResults = {
  [key: number]: UserResult;
}

export type Result = {
  email: number
  id: number;
  img: string;
  is_hide: number;
  is_paid: number;
  name: string;
  points: number;
  results: UserResults;
  role_id: number;
  team_id: number;
}

export type Results = {
  [key: number]: Result;
}