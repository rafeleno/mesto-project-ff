// const clearValidation = ({ input, error, submit }) => {
//   input.setCustomValidity("");
//   input.classList.remove("popup__input-error-is-active");
//   error.textContent = "";
//   submit ? (submit.disabled = false) : null;

//   // TODO: Почесать реупу над конфигом
//   //
//   //  Добрый день. Я не понял что означает "validationConfig", ведь и при открытии и при вводе
//   //  нужно очищать все поля и кнопку, а значит нет разных сценариев, действия для которых нужно было бы
//   //  настраивать конфигом, либо я их не нашел. Пожалуйста оставьте комментарий касательно этого нюанса из ТЗ,
//   //  чтобы я ясно понимал суть. Потому что в ТЗ не описано занчение "validationConfig". И еще: в ТЗ просят
//   //  указать форму первым аргументом, но я не понимаю зачем. Можно искать элементы от формы, но они и так
//   //  уже всегда найдены и их можно просто передать в аргументы, получается лишние действия.

//   //  Вы можете не отвечать и не комментировать это, так как есть пункт о том, что нельзя обращаться
//   //  к Ревьюеру с вопросами, но я просто пытаюсь объяснить код и указать на неясное ТЗ, по моему мнению.
//   //  Я продулирую эотот вопрос наставнику. Всего доброго!
// };

// // TODO: Натсроить осичтку валидов (!она должн использоваться при всех олчистках валидов)

// const enableValidation = ({
//   regex,
//   profileSubmitButton,
//   nameInput,
//   nameInputError,
//   aboutInput,
//   aboutInputError,
//   cardAddSubmitButton,
//   cardNameInput,
//   cardNameInputError,
//   linkInput,
//   linkInputError,
//   avatarInput,
//   avatarInputInputError,
//   avatarSubmitButton,
// }) => {
//   // Валидация nameInput ------------------------------------------
//   const nameInputIsValid = (evt) => {
//     clearValidation({
//       input: nameInput,
//       error: nameInputError,
//     });

//     // Проверяем на отсутсвие текста
//     if (nameInput.value.length === 0) {
//       nameInput.setCustomValidity(nameInput.dataset.miss);
//     }
//     // Проверяем соответствие шаблону
//     else if (!regex.test(nameInput.value)) {
//       nameInput.setCustomValidity(nameInput.dataset.missRegex);
//     }
//     // Проверяем минимальную длину
//     else if (nameInput.validity.tooShort) {
//       nameInput.setCustomValidity(`${nameInput.dataset.tooShort} ${nameInput.value.length} символ.`);
//       // nameInput.setCustomValidity(`Минимальное количество символов: 2. Длина текста сейчас: ${nameInput.value.length}`);
//     }

//     // Показываем или скрываем ошибку
//     if (nameInput.validationMessage) {
//       nameInput.classList.add("popup__input-error-is-active");
//       nameInputError.textContent = nameInput.validationMessage;
//       profileSubmitButton.disabled = true;
//     } else if (!nameInput.validationMessage && !aboutInput.validationMessage) {
//       profileSubmitButton.disabled = false;
//     } else {
//       clearValidation({
//         input: nameInput,
//         error: nameInputError,
//       });
//     }
//   };

//   // Валидация aboutInput ------------------------------
//   const aboutInputIsValid = (evt) => {
//     clearValidation({
//       input: aboutInput,
//       error: aboutInputError,
//     });

//     // Проверяем на отсутсвие текста
//     if (aboutInput.value.length === 0) {
//       aboutInput.setCustomValidity(aboutInput.dataset.miss);
//     }
//     // Проверяем соответствие шаблону
//     else if (!regex.test(aboutInput.value)) {
//       aboutInput.setCustomValidity(aboutInput.dataset.missRegex);
//     }
//     // Проверяем максимальную длину
//     else if (aboutInput.validity.tooShort) {
//       nameInput.setCustomValidity(`${aboutInput.dataset.tooShort} ${aboutInput.value.length} символ.`);
//     }

//     // Показываем или скрываем ошибку
//     if (aboutInput.validationMessage) {
//       aboutInput.classList.add("popup__input-error-is-active");
//       aboutInputError.textContent = aboutInput.validationMessage;
//       profileSubmitButton.disabled = true;
//     } else if (!nameInput.validationMessage && !aboutInput.validationMessage) {
//       profileSubmitButton.disabled = false;
//     } else {
//       clearValidation({
//         input: aboutInput,
//         error: aboutInputError,
//       });
//     }
//   };

//   // Валидация placeNameInput -------------------------------
//   const placeNameInputIsValid = (evt) => {
//     clearValidation({
//       input: cardNameInput,
//       error: cardNameInputError,
//     });

//     // Проверяем на отсутсвие текста
//     if (cardNameInput.value.length === 0) {
//       cardNameInput.setCustomValidity(cardNameInput.dataset.miss);
//     }
//     // Проверяем минимальную длину
//     else if (cardNameInput.validity.tooShort) {
//       cardNameInput.setCustomValidity(`${cardNameInput.dataset.tooShort} ${cardNameInput.value.length}`);
//     }
//     // Показываем или скрываем ошибку

//     // if (nameInput.validationMessage) {
//     //   nameInput.classList.add("popup__input-error-is-active");
//     //   nameInputError.textContent = nameInput.validationMessage;
//     //   profileSubmitButton.disabled = true;
//     // } else if (!nameInput.validationMessage && !aboutInput.validationMessage) {
//     //   profileSubmitButton.disabled = false;
//     // } else {
//     //   clearValidation({
//     //     input: nameInput,
//     //     error: nameInputError,
//     //   });
//     // }

//     // TODO: Не работает такая валидация !!!!
//     if (cardNameInput.validationMessage) {
//       cardNameInput.classList.add("popup__input-error-is-active");
//       cardNameInputError.textContent = cardNameInput.validationMessage;
//       cardAddSubmitButton.disabled = true;
//     } else if (!cardNameInput.validationMessage && !linkInput.validationMessage) {
//       cardAddSubmitButton.disabled = false;
//     } else {
//       clearValidation({
//         input: cardNameInput,
//         error: cardNameInputError,
//       });
//     }
//   };
//   // Валидация linkInput ---------------------------------------------
//   const linkInputIsValid = (evt) => {
//     clearValidation({
//       input: linkInput,
//       error: linkInputError,
//     });

//     // Валидация URL
//     if (linkInput.validity.typeMismatch) {
//       linkInput.setCustomValidity(linkInput.dataset.misMatch);
//     }
//     // if (linkInput.value.length === 0) {
//     //   linkInput.setCustomValidity(linkInput.dataset.mis);
//     // }

//     // Показываем или скрываем ошибку
//     if (linkInput.validationMessage) {
//       linkInput.classList.add("popup__input-error-is-active");
//       linkInputError.textContent = linkInput.validationMessage;
//       cardAddSubmitButton.disabled = true;
//     } else if (!cardNameInput.validationMessage && !linkInput.validationMessage) {
//       cardAddSubmitButton.disabled = false;
//     } else {
//       clearValidation({
//         input: linkInput,
//         error: linkInputError,
//       });
//     }
//   };

//   const avatarInputIsValid = (evt) => {
//     // TODO: Закончить работу валидации
//     clearValidation({
//       input: avatarInput,
//       error: avatarInputInputError,
//     });
//     avatarSubmitButton.disabled = true;

//     // Проверяем на отсутсвие текста
//     if (avatarInput.value.length === 0) {
//       avatarInput.setCustomValidity(avatarInput.dataset.mis);
//     }
//     //
//     else if (avatarInput.validity.typeMismatch) {
//       avatarInput.setCustomValidity(avatarInput.dataset.misMatch);
//     }

//     // Показываем или скрываем ошибку
//     if (avatarInput.validationMessage) {
//       avatarInput.classList.add("popup__input-error-is-active");
//       avatarInputInputError.textContent = avatarInput.validationMessage;
//       avatarSubmitButton.disabled = true;
//     } else {
//       clearValidation({
//         input: avatarInput,
//         error: avatarInputInputError,
//       });
//     }
//   };

//   // Валиадция submit'ов -----------------
//   // profileEditForm
//   // if (!nameInput.validationMessage && !aboutInput.validationMessage) {
//   //   profileSubmitButton.disabled = false;
//   // }

//   // TODO: Почему то не работает!!!
//   // addCardForm
//   // if (!cardNameInput.validationMessage && !linkInput.validationMessage) {
//   //   cardAddSubmitButton.disabled = false;
//   // }

//   // // avatarEditForm
//   // if (!avatarInput.validationMessage) {
//   //   cardAddSubmitButton.disabled = false;
//   // }

//   // Вешаем слушатели валидации nameInput
//   nameInput.addEventListener("input", nameInputIsValid);

//   // Вешаем слушатели валидации aboutInput
//   aboutInput.addEventListener("input", aboutInputIsValid);

//   // Вешаем слушатели валидации placeNameInput
//   cardNameInput.addEventListener("input", placeNameInputIsValid);

//   // Вешаем слушатели валидации linkInput
//   linkInput.addEventListener("input", linkInputIsValid);

//   //
//   avatarInput.addEventListener("input", avatarInputIsValid);
// };

// export { enableValidation, clearValidation };

// После рефакторинга
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
