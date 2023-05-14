import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConsts } from './FormValidator.js';

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
]; 

const popups = document.querySelectorAll('.popup');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddNewCard = document.querySelector('.profile__button-add');
const cardTemplate = document.querySelector('#cards-element');
const cardList = document.querySelector('.elements__items');
const popupProfile = document.querySelector('.popup_type_edit');
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementNewCard = popupNewCard.querySelector('.popup__form');
const nameImage = popupNewCard.querySelector('.popup__input_type_title');
const srcImage = popupNewCard.querySelector('.popup__input_type_src');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');
const popupViewCard = document.querySelector('.popup_type_view-img');
const nameCard = popupViewCard.querySelector('.popup__caption');
const srcCard = popupViewCard.querySelector('.popup__img');
const buttonClosePopupViewCard = popupViewCard.querySelector('.popup__button-close');

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEsc);
}

const closeByEsc = (evt) => {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	}
}

popups.forEach((popup) => {
	popup.addEventListener('click', (event) => {
	  if (event.target === event.currentTarget) {
		closePopup(popup);
	  };
	});
  });

const handleEditProfileClick = () => {
	openPopup(popupProfile);
	profileValidator.deleteErrors();
	profileValidator.ButtonState();
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}

buttonEditProfile.addEventListener('click', handleEditProfileClick);
buttonClosePopupProfile.addEventListener('click', () => {
	closePopup(popupProfile);
});

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;
	closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

buttonAddNewCard.addEventListener('click', () => {
	openPopup(popupNewCard);
	cardValidator.deleteErrors();
	cardValidator.ButtonState();
});

buttonClosePopupNewCard.addEventListener('click', () => {
	closePopup(popupNewCard);
});

const openPopupImage = (image) => {
	openPopup(popupViewCard);
	nameCard.textContent = image.name;
	srcCard.src = image.link;
	srcCard.alt = image.name;
}

const createCard = (data) => {
	const card = new Card(data, '#cards-element', openPopupImage);
	return card.generateCard();
}

initialCards.forEach((item) => {
	const defaultCard = createCard(item);
	cardList.append(defaultCard);
})
const handleNewCardFormSubmit = (evt) => {
	evt.preventDefault();
	const newCard = {
		name: nameImage.value,
		link: srcImage.value
	}
	cardList.prepend(createCard(newCard));
	formElementNewCard.reset();
	closePopup(popupNewCard);
};
formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);
buttonClosePopupViewCard.addEventListener('click', () => {
 	closePopup(popupViewCard);
 })

 const profileValidator = new FormValidator(validationConsts, formElementProfile);
 profileValidator.enableValidation();

 const cardValidator = new FormValidator(validationConsts, formElementNewCard);
 cardValidator.enableValidation();
