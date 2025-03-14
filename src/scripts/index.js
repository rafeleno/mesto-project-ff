import '../pages/index.css';
// import { initialCards } from "./cards.js"; --- Legacy
import { openModal, closeModal } from './components/modal.js';
import { createCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  deleteCard,
  changeAvatar,
  addCard,
  changeProfile,
  fetchProfile,
  fetchCards,
} from './api.js';

// Токен: 017e0eb7-895d-414b-bf4c-a4ee4cf48a1b
// Идентификатор группы: wff-cohort-33

// Лист картинок
const placesList = document.querySelector('.places__list');
// Кнопки открытия Popup'ов
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('#profile-edit-button');
const avatarEditElement = document.querySelector('.avatar_edit-element');
// Кнопки закрытия
const closeButtons = document.querySelectorAll('.popup__close');
// Popups, непосредственно
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');

const popups = document.querySelectorAll('.popup');
// Формы
const addCardForm = popupTypeAddCard.querySelector('#card-add-form');
const profileEditForm = popupTypeEdit.querySelector('#profile-edit-form');
const avatarEditForm = popupTypeAvatar.querySelector('#avatar-form');
// Submit'ы
const cardAddSubmitButton = addCardForm.querySelector('.popup__button');
const profileSubmitButton = profileEditForm.querySelector('.popup__button');
const avatarSubmitButton = avatarEditForm.querySelector('.popup__button');

// 1000 и 1 Input
const nameInput = popupTypeEdit.querySelector('#popup__input_type_name');
const nameInputError = profileEditForm.querySelector(`.${nameInput.id}-error`);
const aboutInput = popupTypeEdit.querySelector(
  '#popup__input_type_description'
);
const aboutInputError = profileEditForm.querySelector(
  `.${aboutInput.id}-error`
);
const imageSrcInput = document.querySelector('#popup__input_type_url');
const imageSrcInputError = addCardForm.querySelector(
  `.${imageSrcInput.id}-error`
);
const imageNameInput = document.querySelector('#popup__input_type_card-name');
const imageNameInputError = addCardForm.querySelector(
  `.${imageNameInput.id}-error`
);
const avatarInput = avatarEditForm.querySelector('#popup__input_type_avatar');
const avatarInputInputError = avatarEditForm.querySelector(
  `.${avatarInput.id}-error`
);
//Header
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.avatar');
// Попапы картинок + элементы, отдельно
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');
// Конфтг валидации
export const validationConfig = {
  inputSelector: '.popup__input',
  inputErrorClass: '.popup__input-error-is-active',
};
// Идентификатор пользователя
let userId;

// Выполняем оба запроса
Promise.all([fetchProfile(), fetchCards()])
  .then(([personData, cardsData]) => {
    // задаем id пользователя
    userId = personData._id;
    // Обрабатываем данные профиля
    profileTitle.textContent = personData.name;
    profileDescription.textContent = personData.about;
    profileAvatar.src = personData.avatar;

    // Обрабатываем данные карточек
    cardsData.forEach((card) => {
      placesList.append(
        createCard({
          imageSource: card.link,
          cardText: card.name,
          likes: card.likes,
          cardId: card._id,
          handleCardDelete: handleCardDelete,
          popupOpener: popupOpener,
          ownerId: card.owner._id,
          userId: userId,
        })
      );
    });
  })

  .catch((err) => console.error('Ошибка при загрузке данных:', err));

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener('click', popupEditOpen);
profileAddButton.addEventListener('click', popupTypeAddCardOpen);
avatarEditElement.addEventListener('click', popupTypeAvatarOpen);
// avatarEditElement.addEventListener("click", );

// логика открытия для popupTypeEdit
function popupEditOpen(evt) {
  openModal(popupTypeEdit);

  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  clearValidation({
    input: nameInput,
    validationConfig: validationConfig,
    error: nameInputError,
  });
  clearValidation({
    input: aboutInput,
    validationConfig: validationConfig,
    error: aboutInputError,
  });
}
// логика открытия для popupTypeAddCard
function popupTypeAddCardOpen(evt) {
  cardAddSubmitButton.disabled = true;
  openModal(popupTypeAddCard);

  clearValidation({
    input: imageSrcInput,
    validationConfig: validationConfig,
    error: imageSrcInputError,
  });
  clearValidation({
    input: imageNameInput,
    validationConfig: validationConfig,
    error: imageNameInputError,
  });
  addCardForm.reset();
}

// логика открытия для popupTypeAvatar
function popupTypeAvatarOpen(evt) {
  openModal(popupTypeAvatar);
  avatarSubmitButton.disabled = true;

  avatarEditForm.reset();

  clearValidation({
    input: avatarInput,
    validationConfig: validationConfig,
    error: avatarInputInputError,
  });
}

//закрытие popup по кажатию на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
    }
  });
});

// Функция открытия карточки
const popupOpener = (imageSource, cardText) => {
  popupImageElement.src = imageSource;
  popupImageElement.alt = cardText;
  popupCaptionElement.textContent = cardText;
  openModal(imagePopup);
};

// Закрытия нажатием на кнопки закрытия.
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (evt) => {
    closeModal(popup);
  });
});

// Обрабытваем Submit в редакторе профиля --------------------------------------
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохраняем...';

  changeProfile({ name: nameInput.value, about: aboutInput.value })
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.error('Ошибка при сохранении профиля:', err))
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить';
    });
}

// Вызываем на функцию submit'a на форму редактирования профиля ------------------------
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Обрабатывает создание новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardAddSubmitButton.textContent = 'Сохраняем...';

  addCard({ name: imageNameInput.value, link: imageSrcInput.value })
    .then((card) => {
      placesList.prepend(
        createCard({
          imageSource: card.link,
          cardText: card.name,
          likes: card.likes,
          cardId: card._id,
          handleCardDelete: handleCardDelete,
          popupOpener: popupOpener,
          ownerId: card.owner._id,
          userId: userId,
        })
      );
      closeModal(popupTypeAddCard);
    })
    .catch((err) => console.error('Ошибка при добавлении карточки:', err))
    .finally(() => {
      cardAddSubmitButton.textContent = 'Сохранить';
    });
}

// Вызываем на функцию submit'a на форму добавления карточки ------------------
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

//  Обработка submit'a avatarSubmitButton
function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохраняем...';

  changeAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.url;
      console.log(res);
      //TODO: убрать лишний fetch
      // return fetchProfile();
    })
    .then((profileData) => {
      profileAvatar.src = profileData.avatar;
      closeModal(popupTypeAvatar);
    })
    .catch((err) => console.error('Ошибка обновления аватара:', err))
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
    });
}

//Вызываем handleAvatarEditFormSubmit
avatarEditForm.addEventListener('submit', handleAvatarEditFormSubmit);

enableValidation({
  form: addCardForm,
  submitButton: cardAddSubmitButton,
  validationConfig: validationConfig,
});
enableValidation({
  form: profileEditForm,
  submitButton: profileSubmitButton,
  validationConfig: validationConfig,
});
enableValidation({
  form: avatarEditForm,
  submitButton: avatarSubmitButton,
  validationConfig: validationConfig,
});

// Класс анимации
popups.forEach(function (item) {
  item.classList.add('popup_is-animated');
});

//удаляет карточку
const popupTypeCardDelete = document.querySelector('.popup_type_cardDelete');
const cardDeleteForm = document.querySelector('#card-delete-form');

let selectedCard = null; // Глобальная переменная для хранения выбранной карточки

function handleCardDelete(card) {
  selectedCard = card;

  openModal(popupTypeCardDelete);

  // Очищаем старые обработчики перед добавлением нового
  const newCardDeleteForm = cardDeleteForm.cloneNode(true);
  cardDeleteForm.replaceWith(newCardDeleteForm);

  // Добавляем новый обработчик `submit`
  newCardDeleteForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteSelectedCard();
  });

  // Добавляем обработчик нажатия Enter
  function handleEnterKey(evt) {
    if (evt.key === 'Enter') {
      deleteSelectedCard();
    }
  }
  window.addEventListener('keydown', handleEnterKey);

  // Функция удаления карточки
  function deleteSelectedCard() {
    if (!selectedCard) return;

    deleteCard(selectedCard.dataset.cardId)
      .then(() => {
        closeModal(popupTypeCardDelete);
        selectedCard.remove();
        selectedCard = null; // Сбрасываем переменную после удаления
        window.removeEventListener('keydown', handleEnterKey); // Убираем обработчик Enter
      })
      .catch((err) => console.error('Ошибка при удалении карточки:', err));
  }
}
