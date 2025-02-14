import '../pages/index.css';
import { presets } from '../../babel.config.js';
import {
  openModal,
  closeModal,
  overlayClose,
  resetProfileForm,
} from './components/modal.js';
import {
  initialCards,
  handleCardDelete,
  createCard,
  handleAddCardFormSubmit,
  likeButtonHandleClick,
  popupOpenFunc,
} from './components/cards.js';

const placesList = document.querySelector('.places__list');
const closeButtons = document.querySelectorAll('.popup__close');
const forms = document.querySelectorAll('.popup__form');
const profileAddButton = document.querySelector('#profile-add-button');
const addCardPopup = document.querySelector('#profile-add-popup');
const profileEditButton = document.querySelector('#profile-edit-button');
const popupTypeEdit = document.querySelector('#popup-type-edit');
const cardAddFormElement = document.querySelector('#card-add-form');

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener('click', (evt) => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', (evt) => openModal(addCardPopup));

// Добавление возможности закрыть Popup
overlayClose(addCardPopup);
overlayClose(popupTypeEdit);

// Добавление функции закрытия на кнопки закрытия.
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closeModal(button.closest('.popup__content'));
    resetProfileForm();
    cardAddFormElement.reset();
  });
});

//Теперь Submit закрывает poppup
forms.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    closeModal(form.closest('.popup__content'));
  });
});

//Теперь Escape закрывает poppup
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup.querySelector('.popup__content'));
      resetProfileForm();
    }
    cardAddFormElement.reset();
  }
});

resetProfileForm();

cardAddFormElement.addEventListener('submit', handleAddCardFormSubmit);

// Добавление изначальных карточек на страницу
initialCards.forEach((item) => {
  placesList.append(
    createCard(
      item.src,
      item.alt,
      item.name,
      handleCardDelete,
      likeButtonHandleClick,
      popupOpenFunc
    )
  );
});
