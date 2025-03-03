const formIsValid = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  if (inputs.some((input) => input.validity.valid)) {
    return true;
  }
};

nameInputIsValid = (nameInput) => {};

aboutInputIsValid = (aboutInput) => {};

defaultInputIsValid = (defaultInput) => {};

showInputError = (error) => {
  error.classList.add(".popup__input__error-ia-active");
};

hideInputError = (error) => {
  error.classList.remove(".popup__input__error-ia-active");
};
