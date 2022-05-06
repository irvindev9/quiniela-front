import { IziToastPosition } from "izitoast";

export type Notification = {
  id: number;
  message: string;
  position: IziToastPosition;
  color: string;
  active_to: Date;
}

export type Notifications = {
  [key: number]: Notification;
}