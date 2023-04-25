const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
	} else {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
	buttonElement.classList.add(inactiveButtonClass);
	buttonElement.setAttribute('disabled', true);
}

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
	buttonElement.classList.remove(inactiveButtonClass);
	buttonElement.removeAttribute('disabled', true);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	if (hasInvalidInput(inputList)) {
		disableSubmitButton(buttonElement, inactiveButtonClass);
	} else {
		enableSubmitButton(buttonElement, inactiveButtonClass);
	}
};

setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, rest);
			toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
	});
}

const enableValidation = ({ formSelector, ...rest }) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
}

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button-submit_disabled',
	inputErrorClass: 'popup__input_text_error',
	errorClass: 'popup__input-error_visible'
});