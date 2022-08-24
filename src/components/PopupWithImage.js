import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, buttonClose, popupImg, popupTitle) {
    super(popupSelector, buttonClose);
    this._image = popupImg;
    this._title = popupTitle;
  }

  open({data}) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._title.textContent = data.name;
    super.open();
  }
}
// name, link
