import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit, buttonClose) {
    super(popupSelector, buttonClose);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  open(currentData, removeCallback) {
    super.open();
    this._currentData = currentData;
    this._removeCallback = removeCallback;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit(this._currentData, this._removeCallback);
    });
    super.setEventListeners();
  }
}
