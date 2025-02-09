import { presets } from "../../babel.config.js";
import "../pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { initialCards, handleCardDelete, createCard } from "./components/cards.js";

const placesList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const profileAddButton = document.querySelector("#profile-add-button");
const addCartDialog = document.querySelector("#add-cart-dialog");
const profileEditButton = document.querySelector("#profile-edit-button");
const popupTypeEdit = document.querySelector("#popup-type-edit");

openModal(profileAddButton, addCartDialog);
openModal(profileEditButton, popupTypeEdit);

closeButtons.forEach((button) => {
    closeModal(button, button.closest(".popup"));
});

initialCards.forEach((item) => {
    placesList.append(createCard(item.src, item.alt, item.name, handleCardDelete));
});

console.log(addCartDialog);
