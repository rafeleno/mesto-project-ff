const clearValidation = ({ input, validationConfig, submitButton, error }) => {
  input.setCustomValidity('');
  submitButton ? (submitButton.disabled = false) : null;

  input.classList.remove(validationConfig.inputErrorClass);
  error.textContent = '';
};

const validateInput = ({
  input,
  validationConfig,
  errorElement,
  submitButton,
  regex = null,
}) => {
  clearValidation({
    input: input,
    validationConfig: validationConfig,
    submitButton: submitButton,
    error: errorElement,
  });

  if (input.validity.valueMissing) {
    input.setCustomValidity(input.dataset.miss);
  } else if (regex && !regex.test(input.value)) {
    input.setCustomValidity(input.dataset.missRegex);
  } else if (input.validity.tooShort) {
    input.setCustomValidity(
      `${input.dataset.tooShort} ${input.value.length} символ.`
    );
  }

  if (!input.validity.valid) {
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
};

const checkFormValidity = (inputs, submitButton) => {
  submitButton.disabled = inputs.some((input) => !input.validity.valid);
};

const enableValidation = ({ form, regex, submitButton, validationConfig }) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.addEventListener('input', () => {
      validateInput({
        input: input,
        validationConfig: validationConfig,
        errorElement: errorElement,
        submitButton: submitButton,
        regex: regex,
      });
      checkFormValidity(inputs, submitButton);
    });
  });
};

export { enableValidation, clearValidation };
