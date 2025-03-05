import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { handleCardDelete, createCard, likeButtonHandleClick } from "./components/card.js";
import { enableValidation } from "./components/validation.js";

const placesList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const popupTypeAddCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const addCardForm = popupTypeAddCard.querySelector("#card-add-form");
const profileEditForm = popupTypeEdit.querySelector("#profile-edit-form");
const popups = document.querySelectorAll(".popup");

const profileSubmitButton = profileEditForm.querySelector(".popup__button");
const cardAddSubmitButton = addCardForm.querySelector(".popup__button");

const nameInput = popupTypeEdit.querySelector("#popup__input_type_name");
const nameInputError = profileEditForm.querySelector(`.${nameInput.id}-error`);
const aboutInput = popupTypeEdit.querySelector("#popup__input_type_description");
const aboutInputError = profileEditForm.querySelector(`.${aboutInput.id}-error`);
const imageSrcInput = document.querySelector("#popup__input_type_url");
const imageSrcInputError = addCardForm.querySelector(`.${imageSrcInput.id}-error`);
const imageNameInput = document.querySelector("#popup__input_type_card-name");
const cardNameInputError = addCardForm.querySelector(`.${imageNameInput.id}-error`);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const imagePopup = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__caption");

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener("click", popupEditOpen);
profileAddButton.addEventListener("click", popupTypeAddCardOpen);

// логика Для popupTypeEdit
function popupEditOpen(evt) {
  openModal(popupTypeEdit);

  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
}
// логика Для popupTypeAddCard
function popupTypeAddCardOpen(evt) {
  openModal(popupTypeAddCard);

  addCardForm.reset();
}

//закрытие popup по кажатию на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
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
  const popup = button.closest(".popup");
  button.addEventListener("click", (evt) => {
    closeModal(popup);
  });
});

// Обрабытваем Submit в редакторе профиля -----------------------------------
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = aboutInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  // resetProfileForm();
  closeModal(popupTypeEdit);
}

// Вызываем на функцию submit'a на форму редактирования профиля
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Обрабатывает создание новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const imageSrc = imageSrcInput.value;
  const imageName = imageNameInput.value;

  closeModal(popupTypeAddCard);

  placesList.prepend(createCard(imageSrc, imageName, handleCardDelete, likeButtonHandleClick, popupOpener));
}

// Вызываем на функцию submit'a на форму добавления карточки

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Добавление изначальных карточек на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item.src, item.name, handleCardDelete, likeButtonHandleClick, popupOpener));
});

// // Валидация nameInput
// nameInput.addEventListener("input", nameInputIsValid);

// // Валидация aboutInput
// aboutInput.addEventListener("input", aboutInputIsValid);

// // Валидация placeNameInput
// imageNameInput.addEventListener("input", placeNameInputIsValid);

// // Валидация linkInput
// imageSrcInput.addEventListener("input", linkInputIsValid);

const inputRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

// Включаем валидацию
enableValidation({
  regex: inputRegex,
  profileSubmitButton: profileSubmitButton,
  nameInput: nameInput,
  nameInputError: nameInputError,
  aboutInput: aboutInput,
  aboutInputError: aboutInputError,
  cardAddSubmitButton: cardAddSubmitButton,
  cardNameInput: imageNameInput,
  cardNameInputError: cardNameInputError,
  linkInput: imageSrcInput,
  linkInputError: imageSrcInputError,
});

// Класс анимации
popups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});
