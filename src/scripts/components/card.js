import { likeCountPlus, likeCountMinus } from "../api";

//собирает карточку
function createCard({ imageSource, cardText, likes, cardId, handleCardDelete, popupOpener, ownerId, userId }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");
  const likesVolume = cardElement.querySelector(".card__like-button-volume");

  img.src = imageSource;
  img.alt = cardText;
  likesVolume.textContent = Array.isArray(likes) ? likes.length : "0";

  const updateLikeCount = (newCard) => {
    cardElement.querySelector(".card__like-button-volume").textContent = newCard.likes.length;
  };

  // Назначаю cardId, елси оно есть
  cardId ? (cardElement.dataset.cardId = cardId) : "";

  // Назначаю ownerId, елси оно есть
  ownerId ? (cardElement.dataset.ownerId = ownerId) : "";

  cardElement.querySelector(".card__title").textContent = cardText;

  // Проверяем на то, что мы создали карту
  if (userId === ownerId) {
    cardDeleteButton.addEventListener("click", (evt) => {
      handleCardDelete(cardElement);
    });
  } else {
    cardDeleteButton.remove();
  }

  //Ставим лайк, если он "Есть"
  if (likes.some((person) => person._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  // Навешиваем один обработчик на кнопку лайка
  likeButton.addEventListener("click", (evt) => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");

    (isLiked ? likeCountMinus : likeCountPlus)(cardElement.dataset.cardId)
      .then(updateLikeCount)
      .then(() => {
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка при обновлении лайка:", err);
      });
  });

  img.addEventListener("click", (evt) => popupOpener(imageSource, cardText));

  return cardElement;
}

export { createCard };
