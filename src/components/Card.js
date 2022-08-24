export default class Card {
  constructor(data, selectorTemplate, handler) {
    this._data = data;
    this._selectorTemplate = selectorTemplate;
    this._onImageClick = handler.imageClick;
    this._onRemove = handler.remove;
    this._onLike = handler.like;
    this._removeLike = handler.removeLike;
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".cards__image");
    this._title = this._element.querySelector(".cards__title");
    this._likeButton = this._element.querySelector(".cards__button_type_like");

    this._removeButton = this._element.querySelector(".cards__button_type_del");
    this._likeCount = this._element.querySelector(".cards__like-number");

    this._isLiked = this._data.likes.find(
      (item) => item._id === this._data.currentUserId
    );


    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._title.textContent = this._data.name;
    this._likeCount.textContent = this._data.likes.length;
    this._setEventListeners();
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._selectorTemplate) // используем this._selectorTemplate
      .content.querySelector(".cards__item")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    return this._element;
  }

  _setEventListeners() {

    this._likeButton.addEventListener("click", () => {
      this._handlerLike();
    });

    const isOwner = this._data.owner._id === this._data.currentUserId;
    if (isOwner) {
      this._removeButton.addEventListener("click", () => {
        this._onRemove(this._data, () => this._handlerRemove());
      });
    } else {
      this._removeButton.remove();
    }

    this._image.addEventListener("click", () => {
      this._onImageClick(this._data);
    });

    if (this._isLiked)
      this._likeButton.classList.add("cards__button_type_like-active");
  }

  _handlerLike() {
    this._isLiked = this._data.likes.find(
      (item) => item._id === this._data.currentUserId
    );

    if (this._isLiked) {
      this._likeButton.classList.remove("cards__button_type_like-active");
      this._removeLike(this._data, (newLikes) => {
        console.log("Работаю removeLike", { newLikes });
        this._data.likes = newLikes;
        this._likeCount.textContent = this._data.likes.length;
      });
    } else {
      this._likeButton.classList.add("cards__button_type_like-active");
      this._onLike(this._data, (newLikes) => {
        console.log("Работаю onLike", { newLikes });
        this._data.likes = newLikes;
        this._likeCount.textContent = this._data.likes.length;
      });
    }
  }

  _handlerRemove() {
    this._element.remove();
    this._element = null;
  }

 
}
