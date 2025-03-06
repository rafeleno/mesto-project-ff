//собирает карточку
function createCard({ imageSource, cardText, likes, cardId, handleCardDelete, removeHandleDelete, handleClick, popupOpener, ownerId }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");
  const likesVolume = cardElement.querySelector(".card__like-button-volume");

  img.src = imageSource;
  img.alt = cardText;
  likesVolume.textContent = Array.isArray(likes) ? likes.length : "0";

  cardElement.dataset.cardId = cardId;
  // Назначаю ownerId, елси оно есть
  ownerId ? (cardElement.dataset.ownerId = ownerId) : "";
  cardElement.querySelector(".card__title").textContent = cardText;

  // Проверяем на то, что мы создали карту
  if (!removeHandleDelete) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", handleCardDelete);
  }
  likeButton.addEventListener("click", handleClick);
  img.addEventListener("click", (evt) => popupOpener(imageSource, cardText));

  return cardElement;
}

const likeButtonHandleClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

// Удалить карточку с сервера
function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-33/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
  });
}

//удаляет карточку
function handleCardDelete(evt) {
  const card = evt.target.closest(".card");
  deleteCard(card.dataset.cardId);
  card.remove();
}

export { handleCardDelete, createCard, likeButtonHandleClick };
