export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  //Публичный метод валидации
  enableValidation() {
    this._setEventListeners();
  }

  // Слушатель событий
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }
  // Метод, который очищает ошибку
  deleteMistakes() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  // Метод, который отключает кнопку
  disableButton() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  // Метод, который включает кнопку
  enableButton() {
    this._buttonElement.removeAttribute("disabled", false);
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  // Метод, который стилизует кнопку и делает кнопку активной или нет
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this.disableButton();
    } else {
      // иначе сделай кнопку активной
      this.enableButton();
    }
  }

  // Метод, который проверяет все поля формы
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    });
  }

  // Метод, который делает валидацию поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод, который добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
  }
}
