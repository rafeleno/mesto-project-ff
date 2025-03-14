const clearValidation = ({ input, validationConfig, submitButton, error }) => {
  input.setCustomValidity("");
  submitButton ? (submitButton.disabled = false) : null;

  input.classList.remove(validationConfig.inputErrorClass);
  error.textContent = "";
};

const validateInput = ({ input, validationConfig, errorElement, submitButton }) => {
  clearValidation({
    input: input,
    validationConfig: validationConfig,
    submitButton: submitButton,
    error: errorElement,
  });

  if (input.validity.valueMissing) {
    errorElement.textContent = input.dataset.miss;
  } else if (input.validity.patternMismatch) {
    errorElement.textContent = input.dataset.misRegex;
  } else if (input.validity.tooShort) {
    errorElement.textContent = `${input.dataset.tooShort} ${input.value.length} символ.`;
  }

  if (!input.validity.valid) {
    input.classList.add(validationConfig.inputErrorClass);
  }
};

const checkFormValidity = (inputs, submitButton) => {
  submitButton.disabled = inputs.some((input) => !input.validity.valid);
};

const enableValidation = ({ form, submitButton, validationConfig }) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.addEventListener("input", () => {
      validateInput({
        input: input,
        validationConfig: validationConfig,
        errorElement: errorElement,
        submitButton: submitButton,
      });
      checkFormValidity(inputs, submitButton);
    });
  });
};

export { enableValidation, clearValidation };
