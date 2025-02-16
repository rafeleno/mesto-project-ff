import { openModal, closeModal } from "./modal";

const imagePopup = document.querySelector(".popup_type_image");
const popupImageElement = document.querySelector(".popup__image");
const popupCaptionElement = document.querySelector(".popup__caption");

//собирает карточку
function createCard(imageSource, cardText, handleCardDelete, handleClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");

  img.src = imageSource;
  img.alt = cardText;
  cardElement.querySelector(".card__title").textContent = cardText;
  cardDeleteButton.addEventListener("click", handleCardDelete);
  handleClick(likeButton, "card__like-button_is-active");

  img.addEventListener("click", (evt) => {
    popupImageElement.src = imageSource;
    popupImageElement.alt = cardText;
    popupCaptionElement.textContent = cardText;
    openModal(imagePopup);
  });

  return cardElement;
}

// callback для смены класса likeButton
const likeButtonHandleClick = (element, className) => {
  element.addEventListener("click", () => {
    element.classList.toggle(`${className}`);
  });
};

const escapeCloser = (evt) => {
  const modal = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" || evt.key === "Esc") {
    closeModal(modal);
  }
};

//удаляет карточку
function handleCardDelete(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// Обрабатывает создание новой карточки

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const form = document.querySelector("#card-add-form");

  const placesList = document.querySelector(".places__list");
  const imageSrcInput = document.querySelector(".popup__input_type_url");
  const imageNameInput = document.querySelector(".popup__input_type_card-name");

  const imageSrc = imageSrcInput.value;
  const imageName = imageNameInput.value;

  placesList.prepend(createCard(imageSrc, imageName, handleCardDelete, likeButtonHandleClick));

  imageSrcInput.textContent = "";
  imageNameInput.textContent = "";

  form.reset();
}

export { handleCardDelete, createCard, handleAddCardFormSubmit, likeButtonHandleClick, escapeCloser };
