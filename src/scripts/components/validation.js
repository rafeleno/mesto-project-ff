const clearValidation = ({ input, validationConfig, error }) => {
  input.setCustomValidity("");
  console.log(validationConfig.inputErrorClass + 100);

  input.classList.remove(validationConfig.inputErrorClass);
  error.textContent = "";
};

const validateInput = ({ input, validationConfig, errorElement, submitButton, regex = null }) => {
  console.log(input);

  clearValidation({ input: input, validationConfig: validationConfig, error: errorElement });

  if (input.value.length === 0) {
    input.setCustomValidity(input.dataset.miss);
  } else if (regex && !regex.test(input.value)) {
    input.setCustomValidity(input.dataset.missRegex);
  } else if (input.validity.tooShort) {
    input.setCustomValidity(`${input.dataset.tooShort} ${input.value.length} символ.`);
  }

  if (input.validationMessage) {
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
};

const checkFormValidity = (inputs, submitButton) => {
  submitButton.disabled = inputs.some((input) => input.validationMessage);
};

const enableValidation = ({ form, regex, submitButton, validationConfig }) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.addEventListener("input", () => {
      validateInput({ input: input, validationConfig: validationConfig, errorElement: errorElement, submitButton: submitButton, regex: regex });
      checkFormValidity(inputs, validationConfig, submitButton);
    });
  });
};

export { enableValidation, clearValidation };
