import iziToast from "izitoast";
import { IziToastSettings, IziToastPosition } from "izitoast";

export const toast = (message: string, { type = "success", timeout = 5000, color = '', position = 'topRight' }: { type?: string; timeout?: number; color?: string; position?: IziToastPosition  }) => {
  const options: IziToastSettings = {
    message,
    position,
    timeout,
  };

  if (color !== '') {
    options.color = color;
  }

  switch(type) {
    case "success":
      iziToast.success(options);
      break;
    case "error":
      iziToast.error(options);
      break;
    case "warning":
      iziToast.warning(options);
      break;
    case "info":
      iziToast.info(options);
      break;
    default:
      iziToast.show(options);
  }

}