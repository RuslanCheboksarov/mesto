import "./index.css";

import {
  buttonEdit,
  buttonAdd,
  popupProfile,
  popupPlace,
  popupCard,
  popupAvatar,
  popupCloseButtonProfile,
  popupCloseButtonPlace,
  popupCloseButtonImage,
  popupCloseButtonAvatar,
  popupImg,
  popupTitle,
  profileName,
  profileInfo,
  nameInput,
  jobInput,
  formAddName,
  formAddAvatar,
  formAddCards,
  formInputName,
  formInputImage,
  cardsContainer,
  buttonEditAvatar,
  profileAvatar,
  popupDel,
  popupCloseButtonConfirm,
  buttonDel,
  buttonDeleteConfirm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import config from "../utils/config.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "2416fc82-bfbc-4b78-a4fd-442dace64f7e",
    "Content-Type": "application/json",
  },
});

//добавляем валидацию формам
const formValidatorAddName = new FormValidator(config, formAddName);
formValidatorAddName.enableValidation();

const formValidatorAddCards = new FormValidator(config, formAddCards);
formValidatorAddCards.enableValidation();

const formValidatorAddAvatar = new FormValidator(config, formAddAvatar);
formValidatorAddAvatar.enableValidation();

const userInfoData = new UserInfo(profileName, profileInfo, profileAvatar);

const popupConfirm = new PopupWithConfirmation(
  popupDel,
  deleteFormCard,
  popupCloseButtonConfirm
);

const popupImage = new PopupWithImage(
  popupCard,
  popupCloseButtonImage,
  popupImg,
  popupTitle
);

popupImage.setEventListeners();
popupConfirm.setEventListeners();

const popupFormProfile = new PopupWithForm(
  popupProfile,
  handleProfileFormSubmit,
  popupCloseButtonProfile
);

const popupFormCard = new PopupWithForm(
  popupPlace,
  handleCardsSubmit,
  popupCloseButtonPlace
);

const popupFormAvatar = new PopupWithForm(
  popupAvatar,
  handleAvatarFormSubmit,
  popupCloseButtonAvatar
);

let currentUserId = 0;

const createCard = (data) => {
  data.currentUserId = currentUserId;

  const card = new Card(data, "#card-template", {
    imageClick: handleCardClick,
    remove: handleOpenConfirmPopup,
    like: handleLikeClick,
    removeLike: handleLikeRemove,
  });

  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardsContainer
);

function handleLikeClick(currentData, likeCallback) {
  api
    .likeCard(currentData._id)
    .then((updatedData) => {
      likeCallback(updatedData.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeRemove(currentData, likeCallback) {
  api
    .likeRemove(currentData._id)
    .then((updatedData) => {
      likeCallback(updatedData.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleOpenConfirmPopup(currentData, removeCallback) {
  popupConfirm.open(currentData, removeCallback);
}

function deleteFormCard(currentData, removeCallback) {
  popupConfirm.addSaving();

  api
    .deleteCard(currentData._id)
    .then(() => {
      removeCallback();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupConfirm.deleteSaving("Да"));
}

function handleCardsSubmit(data) {
  popupFormCard.addSaving();
  api
    .setNewCard({ name: data.newname, link: data.link })
    .then((res) => {
      cardsList.addNewItem(
        createCard(res, "#card-template", {
          imageClick: handleCardClick,
          remove: handleOpenConfirmPopup,
          like: handleLikeClick,
          removeLike: handleLikeRemove,
        })
      );
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupFormCard.deleteSaving("Создать"));
}

function handleProfileFormSubmit({ name, job }) {
  popupFormProfile.addSaving();
  api
    .setUserInfo({ name: name, about: job })
    .then((res) => {
      userInfoData.setUserInfo({ name: res.name, about: res.about });
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupFormProfile.deleteSaving("Сохранить"));
}

function handleAvatarFormSubmit({ avatar }) {
  popupFormAvatar.addSaving();

  api
    .setProfileAvatar({ avatar: avatar })
    .then((res) => {
      userInfoData.setUserAvatar({ avatar: res.avatar });
      popupFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupFormAvatar.deleteSaving("Сохранить"));
}

function handleCardClick({ name, link }) {
  popupImage.open({ data: { name, link } });
}

// попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  const currentData = userInfoData.getUserInfo();
  nameInput.value = currentData.name;
  jobInput.value = currentData.job;

  popupFormProfile.open();

  formValidatorAddName.deleteMistakes();
});
// попап добавления карточки
buttonAdd.addEventListener("click", function () {
  formAddCards.reset();
  formValidatorAddCards.deleteMistakes();
  popupFormCard.open();
});
// попап добавления аватара
buttonEditAvatar.addEventListener("click", function () {
  formValidatorAddAvatar.deleteMistakes();
  popupFormAvatar.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([res, items]) => {
    userInfoData.setUserInfo(res);
    userInfoData.setUserAvatar(res);
    currentUserId = res._id;
    cardsList.renderItems(items, res._id);
  })
  .catch((err) => {
    console.log(err);
  });
