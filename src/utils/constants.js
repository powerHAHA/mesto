export const buttonEditProfile = document.querySelector('.profile__button-edit');
export const buttonAddNewCard = document.querySelector('.profile__button-add');
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__job');
export const cardList = document.querySelector('.elements__items');
export const popupProfile = document.querySelector('.popup_type_edit');
export const formElementProfile = popupProfile.querySelector('.popup__form');
export const nameInput = popupProfile.querySelector('.popup__input_type_name');
export const jobInput = popupProfile.querySelector('.popup__input_type_job');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const formElementNewCard = popupNewCard.querySelector('.popup__form');
export const popupSerchCard = document.querySelector('.popup_type_view-img');

export const initialCards = [{
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

export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button-submit_disabled',
	inputErrorClass: 'popup__input_text_error',
	errorClass: 'popup__input-error_visible'
};