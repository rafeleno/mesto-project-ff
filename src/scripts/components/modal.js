const forms = document.querySelectorAll('.popup__form');
forms.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    form.closest('.popup').close();
  });
});

// const profileEditForm = document.querySelector("#profile-edit-form");
// let profileEditFormName = "Жак-Ив Кусто";
// let profileEditFormEmployment = "Исследователь океана";

// const openModal = (openButton, modal) => {
//   openButton.addEventListener('click', (evt) => {
//     modal.classList.add('.popup_is-opened');
//     modal.showModal();
//   });
// };

// const closeModal = (closeButton, modal) => {
//   closeButton.addEventListener('click', (evt) => {
//     modal.classList.remove('.popup_is-open');
//     modal.close();
//   });
// };

const closeModalEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-open');
    popup.classList.remove('.popup_is-open');
    popup.close();
  }
};

const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains('.popup')) {
    evt.target.classList.remove('.popup_is-open');
    evt.target.close();
  }
};

//функция открытия, если попап открыт, добавляем слушателя клавиатуры
const openModal = (modal) => {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEsc);
  modal.addEventListener('click', closePopupOverlay);
};

//функция закрытия, если попап закрыт, то удаляем слушателя клавиатуры
const closeModal = (modal) => {
  smodal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  modal.removeEventListener('click', closePopupOverlay);
};

export { openModal, closeModal, closeModalEsc, closePopupOverlay };
