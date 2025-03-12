(()=>{"use strict";var e=function(e){"Escape"!==e.key&&"Esc"!==e.key||r(document.querySelector(".popup_is-opened"))};function t(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",e)}function r(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e)}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e,t,r){return(t=function(e){var t=function(e){if("object"!=n(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==n(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i={authorization:"017e0eb7-895d-414b-bf4c-a4ee4cf48a1b","Content-Type":"application/json"};function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch("".concat("https://nomoreparties.co/v1/wff-cohort-33").concat(e),function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({headers:i},t)).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error("Ошибка запроса:",e),Promise.reject(e)}))}function a(){return u("/users/me")}function l(){return u("/cards")}function d(e){var t=e.imageSource,r=e.cardText,n=e.likes,o=e.cardId,c=e.handleCardDelete,i=e.removeHandleDelete,u=e.handleClick,a=e.isWeLike,l=e.popupOpener,d=e.ownerId,s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=s.querySelector(".card__delete-button"),f=s.querySelector(".card__like-button"),m=s.querySelector(".card__image"),y=s.querySelector(".card__like-button-volume");return m.src=t,m.alt=r,y.textContent=Array.isArray(n)?n.length:"0",o&&(s.dataset.cardId=o),d&&(s.dataset.ownerId=d),s.querySelector(".card__title").textContent=r,i?p.addEventListener("click",c):p.remove(),a(o).then((function(e){e?f.classList.add("card__like-button_is-active"):f.classList.remove("card__like-button_is-active")})),f.addEventListener("click",u),m.addEventListener("click",(function(e){return l(t,r)})),s}var s=function(e){var t=e.target.closest(".card");e.target.classList.toggle("card__like-button_is-active"),e.target.classList.contains("card__like-button_is-active")?function(e){var t=e.dataset.cardId;fetch("https://nomoreparties.co/v1/wff-cohort-33/cards/likes/".concat(t),{method:"PUT",headers:{authorization:"017e0eb7-895d-414b-bf4c-a4ee4cf48a1b","Content-Type":"application/json"}}).then((function(t){return t.json().then((function(t){e.querySelector(".card__like-button-volume").textContent=t.likes.length}))}))}(t):function(e){var t=e.dataset.cardId;fetch("https://nomoreparties.co/v1/wff-cohort-33/cards/likes/".concat(t),{method:"DELETE",headers:{authorization:"017e0eb7-895d-414b-bf4c-a4ee4cf48a1b","Content-Type":"application/json"}}).then((function(t){return t.json().then((function(t){e.querySelector(".card__like-button-volume").textContent=t.likes.length}))}))}(t)},p=document.querySelector(".popup_type_cardDelete"),f=document.querySelector("#card-delete-form"),m=null;function y(e){t(p),m=e.target.closest(".card");var n=f.cloneNode(!0);function o(e){"Enter"===e.key&&c()}function c(){var e;m&&(e=m.dataset.cardId,u("/cards/".concat(e),{method:"DELETE"})).then((function(){r(p),m.remove(),m=null,window.removeEventListener("keydown",o)})).catch((function(e){return console.error("Ошибка при удалении карточки:",e)}))}f.replaceWith(n),n.addEventListener("submit",(function(e){e.preventDefault(),c()})),window.addEventListener("keydown",o)}var v=function(e){var t=e.input,r=e.error;t.setCustomValidity(""),t.classList.remove("popup__input-error-is-active"),r.textContent=""},_=function(e){var t=e.form,r=e.regex,n=e.submitButton,o=Array.from(t.querySelectorAll(".popup__input"));o.forEach((function(e){var c=t.querySelector(".".concat(e.id,"-error"));e.addEventListener("input",(function(){!function(e){var t=e.input,r=e.errorElement,n=e.submitButton,o=e.regex,c=void 0===o?null:o;v({input:t,error:r}),0===t.value.length?t.setCustomValidity(t.dataset.miss):c&&!c.test(t.value)?t.setCustomValidity(t.dataset.missRegex):t.validity.tooShort&&t.setCustomValidity("".concat(t.dataset.tooShort," ").concat(t.value.length," символ.")),t.validationMessage&&(t.classList.add("popup__input-error-is-active"),r.textContent=t.validationMessage,n.disabled=!0)}({input:e,errorElement:c,submitButton:n,regex:r}),function(e,t){t.disabled=e.some((function(e){return e.validationMessage}))}(o,n)}))}))};function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,i,u=[],a=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;a=!1}else for(;!(a=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var S=document.querySelector(".places__list"),g=document.querySelector(".profile__add-button"),q=document.querySelector("#profile-edit-button"),k=document.querySelector(".avatar_edit-element"),E=document.querySelectorAll(".popup__close"),C=document.querySelector(".popup_type_new-card"),w=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_avatar"),x=document.querySelectorAll(".popup"),O=C.querySelector("#card-add-form"),j=w.querySelector("#profile-edit-form"),P=L.querySelector("#avatar-form"),D=O.querySelector(".popup__button"),A=j.querySelector(".popup__button"),I=P.querySelector(".popup__button"),T=w.querySelector("#popup__input_type_name"),B=j.querySelector(".".concat(T.id,"-error")),H=w.querySelector("#popup__input_type_description"),N=j.querySelector(".".concat(H.id,"-error")),z=document.querySelector("#popup__input_type_url"),M=O.querySelector(".".concat(z.id,"-error")),V=document.querySelector("#popup__input_type_card-name"),W=O.querySelector(".".concat(V.id,"-error")),J=P.querySelector("#popup__input_type_avatar"),U=P.querySelector(".".concat(J.id,"-error")),$=document.querySelector(".profile__title"),R=document.querySelector(".profile__description"),Z=document.querySelector(".avatar"),F=document.querySelector(".popup_type_image"),G=document.querySelector(".popup__image"),K=document.querySelector(".popup__caption");function Q(e){return Promise.all([a(),X(e)]).then((function(e){var t=b(e,2),r=t[0];return t[1].likes.some((function(e){return e._id===r._id}))}))}function X(e){return l().then((function(t){return t.find((function(t){return t._id===e}))}))}Promise.all([a(),l()]).then((function(e){var t=b(e,2),r=t[0],n=t[1],o=r._id;$.textContent=r.name,R.textContent=r.about,Z.src=r.avatar,n.forEach((function(e){var t=o==e.owner._id;S.append(d({imageSource:e.link,cardText:e.name,likes:e.likes,cardId:e._id,handleCardDelete:y,removeHandleDelete:t,handleClick:s,isWeLike:Q,popupOpener:Y,ownerId:e.owner._id}))}))})).catch((function(e){return console.error("Ошибка при загрузке данных:",e)})),q.addEventListener("click",(function(e){t(w),T.value=$.textContent,H.value=R.textContent,v({input:T,error:B}),v({input:H,error:N})})),g.addEventListener("click",(function(e){D.disabled=!0,t(C),v({input:z,error:M}),v({input:V,error:W}),O.reset()})),k.addEventListener("click",(function(e){t(L),I.disabled=!0,P.reset(),v({input:J,error:U})})),x.forEach((function(e){e.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_is-opened")&&r(e.target)}))}));var Y=function(e,r){G.src=e,G.alt=r,K.textContent=r,t(F)};E.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(e){r(t)}))})),j.addEventListener("submit",(function(e){e.preventDefault();var t=T.value,n=H.value;A.textContent="Сохраняем...",function(e){var t=e.name,r=e.about;return u("/users/me",{method:"PATCH",body:JSON.stringify({name:t,about:r})})}({name:t,about:n}).then((function(e){$.textContent=e.name,R.textContent=e.about})).finally((function(){A.textContent="Сохранить",r(w)}))})),O.addEventListener("submit",(function(e){e.preventDefault();var t,n,o,c=z.value,i=V.value;D.textContent="Сохраняем...",(t={name:i,link:c},n=t.name,o=t.link,u("/cards",{method:"POST",body:JSON.stringify({name:n,link:o})})).then((function(e){S.prepend(d({imageSource:c,cardText:i,cardId:e._id,handleCardDelete:y,removeHandleDelete:!0,handleClick:s,isWeLike:Q,popupOpener:Y,ownerId:e.owner._id})),r(C),D.textContent="Сохранить"})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))})),P.addEventListener("submit",(function(e){var t;e.preventDefault(),I.textContent="Сохраняем...",(t=J.value,u("/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:t})})).then((function(e){var t=new Image;return t.src=e.url,t.onload=function(){Z.src=t.src},a()})).then((function(e){Z.src=e.avatar})).catch((function(e){return console.error("Ошибка обновления аватара:",e)})).finally((function(){r(L),I.textContent="Сохранить"}))})),_({form:O,submitButton:D}),_({form:j,regex:/^[a-zA-Zа-яА-ЯёЁ\s-]+$/,submitButton:A}),_({form:P,submitButton:I}),x.forEach((function(e){e.classList.add("popup_is-animated")})),a(),l()})();