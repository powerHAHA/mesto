import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import {
	initialCards, 
	validationConfig, 
	formElementProfile, 
	formElementNewCard, 
	cardList, 
	popupProfile, 
	popupNewCard, 
	popupSerchCard, 
	buttonEditProfile, 
	buttonAddNewCard, 
	nameProfile, 
	jobProfile, 
	nameInput, 
	jobInput, 

} from '../utils/constants.js';

const createCard = (cardItem) => {
	const card = new Card({
		data: cardItem,
		handleCardClick: () => {
			popupSerchImage.openPopup(cardItem);
		}
	},
		'#cards-element')
	return card.generateCard();
}

const profileValidator = new FormValidator(validationConfig, formElementProfile);

const cardValidator = new FormValidator(validationConfig, formElementNewCard);

const cardsList = new Section({
	items: initialCards,
	renderer: (cardItem) => {
		cardsList.addItem(createCard(cardItem));
	}
},
	cardList);
cardsList.renderItems();

const popupSerchImage = new PopupWithImage(popupSerchCard);

const userInfo = new UserInfo({
	userNameSelector: nameProfile,
	userDescriptionSelector: jobProfile
})

const popupEditProfile = new PopupWithForm({
	popupSelector: popupProfile,
	handleFormSubmit: (data) => {
		userInfo.setUserInfo({
			userName: data.profileName,
			userDescription: data.profileJob
		});
		popupEditProfile.closePopup();
	}
})

const popupAddCard = new PopupWithForm({
	popupSelector: popupNewCard,
	handleFormSubmit: (data) => {
		const newCard = {
			name: data.imageName,
			link: data.imageLink
		}
		cardsList.addNewItem(createCard(newCard));
		popupAddCard.closePopup();
	}
})

buttonEditProfile.addEventListener('click', () => {
	popupEditProfile.openPopup();
	profileValidator.deleteErrors();
	const user = userInfo.getUserInfo();
	nameInput.value = user.name;
	jobInput.value = user.description;
})

buttonAddNewCard.addEventListener('click', () => {
	popupAddCard.openPopup();
	cardValidator.deleteErrors();
})

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupSerchImage.setEventListeners();
profileValidator.enableValidation();
cardValidator.enableValidation();