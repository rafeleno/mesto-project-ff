// forms.forEach((form) => {
//     form.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//         form.closest(".popup").classList.remove("popup_is-opened");
//         form.closest(".popup__content").classList.remove("popup_is-opened");
//     });
// });

// const submitModalCloser = (form) => {
//     form.addEventListener("submit", (evt) => {
//         closeModal(form.closest(".popup__content"));
//     });
// };

// const profileEditForm = document.querySelector("#profile-edit-form");
// let profileEditFormName = "Жак-Ив Кусто";
// let profileEditFormEmployment = "Исследователь океана";

// Открытие popup (в аргументе(popup__content))
const openModal = (popup) => {
    popup.classList.add("popup_is-opened");
    popup.closest(".popup").classList.add("popup_is-opened");
};

// Закрытие popup (в аргументе(popup__content))
const closeModal = (popup) => {
    popup.classList.remove("popup_is-opened");
    popup.closest(".popup").classList.remove("popup_is-opened");
};

//закрытие popup по кажатию на overlay (в аргументе(popup__content))
const overlayClose = (modal) => {
    const popup = modal.closest(".popup");

    popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
            closeModal(modal);
            profileFormReset();
        }
    });
};

// TODO:Привести в порядок---------------------------------------------------------------------

const formElement = document.querySelector("#profile-edit-form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileTitle.textContent = name;
    profileDescription.textContent = job;
}

formElement.addEventListener("submit", handleFormSubmit);

const profileFormReset = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

// ----------------------------------------------------------------------------------------------

// const closeModalEsc = (evt) => {
//     if (evt.key === "Escape") {
//         const popup = document.querySelector(".popup_is-open");
//         popup.classList.remove(".popup_is-open");
//         popup.close();
//     }
// };

// const closePopupOverlay = (evt) => {
//     if (evt.target.classList.contains(".popup")) {
//         evt.target.classList.remove(".popup_is-open");
//         evt.target.close();
//     }
// };

// //функция открытия, если попап открыт, добавляем слушателя клавиатуры
// const openModal = (modal) => {
//     modal.classList.add("popup_opened");
//     document.addEventListener("keydown", closeModalEsc);
//     modal.addEventListener("click", closePopupOverlay);
// };

// //функция закрытия, если попап закрыт, то удаляем слушателя клавиатуры
// const closeModal = (modal) => {
//     smodal.classList.remove("popup_opened");
//     document.removeEventListener("keydown", closePopupEsc);
//     modal.removeEventListener("click", closePopupOverlay);
// };

export { openModal, closeModal, overlayClose, profileFormReset };
