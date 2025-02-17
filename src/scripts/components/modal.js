// Закрытие попапа по нажатию Esc(callback)
const escapeCloser = (evt) => {
  const modal = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" || evt.key === "Esc") {
    closeModal(modal);
  }
};

// Открытие popup (в аргументе(popup__content))
export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", escapeCloser);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", escapeCloser);
}
