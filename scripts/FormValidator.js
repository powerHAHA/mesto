class FormValidator {
	constructor(config, formElement) {
		this._formSelector = config.formSelector;
		this._inputSelector = config.inputSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._errorClass = config.errorClass;
		this._inputErrorClass = config.inputErrorClass;
		this._submitButtonSelector = config.submitButtonSelector;
		this._formElement = formElement;
	}
	enableValidation() {
		this._setEventListeners();
	}
 	_setEventListeners() {
 		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
 		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
 		this.ButtonState();
 		this._inputList.forEach((inputElement) => {
 			inputElement.addEventListener('input', () => {
 				this._checkInputValidity(inputElement);
 				this.ButtonState();
 			});
 		});
 	}

 	deleteErrors() {
 		this._inputList.forEach((inputElement) => {
 			this._hideInputError(inputElement);
 		})
 	};

 	ButtonState() {
 		if (this._hasInvalidInput()) {
 			this._buttonElement.classList.add(this._inactiveButtonClass);
 			this._buttonElement.setAttribute('disabled', true);
 		} else {
 			this._buttonElement.classList.remove(this._inactiveButtonClass);
 			this._buttonElement.removeAttribute('disabled', true);
 		}
 	}

 	_hasInvalidInput() {
 		return this._inputList.some((inputElement) => {
 			return !inputElement.validity.valid;
		})
	};
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	};
	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	};
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};
}

export const validationConsts = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_text_error',
    errorClass: 'popup__input-error_visible'
}; 

export default FormValidator;