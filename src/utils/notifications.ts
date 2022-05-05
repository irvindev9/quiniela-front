import Cookies from "js-cookie";
import { toast } from "./toast";
import { getActiveNotifications } from "../api/notificationsRequests";

export const checkNotifications: any = async () => {
  const notifications = await getActiveNotifications();

  let msg = 100;

  Object.entries(notifications).forEach(([key, value]) => {
    // console.log(key, value);
    console.log({key, value});
    if(Cookies.get('noti' + value.id)) {
      // console.log("ya existe");
    }else{
      // console.log("no existe");
      setTimeout(() => {
        toast(value.message, {
          type: "show",
          position: value.position,
          color: value.color,
        });
      }, msg);
      msg += 200;
      Cookies.set('noti' + value.id, 'true', { expires: 1 , path: '', domain: import.meta.env.VITE_COOKIE_DOMAIN });
    }
  });

}