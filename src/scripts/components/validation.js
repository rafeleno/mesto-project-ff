const clearValidation = ({ input, error, submit }) => {
  input.setCustomValidity("");
  input.classList.remove("popup__input-error-is-active");
  error.textContent = "";
  submit.disabled = false;

  // TODO: Почесать реупу над конфигом
  //
  //  Добрый день. Я не понял что означает "validationConfig", ведь и при открытии и при вводе
  //  нужно очищать все поля и кнопку, а значит нет разных сценариев, действия для которых нужно было бы
  //  настраивать конфигом, либо я их не нашел. Пожалуйста оставьте комментарий касательно этого нюанса из ТЗ,
  //  чтобы я ясно понимал суть. Потому что в ТЗ не описано занчение "validationConfig". И еще: в ТЗ просят
  //  указать форму первым аргументом, но я не понимаю зачем. Можно искать элементы от формы, но они и так
  //  уже всегда найдены и их можно просто передать в аргументы, получается лишние действия.

  //  Вы можете не отвечать и не комментировать это, так как есть пункт о том, что нельзя обращаться
  //  к Ревьюеру с вопросами, но я просто пытаюсь объяснить код и указать на неясное ТЗ, по моему мнению.
  //  Я продулирую эотот вопрос наставнику. Всего доброго!
};

// TODO: Натсроить осичтку валидов (!она должн использоваться при всех олчистках валидов)

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
  avatarInput,
  avatarInputInputError,
  avatarSubmitButton,
}) => {
  // Валидация nameInput ------------------------------------------
  const nameInputIsValid = (evt) => {
    // TODO: Переделать позиционирование

    // Сбрасываем предыдущую ошибку
    // nameInput.setCustomValidity("");
    // nameInputError.textContent = "";
    clearValidation({ input: nameInput, error: nameInputError, submit: profileSubmitButton });

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
      clearValidation({ input: nameInput, error: nameInputError, submit: profileSubmitButton });
    }
  };

  // Валидация aboutInput ------------------------------
  const aboutInputIsValid = (evt) => {
    // TODO: Переделать позиционирование

    // Сбрасываем предыдущую ошибку
    // aboutInput.setCustomValidity("");
    // aboutInputError.textContent = "";
    // profileSubmitButton.disabled = false;
    clearValidation({ input: aboutInput, error: aboutInputError, submit: profileSubmitButton });

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
      clearValidation({ input: aboutInput, error: aboutInputError, submit: profileSubmitButton });
    }
  };

  // Валидация placeNameInput -------------------------------
  const placeNameInputIsValid = (evt) => {
    // TODO: Переделать позиционирование

    // Сбрасываем предыдущую ошибку
    // cardNameInput.setCustomValidity("");
    // cardNameInputError.textContent = "";
    // cardAddSubmitButton.disabled = false;
    clearValidation({ input: cardNameInput, error: cardNameInputError, submit: cardAddSubmitButton });

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
      // cardNameInput.classList.remove("popup__input-error-is-active");
      clearValidation({ input: cardNameInput, error: cardNameInputError, submit: cardAddSubmitButton });
    }
  };
  // Валидация linkInput ---------------------------------------------
  const linkInputIsValid = (evt) => {
    // Сбрасываем предыдущую ошибку
    // linkInput.setCustomValidity("");
    // linkInputError.textContent = "";
    // cardAddSubmitButton.disabled = false;
    clearValidation({ input: linkInput, error: linkInputError, submit: cardAddSubmitButton });

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
      // linkInput.classList.remove("popup__input-error-is-active");
      clearValidation({ input: linkInput, error: linkInputError, submit: cardAddSubmitButton });
    }
  };

  const avatarInputIsValid = (evt) => {
    // TODO: Закончить работу валидации
    clearValidation({ input: avatarInput, error: avatarInputInputError, submit: avatarSubmitButton });

    // Проверяем на отсутсвие текста
    if (avatarInput.value.length === 0) {
      avatarInput.setCustomValidity(avatarInput.dataset.mis);
    }
    //
    else if (avatarInput.validity.typeMismatch) {
      avatarInput.setCustomValidity(avatarInput.dataset.misMatch);
    }

    // Показываем или скрываем ошибку
    if (avatarInput.validationMessage) {
      avatarInput.classList.add("popup__input-error-is-active");
      avatarInputInputError.textContent = avatarInput.validationMessage;
      avatarSubmitButton.disabled = true;
    } else {
      clearValidation({ input: avatarInput, error: avatarInputInputError, submit: avatarSubmitButton });
    }
  };

  // Вешаем слушатели валидации nameInput
  nameInput.addEventListener("input", nameInputIsValid);

  // Вешаем слушатели валидации aboutInput
  aboutInput.addEventListener("input", aboutInputIsValid);

  // Вешаем слушатели валидации placeNameInput
  cardNameInput.addEventListener("input", placeNameInputIsValid);

  // Вешаем слушатели валидации linkInput
  linkInput.addEventListener("input", linkInputIsValid);

  //
  avatarInput.addEventListener("input", avatarInputIsValid);
};

export { enableValidation, clearValidation };
