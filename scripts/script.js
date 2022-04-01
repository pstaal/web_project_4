import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { closeModal, openModal, editProfile, addPlace, nameInput, titleInput, profileName, profileFunction} from "./utils.js";


const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const popupForPlace = document.querySelector('.popup-picture');
const editButton = document.querySelector('.profile__button-name-change');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close');
const popupPictureCloseButton = popupForPlace.querySelector('.popup__close');
const cardContainer = document.querySelector('.places');
const newPlaceButton = document.querySelector('.profile__button-add-place');
const popupFormProfile = document.querySelector('.popup__form-profile');
const popupFormPlace = document.querySelector('.popup__form-place');


//initial cards for the page
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ]; 


//put all initial cards into the DOM
initialCards.forEach((card) => {
    let newCard = new Card({text: card.name, imageLink: card.link}, "#card-template");
    let element = newCard.generateCard();
    cardContainer.append(element);
});

//enable form validation

const profileValidator = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}, ".popup__form-profile");

profileValidator.enableValidation();

const placeValidator = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}, ".popup__form-place");

placeValidator.enableValidation();

//add event listeners to submit the form for profile
popupFormProfile.addEventListener('submit', editProfile);

//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', openPlaceForm);

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);

//add event listener to submit the form for the new place card
popupFormPlace.addEventListener('submit', addPlace);

// add eventlisteners to the three modals

popupPlaceCloseButton.addEventListener('click', function() {closeModal(popupPlace)});
popupProfileCloseButton.addEventListener('click', function() {closeModal(popupProfile)});
popupPictureCloseButton.addEventListener('click', function() {closeModal(popupForPlace)});


function openProfilePopup () {
  profileValidator.resetValidation(popupProfile);  
  nameInput.value = profileName.textContent;
  titleInput.value = profileFunction.textContent;
  openModal(popupProfile); 
}

function openPlaceForm () {
placeValidator.resetValidation(popupPlace);
openModal(popupPlace);
}



