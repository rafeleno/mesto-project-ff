import { popupOpener } from "../index";

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
  likeButton.addEventListener("click", handleClick);
  img.addEventListener("click", popupOpener);

  return cardElement;
}

const likeButtonHandleClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

//удаляет карточку
function handleCardDelete(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

export { handleCardDelete, createCard, likeButtonHandleClick };
