import { IziToastPosition } from "izitoast";

export type Notification = {
  id: number;
  message: string;
  position: IziToastPosition;
  color: string;
}