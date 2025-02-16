// Открытие popup (в аргументе(popup__content))
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  console.log("pop");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// TODO:Привести в порядок, проверить на уязвимость формы -------------------------------------

// Обрабытваем Submit в редакторе профиля -----------------------------------

const profileEditFormElement = document.querySelector("#profile-edit-form");
const nameInput = profileEditFormElement.querySelector(".popup__input_type_name");
const jobInput = profileEditFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

// Вызываем на функцию submit'a на форму редактирования профиля
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);

// Сброс полей формы редактирования профиля
const resetProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

export { openModal, closeModal, resetProfileForm };
