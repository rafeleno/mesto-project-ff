const formIsValid = (form) => {
  const inputs = form.querySelectorAll('.popup__input');
  if (inputs.some((input) => input.validity.valid)) {
    return true;
  }
};

// const nameInputIsValid = (nameInput) => {
//   const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
//   const error = nameInput.nextElementSibling; //TODO: Переделать путь
//   // console.log(error);

//   error.textContent = nameInput.validationMessage;
//   console.log(nameInput.validationMessage);

//   // Длинна меньше 2
//   if (nameInput.value.length < 2) {
//     error.classList.add('popup__input__error-ia-active');
//     nameInput.setCustomValidity(
//       `Минимальное количество символов: 2. Длина текста сейчас: ${nameInput.value.length}`
//     );
//   }
//   // Длинна больше 40
//   else if (nameInput.value.length > 40) {
//     error.classList.add('popup__input__error-ia-active');
//     nameInput.setCustomValidity = `Максимальная количество символов: 40. Длина текста сейчас: ${nameInput.value.length}`;
//   }
//   // Не соответсвует шаблону
//   else if (nameInput.value !== regex) {
//     error.classList.add('popup__input__error-ia-active');
//     nameInput.setCustomValidity = `Максимальная количество символов: 40. Длина текста сейчас: ${nameInput.value.length}`;
//   } else {
//     error.classList.remove('popup__input__error-ia-active');
//     nameInput.setCustomValidity =
//       'Текст может содержать только латинские и кириллические буквы, знаки дефиса и пробелы';
//   }
// };

const nameInputIsValid = (nameInput) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  const error = nameInput.nextElementSibling; // TODO: Переделать путь

  // Сбрасываем предыдущую ошибку
  nameInput.setCustomValidity('');
  error.textContent = '';

  // Проверяем на отсутсвие текста
  if (nameInput.value.length === 0) {
    nameInput.setCustomValidity('Вы пропустили это поле.');
  }
  // Проверяем соответствие шаблону
  else if (!regex.test(nameInput.value)) {
    nameInput.setCustomValidity(
      'Текст может содержать только буквы, дефисы и пробелы.'
    );
  }
  // Проверяем минимальную длину
  else if (nameInput.value.length < 2) {
    nameInput.setCustomValidity(
      `Минимальное количество символов: 2. Длина текста сейчас: ${nameInput.value.length}`
    );
  }
  // Проверяем максимальную длину
  else if (nameInput.value.length > 40) {
    nameInput.setCustomValidity(
      `Максимальное количество символов: 40. Длина текста сейчас: ${nameInput.value.length}`
    );
  }

  // Показываем или скрываем ошибку
  if (nameInput.validationMessage) {
    error.classList.add('popup__input__error-ia-active');
    error.textContent = nameInput.validationMessage;
  } else {
    error.classList.remove('popup__input__error-ia-active');
  }
};

const aboutInputIsValid = (aboutInput) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  return (
    (nameInput.value.length < 2 || nameInput.value.length > 200) &&
    nameInput.value !== regex
  );
};

const placeNameInputIsValid = (placeNameInput) => {};

const linkInputIsValid = (linkInput) => {};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {};

const showInputError = (error) => {
  error.classList.add('.popup__input__error-ia-active');
};

const hideInputError = (error) => {
  error.classList.remove('.popup__input__error-ia-active');
};

export { nameInputIsValid };
