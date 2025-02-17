import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { handleCardDelete, createCard, likeButtonHandleClick } from "./components/card.js";

const placesList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector("#profile-edit-button");
const cardAddFormElement = document.querySelector("#card-add-form");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__caption");

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener("click", (evt) => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", (evt) => openModal(addCardPopup));

//закрытие popup по кажатию на overlay
document.addEventListener("mousedown", function (evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    popups.forEach((popup) => {
      popup.classList.remove("popup_is-opened");
    });
  }
  if (evt.target.classList.contains("popup_type_edit")) {
    // Так я изолизую функцию от остальных элементов
    resetProfileForm();
  }
  if (evt.target.classList.contains("popup_type_new-card")) {
    // Тоже самое
    cardAddFormElement.reset();
  }
});

// Функция открытия карточки
const popupOpener = (evt) => {
  const card = evt.target.closest(".card");
  popupImageElement.src = evt.target.src;
  popupImageElement.alt = evt.target.alt;
  popupCaptionElement.textContent = card.textContent;
  openModal(imagePopup);
};

// Закрытия нажатием на кнопки закрытия.
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closeModal(button.closest(".popup"));
    if (button.closest(".popup").classList.contains("popup_type_edit")) {
      resetProfileForm();
    }
    if (button.closest(".popup").classList.contains("popup_type_new-card")) {
      cardAddFormElement.reset();
    }
  });
});

// TODO: Придумать как сбрасывать формы на Esc "По правилам"
// popupTypeEdit.addEventListener("keydown", (evt) => {
//   if (evt.key === "Escape" || evt.key === "Esc") {
//     resetProfileForm();
//   }
// });
// addCardPopup.addEventListener("keydown", (evt) => {
//   if (evt.key === "Escape" || evt.key === "Esc") {
//     cardAddFormElement.reset();
//   }
// });

// TODO:Привести в порядок, проверить на уязвимость формы -------------------------------------
// Обрабытваем Submit в редакторе профиля -----------------------------------

const profileEditFormElement = popupTypeEdit.querySelector(".popup__form");
const nameInput = profileEditFormElement.querySelector(".popup__input_type_name");
const jobInput = profileEditFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  resetProfileForm;
  closeModal(popupTypeEdit);
}

// Вызываем на функцию submit'a на форму редактирования профиля
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);

// Сброс полей формы редактирования профиля
const resetProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

// Вносим значение имени и рода деятельности в импуты на этапе загрузки страницы
resetProfileForm();

// Обрабатывает создание новой карточки
const imageSrcInput = document.querySelector(".popup__input_type_url");
const imageNameInput = document.querySelector(".popup__input_type_card-name");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const imageSrc = imageSrcInput.value;
  const imageName = imageNameInput.value;

  placesList.prepend(createCard(imageSrc, imageName, handleCardDelete, likeButtonHandleClick));

  cardAddFormElement.reset();
}

cardAddFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Логика работы submit для addCardPopup
addCardForm.addEventListener("submit", (evt) => {
  cardAddFormElement.reset();
  closeModal(addCardPopup);
});

// Добавление изначальных карточек на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item.src, item.name, handleCardDelete, likeButtonHandleClick));
});

// Класс анимации
popups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

export { popupOpener };
