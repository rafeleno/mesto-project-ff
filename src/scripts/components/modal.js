// Открытие popup (в аргументе(popup__content))
import { escapeCloser } from "../index";

export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", escapeCloser);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", escapeCloser);
}
