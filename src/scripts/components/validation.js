const clearValidation = ({ input, error }) => {
  input.setCustomValidity("");
  input.classList.remove("popup__input-error-is-active");

  error.textContent = "";
};

const validateInput = ({ input, errorElement, submitButton, regex = null }) => {
  clearValidation({ input: input, error: errorElement });

  if (input.value.length === 0) {
    input.setCustomValidity(input.dataset.miss);
  } else if (regex && !regex.test(input.value)) {
    input.setCustomValidity(input.dataset.missRegex);
  } else if (input.validity.tooShort) {
    input.setCustomValidity(`${input.dataset.tooShort} ${input.value.length} символ.`);
  }

  if (input.validationMessage) {
    input.classList.add("popup__input-error-is-active");
    errorElement.textContent = input.validationMessage;
    submitButton.disabled = true;
  }
};

const checkFormValidity = (inputs, submitButton) => {
  submitButton.disabled = inputs.some((input) => input.validationMessage);
};

const enableValidation = ({ form, regex, submitButton }) => {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  console.log(inputs);

  inputs.forEach((input) => {
    // console.log(input);

    const errorElement = form.querySelector(`.${input.id}-error`);

    input.addEventListener("input", () => {
      validateInput({ input: input, errorElement: errorElement, submitButton: submitButton, regex: regex });
      checkFormValidity(inputs, submitButton);
    });
  });
};

export { enableValidation, clearValidation };
