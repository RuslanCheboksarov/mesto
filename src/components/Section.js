export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  //Метод добавления элемента - принимает сформированную карточку и добавлает ее в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}