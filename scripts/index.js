// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

function handleCardDelete(evt) {
    const card = evt.target.closest(".card");
    card.remove();
}

function addCard(imageSource, imageAlt = "", CardText, handleCardDelete) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");

    cardElement.querySelector(".card__image").src = imageSource;
    cardElement.querySelector(".card__image").alt = imageAlt;
    cardElement.querySelector(".card__title").textContent = CardText;
    cardDeleteButton.addEventListener("click", handleCardDelete);

    placesList.append(cardElement);
}

initialCards.forEach((item) => {
    addCard(item.src, item.alt, item.name, handleCardDelete);
});
