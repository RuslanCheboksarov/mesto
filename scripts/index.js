let popup = document.querySelector('.popup');
let formSubmit = document.querySelector('.popup__form');
let popupEdit = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_data_name');
let jobInput = document.querySelector('.popup__input_data_about');
let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');

function popupOnClick() {
    nameInput.value = profName.textContent;
    jobInput.value = profAbout.textContent;
    popup.classList.add('popup_opened');
}

function popupOnClose(){
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profName.textContent = nameInput.value;
    profAbout.textContent = jobInput.value;
    popupOnClose();
}

popupEdit.addEventListener('click', popupOnClick);
popupClose.addEventListener('click', popupOnClose);
formSubmit.addEventListener('submit', formSubmitHandler);
