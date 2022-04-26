import iziToast from "izitoast";

export const toast = (message: string, { type = "success", timeout = 5000 }: { type?: string; timeout?: number }) => {
  switch(type) {
    case "success":
      iziToast.success({
        title: "",
        message: message,
        timeout: timeout,
      });
      break;
    case "error":
      iziToast.error({
        title: "",
        message: message,
        timeout: timeout,
      });
      break;
    case "warning":
      iziToast.warning({
        title: "",
        message: message,
        timeout: timeout,
      });
      break;
    case "info":
      iziToast.info({
        title: "",
        message: message,
        timeout: timeout,
      });
      break;
  }

}