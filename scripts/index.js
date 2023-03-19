let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.form');
let profileNameInput = document.querySelector('#name');
let profileDescriptionInput = document.querySelector('#about');
let profileName = document.querySelector('.profile__name-text');
let profileDescription = document.querySelector('.profile__description');

function popupOpened() {
  popup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

editProfileButton.addEventListener('click', popupOpened);


function popupClosed() {
  popup.classList.remove('popup_opened');
}

/*Открытие попапа с увеличенным изображением*/
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
  console.log('123');
  return cardElement;
};

/*функция добавления данных карточки в разметку*/
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