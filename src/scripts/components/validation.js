const formIsValid = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  if (inputs.some((input) => input.validity.valid)) {
    return true;
  }
};

// TODO: Натсроить осичтку валидов

const enableValidation = ({
  regex,
  profileSubmitButton,
  nameInput,
  nameInputError,
  aboutInput,
  aboutInputError,
  cardAddSubmitButton,
  cardNameInput,
  cardNameInputError,
  linkInput,
  linkInputError,
}) => {
  // Валидация nameInput ------------------------------------------
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
    else if (!regex.test(nameInput.value)) {
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
    else if (!regex.test(aboutInput.value)) {
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

  // Валидация placeNameInput -------------------------------
  const placeNameInputIsValid = (evt) => {
    // TODO: Переделать позиционирование

    // Сбрасываем предыдущую ошибку
    cardNameInput.setCustomValidity("");
    cardNameInputError.textContent = "";
    cardAddSubmitButton.disabled = false;

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
      cardAddSubmitButton.disabled = true;
    } else {
      cardNameInput.classList.remove("popup__input-error-is-active");
    }
  };

  // Валидация linkInput ---------------------------------------------
  const linkInputIsValid = (evt) => {
    // Сбрасываем предыдущую ошибку
    linkInput.setCustomValidity("");
    linkInputError.textContent = "";
    cardAddSubmitButton.disabled = false;

    // Валидация URL
    if (linkInput.validity.typeMismatch) {
      linkInput.setCustomValidity(linkInput.dataset.misMatch);
    }

    // Показываем или скрываем ошибку
    if (linkInput.validationMessage) {
      linkInput.classList.add("popup__input-error-is-active");
      linkInputError.textContent = linkInput.validationMessage;
      cardAddSubmitButton.disabled = true;
    } else {
      linkInput.classList.remove("popup__input-error-is-active");
    }
  };

  // Валидация nameInput
  nameInput.addEventListener("input", nameInputIsValid);

  // Валидация aboutInput
  aboutInput.addEventListener("input", aboutInputIsValid);

  // Валидация placeNameInput
  cardNameInput.addEventListener("input", placeNameInputIsValid);

  // Валидация linkInput
  linkInput.addEventListener("input", linkInputIsValid);
};

const showInputError = (error) => {
  error.classList.add(".popup__input__error-ia-active");
};

const hideInputError = (error) => {
  error.classList.remove(".popup__input__error-ia-active");
};

export { enableValidation };
