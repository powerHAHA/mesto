import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupDelete } from '../components/PopupDelete';
import { Section } from '../components/Section';
import { Api } from '../components/Api';
import {
	validationConfig, 
	formElementProfile, 
	formElementNewCard, 
	formElementAvatar, 
	cardList, 
	popupProfile, 
	popupNewCard, 
	popupAvatar, 
	popupSerchCard, 
	buttonEditProfile, 
	buttonAddNewCard, 
	buttonEditAvatar, 
	nameProfile,
	jobProfile, 
	avatarProfile,
	nameInput,
	jobInput,
	avatarInput,
	popupDelete,

} from '../utils/constants.js';

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-70/',
	headers: {
		authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
		'Content-Type': 'application/json'
	}
})

let userId;

const userInfo = new UserInfo({
	userNameSelector: nameProfile,
	userDescriptionSelector: jobProfile,
	userAvatarSelector: avatarProfile
})

Promise.all([api.getCards(), api.getUserData()]).then(([cardsArray, userProfileInfo]) => {
	userId = userProfileInfo._id;
	userInfo.setUserInfo({ userName: userProfileInfo.name, userDescription: userProfileInfo.about });
	userInfo.setUserAvatar({ imageAvatar: userProfileInfo.avatar });
	cardsList.renderItems(cardsArray);
}).catch((err) => console.log(`Возникла ошибка: ${err}`))

const createCard = (cardItem) => {
	const card = new Card({
		data: cardItem,
		handleCardClick: () => {
			popupSerchImage.open(cardItem);
		},
		handleCardDelete: () => {
			popupDeleteCard.open(card);
		},
		handleLikeCard: (cardId) => {
			api.putLike(cardId)
				.then((res) => {
					card.toggleLikes(res);
				}).catch((err) => console.log(`При постановке лайка возникла ошибка: ${err}`));
		},
		handleDeleteLikeCard: (cardId) => {
			api.deleteLike(cardId)
				.then((res) => {
					card.toggleLikes(res);
				}).catch((err) => console.log(`При удаление лайка возникла ошибка: ${err}`));
		},
	},
		userId,
		'#cards-element')
	return card.generateCard();
}

const cardsList = new Section({
	renderer: (cardItem) => {
		cardsList.addItem(createCard(cardItem));
	}
},
	cardList);

const popupSerchImage = new PopupWithImage(popupSerchCard);

const popupDeleteCard = new PopupDelete({
	popupElement: popupDelete,
	cardDelete: (card, cardId) => {
		api.deleteCard(cardId)
			.then(() => {
				card.removeCard();
				popupDeleteCard.close();
			}).catch((err) => console.log(`При удалении карточки возникла ошибка: ${err}`))
	}
})

const popupEditProfile = new PopupWithForm({
	popupElement: popupProfile,
	handleFormSubmit: (data) => {
		popupEditProfile.renderLoading(true);
		api.sendUserData(data)
			.then((res) => {
				userInfo.setUserInfo({
					userName: res.name,
					userDescription: res.about
				});
				popupEditProfile.close();
			}).catch((err) => console.log(`При редактировании профиля возникла ошибка: ${err}`))
			.finally(() => { popupEditProfile.renderLoading(false); })
	}
})

const popupEditAvatar = new PopupWithForm({
	popupElement: popupAvatar,
	handleFormSubmit: (data) => {
		popupEditAvatar.renderLoading(true);
		api.sendAvatarData(data)
			.then((res) => {
				userInfo.setUserAvatar({
					imageAvatar: res.avatar,
				});
				popupEditAvatar.close();
			}).catch((err) => console.log(`При смене аватара возникла ошибка: ${err}`))
			.finally(() => { popupEditAvatar.renderLoading(false); })
	}
})

const popupAddCard = new PopupWithForm({
	popupElement: popupNewCard,
	handleFormSubmit: (data) => {
		popupAddCard.renderLoading(true);
		api.addNewCard({ name: data.imageName, link: data.imageLink })
			.then((card) => {
				cardsList.addNewItem(createCard(card));
				popupAddCard.close();
			}).catch((err) => console.log(`При добавлении карточки возникла ошибка: ${err}`))
			.finally(() => { popupAddCard.renderLoading(false); })
	}
})

buttonEditProfile.addEventListener('click', () => {
	popupEditProfile.open();
	profileValidator.toggleButtonState();
	profileValidator.deleteErrors();
	const user = userInfo.getUserInfo();
	nameInput.value = user.name;
	jobInput.value = user.description;
})

buttonAddNewCard.addEventListener('click', () => {
	popupAddCard.open();
	cardValidator.toggleButtonState();
	cardValidator.deleteErrors();
})

buttonEditAvatar.addEventListener('click', () => {
	popupEditAvatar.open();
	avatarValidator.toggleButtonState();
	avatarValidator.deleteErrors();
})

popupEditAvatar.setEventListeners();
popupSerchImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();

const profileValidator = new FormValidator(validationConfig, formElementProfile);
const cardValidator = new FormValidator(validationConfig, formElementNewCard);
const avatarValidator = new FormValidator(validationConfig, formElementAvatar);

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();