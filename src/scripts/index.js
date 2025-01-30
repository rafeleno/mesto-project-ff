import "../pages/index.css";
// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

// const addIcon = new URL("./images/add-icon.svg", import.meta.url);
// const avavtar = new URL("./images/avavtar.jpg", import.meta.url);
// const card_1 = new URL("./images/card_1", import.meta.url);
// const card_2 = new URL("./images/card_2", import.meta.url);
// const card_3 = new URL("./images/card_3", import.meta.url);
// const card_4 = new URL("./images/card_4", import.meta.url);
// const card_5 = new URL("./images/card_5", import.meta.url);
// const card_6 = new URL("./images/card_6", import.meta.url);
// const addIcon = new URL("./images/add-icon.svg", import.meta.url);
// const addIcon = new URL("./images/add-icon.svg", import.meta.url);
// const addIcon = new URL("./images/add-icon.svg", import.meta.url);

function handleCardDelete(evt) {
    const card = evt.target.closest(".card");
    card.remove();
}

function createCard(imageSource, imageAlt, cardText, handleCardDelete) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardElement.querySelector(".card__image").src = imageSource;
    cardElement.querySelector(".card__image").alt = imageAlt;
    cardElement.querySelector(".card__title").textContent = cardText;
    cardDeleteButton.addEventListener("click", handleCardDelete);
    return cardElement;
}

initialCards.forEach((item) => {
    placesList.append(createCard(item.src, item.alt, item.name, handleCardDelete));
});
