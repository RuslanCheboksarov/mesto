import { initialCards } from "./initial-cards.js";
// import { config } from "./validate.js"
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Попал для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_description');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close-button');

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function closePopupByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

function openPopup(popup) {
    document.addEventListener('keydown', closePopupByEsc);
    popup.addEventListener('mousedown', closePopupByOverlay);
    popup.classList.add('popup_opened');
}


function closePopup(popup) {
    document.removeEventListener('keydown', closePopupByEsc);
    popup.removeEventListener('mousedown', closePopupByOverlay);
    popup.classList.remove('popup_opened');
}

function handleEditProfileForm(evt) {
    evt.preventDefault();
    openPopup(popupProfile); 
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;
}

buttonOpenPopupProfile.addEventListener('click', handleEditProfileForm);

popupCloseButtonProfile.addEventListener('click', function () {
    closePopup(popupProfile);
});

function submitEditProfileForm(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

const buttonAddOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button');
const popupPhoto = document.querySelector('.popup_photo');
const buttonClosePhoto = popupPhoto.querySelector('.popup__close-button');

buttonAddOpen.addEventListener('click', function () {
    // formInputName.value = "";
    // formInputLink.value = "";
    formAddCard.reset();
    openPopup(popupPlace);
    formCard.resetValidation();
})

popupPlaceCloseButton.addEventListener('click', function () {
    closePopup(popupPlace);
})

buttonClosePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);

})

// Добавление карточек
// const itemTemplate = document.querySelector('.item__template').content;
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__content_place');
const formInputName = popupPlace.querySelector('.popup__text_type_name');
const formInputLink = popupPlace.querySelector('.popup__text_type_link');
const buttonLike = document.querySelector('.elements__like');
const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');
const buttonAddCard = document.querySelector('.popup__submit-button');



function handleClickCard (name, link) {
    popupPhotoImg.src = link;
    popupPhotoImg.alt = name;
    popupPhotoTitle.textContent = name;
  
    openPopup(popupPhoto)
  };

  function createCard(name, link) {
    const card = new Card(name, link, handleClickCard);
    const cardElement = card.generateCard();
  
    return cardElement;
  }

function addCard(cardElement) {
    list.prepend(cardElement);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const cardElement = createCard(formInputName.value, formInputLink.value);
    addCard(cardElement, list);
  
    closePopup(popupPlace);
}

formAddCard.addEventListener('submit', submitAddCardForm);

initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
});

const formProfile = new FormValidator (config, formEditProfile);
formProfile.enableValidation();

const formCard = new FormValidator (config, formAddCard);
formCard.enableValidation();