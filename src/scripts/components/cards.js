import сhurchImg from "../../images/card_1.jpg";
import endlessMeadowsImg from "../../images/card_2.jpg";
import norwayImg from "../../images/card_3.jpg";
import freedomImg from "../../images/card_4.jpg";
import liveImg from "../../images/card_5.jpg";
import enigmaImg from "../../images/card_6.jpg";

const initialCards = [
  {
    name: "Церковь",
    src: сhurchImg,
  },
  {
    name: "Безкрайние луга",
    src: endlessMeadowsImg,
  },
  {
    name: "Норвегия",
    src: norwayImg,
  },
  {
    name: "Свобода",
    src: freedomImg,
  },
  {
    name: "Жизнь",
    src: liveImg,
  },
  {
    name: "Загадка",
    src: enigmaImg,
  },
];

import { openModal } from "./modal";

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

  img.addEventListener("click", function () {
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
    console.log(100);
  });
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

export { handleCardDelete, createCard, initialCards, handleAddCardFormSubmit, likeButtonHandleClick };
