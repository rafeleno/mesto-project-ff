const formIsValid = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  if (inputs.some((input) => input.validity.valid)) {
    return true;
  }
};

nameInputIsValid = (nameInput) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  const error = nameInput.nextElementSibling; //TODO: Переделать путь

  if (nameInput.value.length < 2) {
    error.classList.add("popup__input__error-ia-active");
    nameInput.validationMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${nameInput.value.length}`;
  } else {
    error.classList.remove("popup__input__error-ia-active");
    nameInput.validationMessage = "";
  }
  if (nameInput.value.length > 40) {
    error.classList.add("popup__input__error-ia-active");
    nameInput.validationMessage = `Максимальная количество символов: 40. Длина текста сейчас: ${nameInput.value.length}`;
  } else {
    error.classList.remove("popup__input__error-ia-active");
    nameInput.validationMessage = "";
  }
  if (nameInput.value !== regex) {
    error.classList.add("popup__input__error-ia-active");
    nameInput.validationMessage = `Максимальная количество символов: 40. Длина текста сейчас: ${nameInput.value.length}`;
  } else {
    error.classList.remove("popup__input__error-ia-active");
    nameInput.validationMessage = "Текст может содержать только латинские и кириллические буквы, знаки дефиса и пробелы";
  }

  // if (nameInput) || nameInput.value !== regex
};

aboutInputIsValid = (aboutInput) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  return (nameInput.value.length < 2 || nameInput.value.length > 200) && nameInput.value !== regex;
};

placeNameInputIsValid = (placeNameInput) => {};

linkInputIsValid = (linkInput) => {};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {};

showInputError = (error) => {
  error.classList.add(".popup__input__error-ia-active");
};

hideInputError = (error) => {
  error.classList.remove(".popup__input__error-ia-active");
};
