import '../pages/index.css';
import { presets } from '../../babel.config.js';
import {
  openModal,
  closeModal,
  handleOverlayClose,
  resetProfileForm,
} from './components/modal.js';
import {
  initialCards,
  handleCardDelete,
  createCard,
  handleAddCardFormSubmit,
  likeButtonHandleClick,
} from './components/cards.js';

const placesList = document.querySelector('.places__list');
const closeButtons = document.querySelectorAll('.popup__close');
const forms = document.querySelectorAll('.popup__form');
const profileAddButton = document.querySelector('#profile-add-button');
const addCardPopup = document.querySelector('#profile-add-popup');
const profileEditButton = document.querySelector('#profile-edit-button');
const popupTypeEdit = document.querySelector('#popup-type-edit');
const cardAddFormElement = document.querySelector('#card-add-form');
//Из функции popupOpenFunc
const cardCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__content_content_image');
const popupImg = popupImage.querySelector('.popup__image');
const overlay = popupImage.closest('.popup');

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener('click', (evt) => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', (evt) => openModal(addCardPopup));

// Добавление возможности закрыть Popup
handleOverlayClose(addCardPopup);
handleOverlayClose(popupTypeEdit);

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

// Callback для показа попапа карточки
// в аргументе (cardElement, img, imageSource, cardText)
const popupOpenFunc = (card, img, src, cardText) => {
  card.addEventListener('click', (evt) => {
    if (evt.target === img) {
      cardCaption.textContent = cardText;
      popupImg.src = src;

      popupImage.classList.toggle('popup_is-opened');
      overlay.classList.toggle('popup_is-opened');
    }
  });

  handleOverlayClose(popupImage);
};

// Добавление изначальных карточек на страницу
initialCards.forEach((item) => {
  placesList.append(
    createCard(
      item.src,
      item.name,
      handleCardDelete,
      likeButtonHandleClick,
      popupOpenFunc
    )
  );
});

export { popupOpenFunc };
