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

popupCloseButton.addEventListener('click', popupClosed);


function handleFormSubmit(evt) {
  evt.preventDefault();
  popupClosed();
  console.log('Форма отправлена');

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);