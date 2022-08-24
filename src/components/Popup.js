export default class Popup {
  constructor(popupSelector, buttonClose) {
    this._popup = popupSelector;
    this._closeButton = buttonClose;
    this._saveButton = this._popup.querySelector('.popup__button-save');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
    });
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  addSaving() {
    this._saveButton.textContent = 'Сохранение...';
  }

  deleteSaving(saveButtonTitle) {
    this._saveButton.textContent = saveButtonTitle;
  }

}
