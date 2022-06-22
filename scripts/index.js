//profile btns
const popupProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileClose = document.querySelector('[name="popup__close-button-profile"]');
//for adding cards
const addCardButton = document.querySelector('.profile__add-button');
const popupCardClose = document.querySelector('[name="popup__close-button-addcard"]');
//for popup profile
const popupProfile = document.querySelector('.popup_type_editprofile');
const formProfileEdit = document.querySelector('[name="popupEditProfile"]');
const popupProfileNameInput = document.querySelector('[name="popup__username"]');
const popupProfileAboutInput = document.querySelector('[name="popup__userabout"]');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
//for popup adding cards
const popupCard = document.querySelector('.popup_type_addcard');
const formCard = document.querySelector('[name="popupAddCard"]');
const popupNameInputCard = document.querySelector('[name="popup__cardname"]');
const popupLinkInputCard = document.querySelector('[name="popup__cardlink"]');
const cardName = document.querySelector('.elements__title');
const cardLink = document.querySelector('.elements__image');

const popupPic = document.querySelector('.popup_type_image');
const popupPicImage = document.querySelector('.popup__image');
const popupPicTitle = document.querySelector('.popup__caption');
const popupPicCloseButton = popupPic.querySelector('[name="popup__close-button-image"]');

const cards = document.querySelector('.elements');
const gridCard = document.querySelector('#card').content;

function createCard(picName, picLink) {
    const newCard = gridCard.querySelector('.elements__card').cloneNode(true);
    const newCardImg = newCard.querySelector('.elements__image');

    newCardImg.src = picLink;
    newCardImg.alt = picName;
    newCard.querySelector('.elements__title').textContent = picName;

    newCard.querySelector('.elements__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });

    newCard.querySelector('.elements__delete').addEventListener('click', function (evt) {
        evt.target.closest('.elements__card').remove();
    });

    newCard.querySelector('.elements__image').addEventListener('click', function () {
        popupPicImage.src = picLink;
        popupPicImage.alt = picName;
        popupPicTitle.textContent = picName;
        clickPopup(popupPic);
    });

    return newCard;
}

initialCards.forEach(function (item) {
    cards.append(createCard(item.name, item.link));
});



function clickPopup(pickedPopup) {
    pickedPopup.classList.add('popup_opened');
}

popupProfileEdit.addEventListener('click', function () {
    popupProfileNameInput.value = profName.textContent;
    popupProfileAboutInput.value = profAbout.textContent;
    clickPopup(popupProfile);
});

addCardButton.addEventListener('click', function () {
    popupNameInputCard.value = "";
    popupLinkInputCard.value = "";
    clickPopup(popupCard);
});

popupPicCloseButton.addEventListener('click', function () {
    closePopup(popupPic);
});

function closePopup(pickedPopup) {
    pickedPopup.classList.remove('popup_opened');
}

popupProfileClose.addEventListener('click', function () {
    closePopup(popupProfile);
});

popupCardClose.addEventListener('click', function () {
    closePopup(popupCard);
});

popupProfile.addEventListener('click', function (e){
    if (e.target === e.currentTarget){
        closePopup(popupProfile);
    }
});

popupCard.addEventListener('click', function (e){
    if (e.target === e.currentTarget){
        closePopup(popupCard);
    }
});

popupPic.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup(popupPic);
    }
});

function submitHandlerProfile(evt) {
    evt.preventDefault();
    profName.textContent = popupProfileNameInput.value;
    profAbout.textContent = popupProfileAboutInput.value;

    closePopup(popupProfile);
}

function submitHandlerCard(evt) {
    evt.preventDefault();
    cards.prepend(createCard(popupNameInputCard.value, popupLinkInputCard.value));
    closePopup(popupCard);

    popupNameInputCard.value = "";
    popupLinkInputCard.value = "";
}

formProfileEdit.addEventListener('submit', submitHandlerProfile);
formCard.addEventListener('submit', submitHandlerCard);