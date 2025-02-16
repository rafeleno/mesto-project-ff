import "../pages/index.css";
import { openModal, closeModal, resetProfileForm } from "./components/modal.js";
import { initialCards, handleCardDelete, createCard, handleAddCardFormSubmit, likeButtonHandleClick } from "./components/cards.js";

const placesList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const forms = document.querySelectorAll(".popup__form");
const profileAddButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector("#profile-edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const cardAddFormElement = document.querySelector("#card-add-form");
const popups = document.querySelectorAll(".popup");

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener("click", (evt) => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", (evt) => openModal(addCardPopup));

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened") || evt.target.classList.contains("popup__close")) resetProfileForm();
  cardAddFormElement.reset();
});

//закрытие popup по кажатию на overlay
document.addEventListener("mousedown", function (evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    for (var i = 0; i < popups.length; i++) {
      popups[i].classList.remove("popup_is-opened");
    }
  }
});

// Добавление функции закрытия на кнопки закрытия.
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closeModal(button.closest(".popup"));
  });
});

//Теперь Submit закрывает poppup
forms.forEach((form) => {
  form.addEventListener("submit", (evt) => {
    closeModal(form.closest(".popup"));
  });
});

//Теперь Escape закрывает poppup
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup.closest(".popup"));
      resetProfileForm();
      cardAddFormElement.reset();
    }
  }
});

resetProfileForm();

cardAddFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Добавление изначальных карточек на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item.src, item.name, handleCardDelete, likeButtonHandleClick));
});

// Класс анимации
popups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});
