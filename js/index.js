let popup = document.querySelector('.page');
let popupButton = popup.querySelector('.profile__edit-button');
let popupClosed = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_user-name');
let jobInput = document.querySelector('.popup__input_user-about'); 
let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');

function popupForm() {
    let popupActive = popup.querySelector('.popup');
    popupActive.classList.add('popup__opened');
    nameInput.value = profName.textContent;
    jobInput.value = profAbout.textContent;
}

function closePopup(){
    let popupClose = popup.querySelector('.popup');
    popupClose.classList.remove('popup__opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let name = nameInput.value;
    let about = jobInput.value;

    profName.textContent = name;
    profAbout.textContent = about;

    nameInput.textContent = '';
    jobInput.textContent = '';
    closePopup();
}

popupButton.addEventListener('click', popupForm);
popupClosed.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
