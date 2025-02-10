import "../pages/index.css";
import { presets } from "../../babel.config.js";
import { openModal, closeModal } from "./components/modal.js";
import { initialCards, handleCardDelete, createCard } from "./components/cards.js";

const placesList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const forms = document.querySelectorAll(".popup__form");
const profileAddButton = document.querySelector("#profile-add-button");
const addCardPopup = document.querySelector("#profile-add-popup");
const profileEditButton = document.querySelector("#profile-edit-button");
const popupTypeEdit = document.querySelector("#popup-type-edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

profileEditButton.addEventListener("click", (evt) => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", (evt) => openModal(addCardPopup));

closeButtons.forEach((button) => {
    button.addEventListener("click", (evt) => closeModal(button.closest(".popup__content")));
});

// TODO:Вынести это в модуль---------------------------------------------------------------------

const formElement = document.querySelector("#profile-edit-form");

const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileTitle.textContent = name;
    profileDescription.textContent = job;
    nameInput.ariaPlaceholder = name;
    jobInput.ariaPlaceholder = job;
}

formElement.addEventListener("submit", handleFormSubmit);

// ----------------------------------------------------------------------------------------------

initialCards.forEach((item) => {
    placesList.append(createCard(item.src, item.alt, item.name, handleCardDelete));
});
