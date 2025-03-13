//собирает карточку

import { likeCountPlus, likeCountMinus } from "../api";

function createCard({ imageSource, cardText, likes, cardId, handleCardDelete, handleClick, popupOpener, ownerId, userId }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");
  const likesVolume = cardElement.querySelector(".card__like-button-volume");

  img.src = imageSource;
  img.alt = cardText;
  likesVolume.textContent = Array.isArray(likes) ? likes.length : "0";

  // Назначаю cardId, елси оно есть
  cardId ? (cardElement.dataset.cardId = cardId) : "";

  // Назначаю ownerId, елси оно есть
  ownerId ? (cardElement.dataset.ownerId = ownerId) : "";

  cardElement.querySelector(".card__title").textContent = cardText;

  // Проверяем на то, что мы создали карту
  if (userId === ownerId) {
    cardDeleteButton.addEventListener("click", handleCardDelete);
  } else {
    cardDeleteButton.remove();
  }

  //Ставим лайк, если он "Есть"
  // Ставим лайк, если он "Есть"
  if (likes.some((person) => person._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", handleClick);
  img.addEventListener("click", (evt) => popupOpener(imageSource, cardText));

  return cardElement;
}

// Поведение кнопки лайка
const likeButtonHandleClick = (evt) => {
  const card = evt.target.closest(".card");
  evt.target.classList.toggle("card__like-button_is-active");

  const updateLikeCount = (newCard) => {
    card.querySelector(".card__like-button-volume").textContent = newCard.likes.length;
  };

  if (evt.target.classList.contains("card__like-button_is-active")) {
    likeCountPlus(card.dataset.cardId)
      .then(updateLikeCount)
      .catch((err) => {
        console.error("Ошибка при добавлении лайка:", err);
        evt.target.classList.remove("card__like-button_is-active"); // Откат UI при ошибке
      });
  } else {
    likeCountMinus(card.dataset.cardId)
      .then(updateLikeCount)
      .catch((err) => {
        console.error("Ошибка при удалении лайка:", err);
        evt.target.classList.add("card__like-button_is-active"); // Откат UI при ошибке
      });
  }
};

export { createCard, likeButtonHandleClick };
