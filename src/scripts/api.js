//TODO: Рефакторинг!!!

// Замена аватара
function changeAvatar(avatarLink) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
}

// Добавить карту
function addCard({ name, link }) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-33/cards", {
    method: "POST",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

// Сменить данные профиля
function changeProfile({ name, about }) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me", {
    method: "PATCH",
    headers: {
      authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

// Забираем данные пользователя
function fetchProfile() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me", {
    headers: { authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b" },
  }).then((res) => res.json());
}

// Забираем данные карточек
function fetchCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-33/cards", {
    headers: { authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b" },
  }).then((res) => res.json());
}

export { changeAvatar, addCard, changeProfile, fetchProfile, fetchCards };
