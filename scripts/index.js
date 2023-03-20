const buttonOpenPopup = document.querySelector('.profile__edit-button');  //
const popup = document.querySelector('.popup');  //
const formElement = document.querySelector('.popup_popup_profile'); //
const formProfile = formElement.querySelector('.form_form_profile'); //
const nameInput = document.querySelector('#name'); //
const jobInput = document.querySelector('#about'); //
const nameText = document.querySelector('.profile__name-text'); //
const jobText = document.querySelector('.profile__description'); //
const formCardPopup = document.querySelector('.popup_popup_cards'); //
const buttonOpenCardPopup = document.querySelector('.profile__add-button'); //
const formCard = formCardPopup.querySelector('.form_form_cards'); //
const titleInput = formCardPopup.querySelector('.form__input-name'); //
const hrefInput = formCardPopup.querySelector('.form__input-img'); //
const cardContainer = document.querySelector('.cards__list'); //
const closeButtons = document.querySelectorAll('.popup__close-button'); //
const imagePopup = document.querySelector('.popup_popup_image'); //
const pictureImage = imagePopup.querySelector('.popup__picture'); //
const titleImageText = imagePopup.querySelector('.popup__picture_title'); //
const cardTemplate = document.querySelector('#card-template').content; //

function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openProfilePopup () {

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  openPopup(formElement);

};

buttonOpenPopup.addEventListener('click', () => openProfilePopup());

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  closePopup(formElement);
};

formProfile.addEventListener('submit', handleFormSubmit);


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

function openPopup (popup) {
  popup.classList.add('popup_opened');
};

buttonOpenCardPopup.addEventListener('click', () => openPopup(formCardPopup));

function toggleLikeCard (evt) {
  evt.target.classList.toggle('card__like-button_active');
};

function removeCard (evt) {
  evt.target.closest('.card').remove();
};

function handleFormImage (cardData) {
  pictureImage.src = cardData.link;
  pictureImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  titleImageText.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  openPopup(imagePopup);
};

function createCard (cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__heading');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonRemove = cardElement.querySelector('.card__remove-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  cardTitle.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  buttonLike.addEventListener('click', toggleLikeCard);
  buttonRemove.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => handleFormImage(cardData));
  return cardElement;
};

function addCardFormSubmit (evt) {
  evt.preventDefault();

  const newCard = createCard({
    name: titleInput.value,
    link: hrefInput.value
  });

  cardContainer.prepend(newCard);

  closePopup(formCardPopup);

  formCard.reset();
};

formCard.addEventListener('submit', addCardFormSubmit);

initialCards.forEach((cardData) => {
  const newCardFromInitialCards = createCard (cardData);
  cardContainer.append(newCardFromInitialCards);
});