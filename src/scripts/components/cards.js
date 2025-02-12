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

//собирает карточку
function createCard(imageSource, imageAlt, cardText, handleCardDelete, handleClick) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardElement.querySelector(".card__image").src = imageSource;
    cardElement.querySelector(".card__image").alt = imageAlt;
    cardElement.querySelector(".card__title").textContent = cardText;
    cardDeleteButton.addEventListener("click", handleCardDelete);
    handleClick(likeButton, "card__like-button_is-active");
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
// TODO: Сделать по макету из Практимума(как в форме профиля)

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const form = document.querySelector("#card-add-form");

    const placesList = document.querySelector(".places__list");
    const imageSrcInput = document.querySelector(".popup__input_type_url");
    const imageNameInput = document.querySelector(".popup__input_type_card-name");

    const imageSrc = imageSrcInput.value;
    const imageName = imageNameInput.value;

    placesList.prepend(createCard(imageSrc, "Alt", imageName, handleCardDelete));

    imageSrcInput.textContent = "";
    imageNameInput.textContent = "";

    form.reset();
}

export { handleCardDelete, createCard, initialCards, handleAddCardFormSubmit, likeButtonHandleClick };
