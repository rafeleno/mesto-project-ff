// //TODO: Рефакторинг!!!

// // Замена аватара
// function changeAvatar(avatarLink) {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me/avatar", {
//     method: "PATCH",
//     headers: {
//       authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       avatar: avatarLink,
//     }),
//   });
// }

// // Добавить карту
// function addCard({ name, link }) {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-33/cards", {
//     method: "POST",
//     headers: {
//       authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: name,
//       link: link,
//     }),
//   });
// }

// // Сменить данные профиля
// function changeProfile({ name, about }) {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me", {
//     method: "PATCH",
//     headers: {
//       authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: name,
//       about: about,
//     }),
//   });
// }

// // Забираем данные пользователя
// function fetchProfile() {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-33/users/me", {
//     headers: { authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b" },
//   }).then((res) => res.json());
// }

// // Забираем данные карточек
// function fetchCards() {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-33/cards", {
//     headers: { authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b" },
//   }).then((res) => res.json());
// }

// export { changeAvatar, addCard, changeProfile, fetchProfile, fetchCards };

// После рефакторинга
const API_URL = 'https://nomoreparties.co/v1/wff-cohort-33';
const HEADERS = {
  authorization: '017e0eb7-895d-414b-bf4c-a4ee4cf48a1b',
  'Content-Type': 'application/json',
};

// Универсальная функция запроса
function request(endpoint, options = {}) {
  console.log(endpoint);

  return fetch(`${API_URL}${endpoint}`, {
    headers: HEADERS,
    ...options,
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .catch((error) => {
      console.error('Ошибка запроса:', error);
      return Promise.reject(error);
    });
}

// Замена аватара
function changeAvatar(avatarLink) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatar: avatarLink }),
  });
}

// Добавить карту
function addCard({ name, link }) {
  return request('/cards', {
    method: 'POST',
    body: JSON.stringify({ name, link }),
  });
}

// Сменить данные профиля
function changeProfile({ name, about }) {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ name, about }),
  });
}

// Забираем данные пользователя
function fetchProfile() {
  return request('/users/me');
}

// Забираем данные карточек
function fetchCards() {
  return request('/cards');
}

export { changeAvatar, addCard, changeProfile, fetchProfile, fetchCards };
