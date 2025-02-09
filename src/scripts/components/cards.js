import сhurchImg from "../../images/card_1.jpg";
import endlessMeadowsImg from "../../images/card_2.jpg";
import norwayImg from "../../images/card_3.jpg";
import freedomImg from "../../images/card_4.jpg";
import liveImg from "../../images/card_5.jpg";
import enigmaImg from "../../images/card_6.jpg";

const initialCards = [
    {
        name: "Церковь",
        alt: "Церковь",
        src: сhurchImg,
    },
    {
        name: "Безкрайние луга",
        alt: "Бескрайние луга, где-то в сухом регионе нашей планеты",
        src: endlessMeadowsImg,
    },
    {
        name: "Норвегия",
        alt: "Лес и монументально накрывающие собой горы с снежными опушками в дали",
        src: norwayImg,
    },
    {
        name: "Свобода",
        alt: "Статуя свободы",
        src: freedomImg,
    },
    {
        name: "Жизнь",
        alt: "сноубордист, в полете на фоне горы и леса",
        src: liveImg,
    },
    {
        name: "Загадка",
        alt: "Загадочная дверь",
        src: enigmaImg,
    },
];

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

function handleCardDelete(evt) {
    const card = evt.target.closest(".card");
    card.remove();
}

export { handleCardDelete, createCard, initialCards };
