//собирает карточку
function createCard({ imageSource, cardText, likes, cardId, handleCardDelete, removeHandleDelete, handleClick, isWeLike, popupOpener, ownerId }) {
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
  if (removeHandleDelete) {
    cardDeleteButton.addEventListener("click", handleCardDelete);
  } else {
    cardDeleteButton.remove();
  }

  //Ставим лайк, если он "Есть"
  isWeLike(cardId).then((isLiked) => {
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
  });

  likeButton.addEventListener("click", handleClick);
  img.addEventListener("click", (evt) => popupOpener(imageSource, cardText));

  return cardElement;
}

// Добавление лайка
function likeCountPlus(card) {
  const cardId = card.dataset.cardId;
  fetch(`https://nomoreparties.co/v1/wff-cohort-33/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
  }).then((data) =>
    data.json().then((newCard) => {
      card.querySelector(".card__like-button-volume").textContent = newCard.likes.length;
    })
  );
}

// Удаление лайка
function likeCountMinus(card) {
  const cardId = card.dataset.cardId;
  fetch(`https://nomoreparties.co/v1/wff-cohort-33/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
  }).then((data) =>
    data.json().then((newCard) => {
      card.querySelector(".card__like-button-volume").textContent = newCard.likes.length;
    })
  );
}

// Поведение кнопки лайка
const likeButtonHandleClick = (evt) => {
  const card = evt.target.closest(".card");
  evt.target.classList.toggle("card__like-button_is-active");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    likeCountPlus(card);
  } else {
    likeCountMinus(card);
  }
};

// Удалить карточку с сервера
// TODO: Переработать так, чтобы работало с сервером а не с версткой
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
