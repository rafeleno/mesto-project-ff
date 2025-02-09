const forms = document.querySelectorAll(".popup__form");
forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        form.closest(".popup").close();
    });
});

// const profileEditForm = document.querySelector("#profile-edit-form");
// let profileEditFormName = "Жак-Ив Кусто";
// let profileEditFormEmployment = "Исследователь океана";

const openModal = (openButton, modal) => {
    openButton.addEventListener("click", (evt) => {
        modal.showModal();
    });
};

const closeModal = (closeButton, modal) => {
    closeButton.addEventListener("click", (evt) => {
        modal.close();
    });
};

export { openModal, closeModal };
