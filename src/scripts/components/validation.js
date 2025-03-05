const formIsValid = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  if (inputs.some((input) => input.validity.valid)) {
    return true;
  }
};

// Валидация nameInput и aboutInput ---------------------------------------------------------------
const inputRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const profileEditForm = document.querySelector("#profile-edit-form");
const profileSubmitButton = profileEditForm.querySelector(".popup__button");

// Валидация nameInput ------------------------------------------
const nameInput = profileEditForm.querySelector("#popup__input_type_name");
const nameInputError = profileEditForm.querySelector(`.${nameInput.id}-error`);

const nameInputIsValid = (evt) => {
  // TODO: Переделать позиционирование

  // Сбрасываем предыдущую ошибку
  nameInput.setCustomValidity("");
  nameInputError.textContent = "";
  profileSubmitButton.disabled = false;

  // Проверяем на отсутсвие текста
  if (nameInput.value.length === 0) {
    nameInput.setCustomValidity(nameInput.dataset.miss);
  }
  // Проверяем соответствие шаблону
  else if (!inputRegex.test(nameInput.value)) {
    nameInput.setCustomValidity(nameInput.dataset.missRegex);
  }
  // Проверяем минимальную длину
  else if (nameInput.validity.tooShort) {
    nameInput.setCustomValidity(`${nameInput.dataset.tooShort} ${nameInput.value.length} символ.`);
    // nameInput.setCustomValidity(`Минимальное количество символов: 2. Длина текста сейчас: ${nameInput.value.length}`);
  }

  // Показываем или скрываем ошибку
  if (nameInput.validationMessage) {
    nameInput.classList.add("popup__input-error-is-active");
    nameInputError.textContent = nameInput.validationMessage;
    profileSubmitButton.disabled = true;
  } else {
    nameInput.classList.remove("popup__input-error-is-active");
  }
};

// Валидация aboutInput ------------------------------

const aboutInput = profileEditForm.querySelector("#popup__input_type_description");
const aboutInputError = profileEditForm.querySelector(`.${aboutInput.id}-error`);

const aboutInputIsValid = (evt) => {
  // TODO: Переделать позиционирование

  // Сбрасываем предыдущую ошибку
  aboutInput.setCustomValidity("");
  aboutInputError.textContent = "";
  profileSubmitButton.disabled = false;

  // Проверяем на отсутсвие текста
  if (aboutInput.value.length === 0) {
    aboutInput.setCustomValidity(aboutInput.dataset.miss);
  }
  // Проверяем соответствие шаблону
  else if (!inputRegex.test(aboutInput.value)) {
    aboutInput.setCustomValidity(aboutInput.dataset.missRegex);
  }
  // Проверяем максимальную длину
  else if (aboutInput.validity.tooShort) {
    nameInput.setCustomValidity(`${aboutInput.dataset.tooShort} ${aboutInput.value.length} символ.`);
  }

  // Показываем или скрываем ошибку
  if (aboutInput.validationMessage) {
    aboutInput.classList.add("popup__input-error-is-active");
    aboutInputError.textContent = aboutInput.validationMessage;
    profileSubmitButton.disabled = true;
  } else {
    aboutInput.classList.remove("popup__input-error-is-active");
  }
};

// Валидация placeNameInput и linkInput ------------------------------------------------------

const cardAddForm = document.querySelector("#card-add-form");
const editSubmitButton = cardAddForm.querySelector(".popup__button");

// Валидация placeNameInput -------------------------------
const cardNameInput = cardAddForm.querySelector("#popup__input_type_card-name");
const cardNameInputError = cardAddForm.querySelector(`.${cardNameInput.id}-error`);

const placeNameInputIsValid = (evt) => {
  // TODO: Переделать позиционирование

  // Сбрасываем предыдущую ошибку
  cardNameInput.setCustomValidity("");
  cardNameInputError.textContent = "";
  editSubmitButton.disabled = false;

  // Проверяем на отсутсвие текста
  if (cardNameInput.value.length === 0) {
    cardNameInput.setCustomValidity(cardNameInput.dataset.miss);
  }
  // Проверяем минимальную длину
  else if (cardNameInput.validity.tooShort) {
    cardNameInput.setCustomValidity(`${cardNameInput.dataset.tooShort} ${cardNameInput.value.length}`);
  }
  // Показываем или скрываем ошибку
  if (cardNameInput.validationMessage) {
    cardNameInput.classList.add("popup__input-error-is-active");
    cardNameInputError.textContent = cardNameInput.validationMessage;
    editSubmitButton.disabled = true;
  } else {
    cardNameInput.classList.remove("popup__input-error-is-active");
  }
};

// Валидация linkInput ---------------------------------------------
const linkInput = cardAddForm.querySelector("#popup__input_type_url");
const linkInputError = cardAddForm.querySelector(`.${linkInput.id}-error`);

const linkInputIsValid = (evt) => {
  // Сбрасываем предыдущую ошибку
  linkInput.setCustomValidity("");
  linkInputError.textContent = "";
  editSubmitButton.disabled = false;

  // Валидация URL
  if (linkInput.validity.typeMismatch) {
    linkInput.setCustomValidity(linkInput.dataset.misMatch);
    // TODO: Нихуйя не работает (data)
  }

  // Показываем или скрываем ошибку
  if (linkInput.validationMessage) {
    linkInput.classList.add("popup__input-error-is-active");
    linkInputError.textContent = linkInput.validationMessage;
    editSubmitButton.disabled = true;
  } else {
    linkInput.classList.remove("popup__input-error-is-active");
  }
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {};

const showInputError = (error) => {
  error.classList.add(".popup__input__error-ia-active");
};

const hideInputError = (error) => {
  error.classList.remove(".popup__input__error-ia-active");
};

export { nameInputIsValid, aboutInputIsValid, placeNameInputIsValid, linkInputIsValid };
