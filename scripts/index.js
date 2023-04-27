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
const popupSerchCard = document.querySelector('.popup_type_view-img');
const nameCard = popupSerchCard.querySelector('.popup__caption');
const srcCard = popupSerchCard.querySelector('.popup__img');
const buttonClosePopupSerchCard = popupSerchCard.querySelector('.popup__button-close');

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEsc);
}

const buttonOff = (popup) => {
	const buttonSubmit = popup.querySelector('.popup__button-submit');
	buttonSubmit.classList.add('popup__button-submit_disabled');
	buttonSubmit.setAttribute('disabled', true);
}

const deleteError = (popup) => {
	const inputs = Array.from(popup.querySelectorAll('.popup__input'));
	const errors = Array.from(popup.querySelectorAll('.popup__input-error'));
	inputs.forEach((input, error) => {
		input.classList.remove('popup__input_text_error');
	});
	errors.forEach((error) => {
		error.classList.remove('popup__input-error_visible');
		error.textContent = '';
	})
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
	buttonOff(popupProfile);
	deleteError(popupProfile);
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
	buttonOff(popupNewCard);
});
buttonClosePopupNewCard.addEventListener('click', () => {
	closePopup(popupNewCard);
});

const createCardElement = (cardData) => {
	const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
	const cardName = cardElement.querySelector('.element__title');
	const cardImage = cardElement.querySelector('.element__image');

	cardName.textContent = cardData.name;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;

	const buttonLike = cardElement.querySelector('.element__button-like');
	const buttonDelete = cardElement.querySelector('.element__button-delete');

	const handleDelete = () => {
		cardElement.remove();
	};

	const handleLike = () => {
		buttonLike.classList.toggle('element__button-like_active');
	};

	buttonLike.addEventListener('click', handleLike);
	buttonDelete.addEventListener('click', handleDelete);

	cardImage.addEventListener('click', () => {
		openPopup(popupSerchCard);
		nameCard.textContent = cardName.textContent;
		srcCard.src = cardImage.src;
		srcCard.alt = cardName.textContent;
	});

	return cardElement;
};

buttonClosePopupSerchCard.addEventListener('click', () => {
	closePopup(popupSerchCard);
})

const renderCardElement = (cardElement) => {
	cardList.append(cardElement);
};

initialCards.forEach((element) => {
	renderCardElement(createCardElement(element));
});

const handleNewCardFormSubmit = (evt) => {
	evt.preventDefault();

	const newCard = {
		name: nameImage.value,
		link: srcImage.value
	}

	cardList.prepend(createCardElement(newCard));
	formElementNewCard.reset();
	closePopup(popupNewCard);
};

formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);