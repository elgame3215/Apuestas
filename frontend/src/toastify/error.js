import { toast } from "react-toastify";
import { COLORS } from "../constants/colors.js";

export function toastifyError({ message }) {
  toast.error(message, {
    autoClose: 2000,
    closeButton: false,
    pauseOnHover: false,
    style: { backgroundColor: COLORS.GREY, color: COLORS.WHITE },
  });
}
