import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
	constructor({ popupElement, handleFormSubmit, inputSelector }) {
		super(popupElement);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._submitButton = this._popup.querySelector('.popup__button-submit');
		this._standardTextButton = this._submitButton.textContent;
		this._inputList = this._popup.querySelectorAll(inputSelector);
	}

	_getInputValues() {
		this._formValues = {};

		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			this._handleFormSubmit(this._getInputValues());
		});
	}

	close() {
		super.close();

		this._form.reset();
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Сохранение';
		} else {
			this._submitButton.textContent = this._standardTextButton;
		}
	}
}