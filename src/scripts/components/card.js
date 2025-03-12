import { closeModal, openModal } from "./modal";
import { deleteCard } from "../api";

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

//удаляет карточку
const popupTypeCardDelete = document.querySelector(".popup_type_cardDelete");
const cardDeleteForm = document.querySelector("#card-delete-form");

let selectedCard = null; // Глобальная переменная для хранения выбранной карточки

function handleCardDelete(deleteHandle) {
  openModal(popupTypeCardDelete);

  // Сохраняем актуальную карточку
  selectedCard = deleteHandle.target.closest(".card");

  // Очищаем старые обработчики перед добавлением нового
  const newCardDeleteForm = cardDeleteForm.cloneNode(true);
  cardDeleteForm.replaceWith(newCardDeleteForm);

  // Добавляем новый обработчик `submit`
  newCardDeleteForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    deleteSelectedCard();
  });

  // Добавляем обработчик нажатия Enter
  function handleEnterKey(evt) {
    if (evt.key === "Enter") {
      deleteSelectedCard();
    }
  }
  window.addEventListener("keydown", handleEnterKey);

  // Функция удаления карточки
  function deleteSelectedCard() {
    if (!selectedCard) return;

    deleteCard(selectedCard.dataset.cardId)
      .then(() => {
        closeModal(popupTypeCardDelete);
        selectedCard.remove();
        selectedCard = null; // Сбрасываем переменную после удаления
        window.removeEventListener("keydown", handleEnterKey); // Убираем обработчик Enter
      })
      .catch((err) => console.error("Ошибка при удалении карточки:", err));
  }
}

export { handleCardDelete, createCard, likeButtonHandleClick };
