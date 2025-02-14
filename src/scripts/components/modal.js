// Открытие popup (в аргументе(popup__content))
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.closest('.popup').classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  popup.closest('.popup').classList.remove('popup_is-animated');
};

// Закрытие popup (в аргументе(popup__content))
const closeModal = (popup) => {
  popup.classList.add('popup_is-animated');
  popup.closest('.popup').classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
  popup.closest('.popup').classList.remove('popup_is-opened');
};

//закрытие popup по кажатию на overlay (в аргументе(popup__content))
const overlayClose = (modal) => {
  const popup = modal.closest('.popup');

  popup.addEventListener('click', (evt) => {
    const cardAddFormElement = document.querySelector('#card-add-form');
    if (evt.target === popup) {
      closeModal(modal);
      profileFormReset();
      cardAddFormElement.reset();
    }
  });
};

// TODO:Привести в порядок, проверить на уязвимость формы -------------------------------------

// Обрабытваем Submit в редакторе профиля -----------------------------------

const profileEditFormElement = document.querySelector('#profile-edit-form');
const nameInput = profileEditFormElement.querySelector(
  '.popup__input_type_name'
);
const jobInput = profileEditFormElement.querySelector(
  '.popup__input_type_description'
);
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

// Вызываем на функцию submit'a на форму редактирования профиля
profileEditFormElement.addEventListener('submit', handleProfileFormSubmit);

// Сброс полей формы редактирования профиля
const profileFormReset = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

export { openModal, closeModal, overlayClose, profileFormReset };
