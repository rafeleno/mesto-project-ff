const formIsValid = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  if (inputs.some((input) => !input.validState.valid)) {
    return false;
  }
};
