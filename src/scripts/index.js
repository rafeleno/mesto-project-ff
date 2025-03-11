import '../pages/index.css';
// import { initialCards } from "./cards.js"; --- Legacy
import { openModal, closeModal } from './components/modal.js';
import {
  handleCardDelete,
  createCard,
  likeButtonHandleClick,
} from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';

// Токен: 017e0eb7-895d-414b-bf4c-a4ee4cf48a1b
// Идентификатор группы: wff-cohort-33

// Лист картинок
const placesList = document.querySelector('.places__list');
// Кнопки открытия Popup'ов
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('#profile-edit-button');
const avatarEditElement = document.querySelector('.avatar_edit-element');
// Кнопки закрытия
const closeButtons = document.querySelectorAll('.popup__close');
// Popups, непосредственно
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');

const popups = document.querySelectorAll('.popup');
// Формы
const addCardForm = popupTypeAddCard.querySelector('#card-add-form');
const profileEditForm = popupTypeEdit.querySelector('#profile-edit-form');
const avatarEditForm = popupTypeAvatar.querySelector('#avatar-form');
// Submit'ы
const profileSubmitButton = profileEditForm.querySelector('.popup__button');
const cardAddSubmitButton = addCardForm.querySelector('.popup__button');
const avatarSubmitButton = avatarEditForm.querySelector('.popup__button');

// 1000 и 1 Input
const nameInput = popupTypeEdit.querySelector('#popup__input_type_name');
const nameInputError = profileEditForm.querySelector(`.${nameInput.id}-error`);
const aboutInput = popupTypeEdit.querySelector(
  '#popup__input_type_description'
);
const aboutInputError = profileEditForm.querySelector(
  `.${aboutInput.id}-error`
);
const imageSrcInput = document.querySelector('#popup__input_type_url');
const imageSrcInputError = addCardForm.querySelector(
  `.${imageSrcInput.id}-error`
);
const imageNameInput = document.querySelector('#popup__input_type_card-name');
const imageNameInputError = addCardForm.querySelector(
  `.${imageNameInput.id}-error`
);
const avatarInput = avatarEditForm.querySelector('#popup__input_type_avatar');
const avatarInputInputError = avatarEditForm.querySelector(
  `.${avatarInput.id}-error`
);
//Header
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.avatar');
// Попапы картинок + элементы, отдельно
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');

//TODO: Раскидать fetch'и

// Замена аватара
function changeAvatar(avatarLink) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
}

// Добавить карту
function addCard({ name, link }) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    method: 'POST',
    headers: {
      authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

// Сменить данные профиля
function changeProfile({ name, about }) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

// Проверка на лайк
function isWeLike(cardId) {
  return Promise.all([fetchProfile(), fetchCard(cardId)]).then(
    ([personData, cardData]) => {
      return cardData.likes.some((person) => {
        return person._id === personData._id;
      });
    }
  );
}

// Забираем данные пользователя
function fetchProfile() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    headers: { authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b' },
  }).then((res) => res.json());
}

// Забираем данные карточек
function fetchCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    headers: { authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b' },
  }).then((res) => res.json());
}

// Забираем данные карты по Id
function fetchCard(cardId) {
  return fetchCards().then((cards) =>
    cards.find((card) => card._id === cardId)
  ); // Фильтрация по ID, так как сервер не дает одну карту
}

// Выполняем оба запроса
Promise.all([fetchProfile(), fetchCards()])
  .then(([personData, cardsData]) => {
    const myId = personData._id;

    // Обрабатываем данные профиля
    profileTitle.textContent = personData.name;
    profileDescription.textContent = personData.about;
    profileAvatar.src = personData.avatar;

    // Обрабатываем данные карточек
    cardsData.forEach((card) => {
      //Булевый индикатор мы/не мы создатель карты
      const myCardDeleteIsValid = myId == card.owner._id;

      placesList.append(
        createCard({
          imageSource: card.link,
          cardText: card.name,
          likes: card.likes,
          cardId: card._id,
          handleCardDelete: handleCardDelete,
          removeHandleDelete: myCardDeleteIsValid,
          handleClick: likeButtonHandleClick,
          isWeLike: isWeLike,
          popupOpener: popupOpener,
          ownerId: card.owner._id,
        })
      );
    });
  })
  .catch((err) => console.error('Ошибка при загрузке данных:', err));

// --------------------------------------------------------------------------- fetch'и кончились

// Добавление открытия Popup'a при нажатии на соответсвующие кнопки
profileEditButton.addEventListener('click', popupEditOpen);
profileAddButton.addEventListener('click', popupTypeAddCardOpen);
avatarEditElement.addEventListener('click', popupTypeAvatarOpen);
// avatarEditElement.addEventListener("click", );

// логика открытия для popupTypeEdit
function popupEditOpen(evt) {
  openModal(popupTypeEdit);

  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  clearValidation({
    input: nameInput,
    error: nameInputError,
  });
  clearValidation({
    input: aboutInput,
    error: aboutInputError,
  });
}
// логика открытия для popupTypeAddCard
function popupTypeAddCardOpen(evt) {
  cardAddSubmitButton.disabled = true;
  openModal(popupTypeAddCard);

  clearValidation({
    input: imageSrcInput,
    error: imageSrcInputError,
  });
  clearValidation({
    input: imageNameInput,
    error: imageNameInputError,
  });
  addCardForm.reset();
}

// логика открытия для popupTypeAvatar
function popupTypeAvatarOpen(evt) {
  openModal(popupTypeAvatar);
  avatarSubmitButton.disabled = true;

  avatarEditForm.reset();

  clearValidation({
    input: avatarInput,
    error: avatarInputInputError,
  });
}

//закрытие popup по кажатию на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
    }
  });
});

// Функция открытия карточки
const popupOpener = (imageSource, cardText) => {
  popupImageElement.src = imageSource;
  popupImageElement.alt = cardText;
  popupCaptionElement.textContent = cardText;
  openModal(imagePopup);
};

// Закрытия нажатием на кнопки закрытия.
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', (evt) => {
    closeModal(popup);
  });
});

// Обрабытваем Submit в редакторе профиля ----------------------------------------------
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = aboutInput.value;
  profileSubmitButton.textContent = 'Сохраняем...';

  changeProfile({ name: name, about: about })
    .then((res) => res.json())
    .then((profileData) => {
      console.log(profileData);

      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить';
      closeModal(popupTypeEdit);
    });
}

// Вызываем на функцию submit'a на форму редактирования профиля ------------------------
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Обрабатывает создание новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const imageSrc = imageSrcInput.value;
  const imageName = imageNameInput.value;
  cardAddSubmitButton.textContent = 'Сохраняем...';

  addCard({ name: imageName, link: imageSrc })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((card) => {
      placesList.prepend(
        createCard({
          imageSource: imageSrc,
          cardText: imageName,
          cardId: card._id,
          handleCardDelete: handleCardDelete,
          removeHandleDelete: true,
          handleClick: likeButtonHandleClick,
          isWeLike: isWeLike,
          popupOpener: popupOpener,
          ownerId: card.owner._id,
        })
      );
      closeModal(popupTypeAddCard);
      cardAddSubmitButton.textContent = 'Сохранить';
    })
    .catch((err) => console.error('Ошибка при добавлении карточки:', err));
  // Это все для того, чтобы карту можно было сразу удалить с сервера, не обновляя сраницы
}

// Вызываем на функцию submit'a на форму добавления карточки --------------------------
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// // Обработка submit'a avatarSubmitButton

function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  console.log(avatarSubmitButton.textContent);
  avatarSubmitButton.textContent = 'Сохраняем...';
  console.log(avatarSubmitButton);

  changeAvatar(avatarInput.value)
    .then((res) => {
      // Создаём новое изображение, чтобы избежать кэша
      const newImage = new Image();
      newImage.src = res.url;

      newImage.onload = () => {
        profileAvatar.src = newImage.src;
      };

      return fetchProfile(); // Перезапрашиваем профиль
    })
    .then((profileData) => {
      profileAvatar.src = profileData.avatar;
    })
    .catch((err) => console.error('Ошибка обновления аватара:', err))
    .finally(() => {
      closeModal(popupTypeAvatar);
      avatarSubmitButton.textContent = 'Сохранить'; // Сохранить
    });
}

//Вызываем handleAvatarEditFormSubmit
avatarEditForm.addEventListener('submit', handleAvatarEditFormSubmit);

// Legacy code ////////////////////////////////
//
// (Добавление изначальных карточек на страницу)
// initialCards.forEach((item) => {
//   placesList.append(createCard(item.src, item.name, handleCardDelete, likeButtonHandleClick, popupOpener));
// });

const inputRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

// Включаем валидацию всего
enableValidation({
  regex: inputRegex,
  profileSubmitButton: profileSubmitButton,
  nameInput: nameInput,
  nameInputError: nameInputError,
  aboutInput: aboutInput,
  aboutInputError: aboutInputError,
  cardAddSubmitButton: cardAddSubmitButton,
  cardNameInput: imageNameInput,
  cardNameInputError: imageNameInputError,
  linkInput: imageSrcInput,
  linkInputError: imageSrcInputError,
  avatarInput: avatarInput,
  avatarInputInputError: avatarInputInputError,
  avatarSubmitButton: avatarSubmitButton,
});

// Класс анимации
popups.forEach(function (item) {
  item.classList.add('popup_is-animated');
});

fetchProfile();
fetchCards();
