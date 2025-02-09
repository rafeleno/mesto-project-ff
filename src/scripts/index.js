import '../pages/index.css';
import initialCards from '../scripts/cards.js';
const placesList = document.querySelector('.places__list');

const addIcon = new URL('./images/add-icon.svg', import.meta.url);
const avatar = new URL('./images/avatar.jpg', import.meta.url);
const card_1 = new URL('./images/card_1', import.meta.url);
const card_2 = new URL('./images/card_2', import.meta.url);
const card_3 = new URL('./images/card_3', import.meta.url);
const card_4 = new URL('./images/card_4', import.meta.url);
const card_5 = new URL('./images/card_5', import.meta.url);
const card_6 = new URL('./images/card_6', import.meta.url);
const close = new URL('./images/close.svg', import.meta.url);
const deleteIcon = new URL('./images/delete-icon.svg', import.meta.url);
const editIcon = new URL('./images/edit-icon.svg', import.meta.url);
const likeActivate = new URL('./images/like-activate.svg', import.meta.url);
const likeInActivate = new URL('./images/like-inactivate.svg', import.meta.url);
const logo = new URL('./images/logo.svg', import.meta.url);

const images = [
  // меняем исходные пути на переменные
  { name: 'addIcon', link: addIcon },
  { name: 'avatar', link: avatar },
  { name: 'card_1', alt: 'Церковь', link: card_1 },
  {
    name: 'card_2',
    alt: 'Бескрайние луга, где-то в сухом регионе нашей планеты',
    link: card_2,
  },
  { name: 'card_3', link: card_3 },
  { name: 'card_4', link: card_4 },
  { name: 'card_5', link: card_5 },
  { name: 'card_6', link: card_6 },
  { name: 'close', link: close },
  { name: 'deleteIcon', link: deleteIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeActivate', link: likeActivate },
  { name: 'likeInActivate', link: likeInActivate },
  { name: 'logo', link: logo },
];

function handleCardDelete(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function createCard(imageSource, imageAlt, cardText, handleCardDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = imageSource;
  cardElement.querySelector('.card__image').alt = imageAlt;
  cardElement.querySelector('.card__title').textContent = cardText;
  cardDeleteButton.addEventListener('click', handleCardDelete);
  return cardElement;
}

images.forEach((item) => {
  placesList.append(
    createCard(item.src, item.alt, item.name, handleCardDelete)
  );
});
