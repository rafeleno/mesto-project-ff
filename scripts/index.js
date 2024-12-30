// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

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
    return cardElement
}

initialCards.forEach((item) => {
    placesList.append(createCard(item.src, item.alt, item.name, handleCardDelete))
});
