// forms.forEach((form) => {
//     form.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//         form.closest(".popup").classList.remove("popup_is-opened");
//         form.closest(".popup__content").classList.remove("popup_is-opened");
//     });
// });

// const submitModalCloser = (form) => {
//     form.addEventListener("submit", (evt) => {
//         closeModal(form.closest(".popup__content"));
//     });
// };

// const profileEditForm = document.querySelector("#profile-edit-form");
// let profileEditFormName = "Жак-Ив Кусто";
// let profileEditFormEmployment = "Исследователь океана";

// Открытие popup в аргументе(content)
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.closest('.popup').classList.add('popup_is-opened');
};

// Закрытие popup в аргументе(content)
const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.closest('.popup').classList.remove('popup_is-opened');
};

//закрытие popup в аргументе(content) по кажатию на overlay
const overlayClose = (modal) => {
  const popup = modal.closest('.popup');

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(modal);
    }
  });
};

// const closeModalEsc = (evt) => {
//     if (evt.key === "Escape") {
//         const popup = document.querySelector(".popup_is-open");
//         popup.classList.remove(".popup_is-open");
//         popup.close();
//     }
// };

// const closePopupOverlay = (evt) => {
//     if (evt.target.classList.contains(".popup")) {
//         evt.target.classList.remove(".popup_is-open");
//         evt.target.close();
//     }
// };

// //функция открытия, если попап открыт, добавляем слушателя клавиатуры
// const openModal = (modal) => {
//     modal.classList.add("popup_opened");
//     document.addEventListener("keydown", closeModalEsc);
//     modal.addEventListener("click", closePopupOverlay);
// };

// //функция закрытия, если попап закрыт, то удаляем слушателя клавиатуры
// const closeModal = (modal) => {
//     smodal.classList.remove("popup_opened");
//     document.removeEventListener("keydown", closePopupEsc);
//     modal.removeEventListener("click", closePopupOverlay);
// };

export { openModal, closeModal, overlayClose };
