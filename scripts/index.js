enableValidation(config);

// Попал для изменения профиля пользователя
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__content_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_description');
const newName = document.querySelector('.profile__title');
const newJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.popup__submit-button');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close-button');



function closePopupByEsc(evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

function closePopupByOverlay(evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
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
    nameInput.value = newName.textContent;
    jobInput.value = newJob.textContent;

    openPopup(popupProfile);
    enableButton(formEditProfile.submit, config); 
    console.log(formEditProfile.submit);
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
    formInputName.value = "";
    formInputLink.value = "";
    openPopup(popupPlace);
    disabledButton(formAddCard.submit, config); 
    console.log(formAddCard.submit);
})

popupPlaceCloseButton.addEventListener('click', function () {
    closePopup(popupPlace);

})

buttonClosePhoto.addEventListener('click', function () {
    closePopup(popupPhoto);

})

// Добавление карточек
const itemTemplate = document.querySelector('.item__template').content;
const list = document.querySelector('.elements__items');
const formAddCard = document.querySelector('.popup__content_place');
const formInputName = popupPlace.querySelector('.popup__text_type_name');
const formInputLink = popupPlace.querySelector('.popup__text_type_link');
const buttonLike = document.querySelector('.elements__like');
const popupPhotoTitle = document.querySelector('.popup__caption');
const popupPhotoImg = document.querySelector('.popup__photo');
const buttonAddCard = document.querySelector('.popup__submit-button');

function createCard(name, link) {
    const newCard = itemTemplate.querySelector('.elements__item').cloneNode(true);
    const elementsPhoto = newCard.querySelector('.elements__photo');
    newCard.querySelector('.elements__title').textContent = name;
    elementsPhoto.src = link;
    elementsPhoto.alt = name;

    newCard.querySelector('.elements__delete').addEventListener('click', () => {
        deleteCard(newCard);
    });

    elementsPhoto.addEventListener('click', () => {
        popupPhotoImg.src = link;
        popupPhotoImg.alt = name;
        popupPhotoTitle.textContent = name;

        openPopup(popupPhoto);
    });

    newCard.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    return newCard;
}

function addCard(newCard) {
    list.prepend(newCard);
}

function deleteCard(item) {
    item.remove();
}

function submitAddCardForm(evt) {
    evt.preventDefault();

    addCard(createCard(formInputName.value, formInputLink.value));

    closePopup(popupPlace);
}

formAddCard.addEventListener('submit', submitAddCardForm);

initialCards.forEach(function (item) {
    addCard(createCard(item.name, item.link));
});