// После рефакторинга
const API_URL = "https://nomoreparties.co/v1/wff-cohort-33";
const HEADERS = {
  authorization: "017e0eb7-895d-414b-bf4c-a4ee4cf48a1b",
  "Content-Type": "application/json",
};

// Универсальная функция запроса
function request(endpoint, options = {}) {
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
      console.error("Ошибка запроса:", error);
      return Promise.reject(error);
    });
}

// Замена аватара
function changeAvatar(avatarLink) {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarLink }),
  });
}

// Добавить карту
function addCard({ name, link }) {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
}

// Сменить данные профиля
function changeProfile({ name, about }) {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
}

// Забираем данные пользователя
function fetchProfile() {
  return request("/users/me");
}

// Забираем данные карточек
function fetchCards() {
  return request("/cards");
}

// Удалить карточку с сервера
function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
}

// Добавление лайка
function likeCountPlus(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
  });
}

// Удаление лайка
function likeCountMinus(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
}

export { changeAvatar, addCard, changeProfile, fetchProfile, fetchCards, deleteCard, likeCountPlus, likeCountMinus };
