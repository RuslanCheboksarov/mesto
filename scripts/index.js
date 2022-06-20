let popup = document.querySelector('.popup');
//profile btns
const popupProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileClose = document.querySelector('[name="popup__close-button-profile"]');
//for adding cards
const addCardButton = document.querySelector('.profile__add-button');
const popupCardClose = document.querySelector('[name="popup__close-button-addcard"]');
//for popup profile
const popupProfile = document.querySelector('#popup-profile');
const formProfileEdit = document.querySelector('[name="popupEditProfile"]');
const popupProfileNameInput = document.querySelector('[name="popup__username"]');
const popupProfileAboutInput = document.querySelector('[name="popup__userabout"]');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
//for popup adding cards
const popupCard = document.querySelector('#popup-card');
const formCard = document.querySelector('[name="popupAddCard"]');
const popupNameInputCard = document.querySelector('[name="popup__cardname"]');
const popupLinkInputCard = document.querySelector('[name="popup__cardlink"]');
const cardName = document.querySelector('.elements__title');
const cardLink = document.querySelector('.elements__image');

const popupPic = document.querySelector('.popup-pic');
const popupPicImage = document.querySelector('.popup-pic__image');
const popupPicTitle = document.querySelector('.popup-pic__title');

const popupPicCloseButton = popupPic.querySelector('[name="popup__close-button-image"]');

// const photoGrid = document.querySelector('.elements');

// let formSubmit = document.querySelector('.popup__form');


// let nameInput = document.querySelector('.popup__input_data_name');
// let jobInput = document.querySelector('.popup__input_data_about');
// let profName = document.querySelector('.profile__name');
// let profAbout = document.querySelector('.profile__about');

const cards = document.querySelector('.elements');
const gridCard = document.querySelector('#card').content;

function createCard(picName, picLink) {
    const newCard = gridCard.querySelector('.elements__card').cloneNode(true);
    const newCardImg = newCard.querySelector('.elements__image');

    newCardImg.src = picLink;
    newCardImg.alt = picName;
    newCard.querySelector('.elements__title').textContent = picName;

    newCard.querySelector('.elements__like-button').addEventListener('click', function (evt){
        evt.target.classList.toggle('elements__like-button_active');
    });

    newCard.querySelector('.elements__image').addEventListener('click', function () {
        popupPicImage.src = picLink;
        popupPicImage.alt = picName;
        popupPicTitle.textContent = picName;
        popupOnClick(popupPic);
      });

    return newCard;
}

initialCards.forEach(function (item) {
    cards.append(createCard(item.name, item.link));
});



function popupOnClick(pickedPopup) {
    pickedPopup.classList.add('popup_opened');
    if (pickedPopup === popupProfile) {
        popupProfileNameInput.value = profName.textContent;
        popupProfileAboutInput.value = profAbout.textContent;
    }
    else if (pickedPopup === popupCard) {
        popupNameInputCard.value = "";
        popupLinkInputCard.value = "";
    }
}

popupProfileEdit.addEventListener('click', function () {
    popupOnClick(popupProfile);
});

addCardButton.addEventListener('click', function () {
    popupOnClick(popupCard);
});

popupPicCloseButton.addEventListener('click', function () {
    popupOnClose(popupPic);
  });

function popupOnClose(pickedPopup) {
    pickedPopup.classList.remove('popup_opened');
    if (pickedPopup === popupProfile) {
        popupProfileNameInput.value = profName.textContent;
        popupProfileAboutInput.value = profAbout.textContent;
    }
    else if (pickedPopup === popupCard) {
        popupNameInputCard.value = "";
        popupLinkInputCard.value = "";
    }
}

popupProfileClose.addEventListener('click', function () {
    popupOnClose(popupProfile);
});

popupCardClose.addEventListener('click', function () {
    popupOnClose(popupCard);
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profName.textContent = popupProfileNameInput.value;
    profAbout.textContent = popupProfileAboutInput.value;

    popupOnClose(popupProfile);
}

function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    cards.prepend(createCard(popupNameInputCard.value, popupLinkInputCard.value));

    popupNameInputCard.value = "";
    popupLinkInputCard.value = "";
  
    popupOnClose(popupCard);
  }

formProfileEdit.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', formSubmitHandlerCard);