import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";

import { initialCards } from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo  from "./UserInfo.js";

import { newPlaceButton, editButton, nameInput, titleInput, popupProfileSelector, popupPlaceSelector } from "./constants.js";

//instantiate user info class
const userInfo = new UserInfo({userName: "", userJob: ""});

//set default user name and user title
userInfo.setUserInfo({userName: "Jacques Cousteau", userJob: "Explorer"});

//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");

//create handleCardClick function for cards
function handleCardClick(evt) {
 const imageLink = evt.target.src;
 const imageName = evt.target.alt;
 popupImage.open(imageLink, imageName); 
};

// generate initial cards on screen
const section = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card({text: item.name, imageLink: item.link}, "#card-template", handleCardClick);
    const element = card.generateCard();
    section.addItem(element);
  }
  },
  ".places"
);

//create handle submit function for adding new places
function handlePlaceSubmit(data){
  const placeTitle = data.title;
  const placeURL = data.link;

  const card = new Card({text: placeTitle, imageLink: placeURL}, "#card-template", handleCardClick);
  const element = card.generateCard();
  section.addItem(element);
};

//instantiate popup place form
const popupPlace = new PopupWithForm(".popup-place", handlePlaceSubmit);


//create handle submit function for chaning profile
function handleProfileSubmit(data) {
  userInfo.setUserInfo(data);
}

//instantiate popup profile form
const popupProfile = new PopupWithForm(".popup-profile", handleProfileSubmit);


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


//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', openPlaceForm);

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);




function openProfilePopup () {
  profileValidator.resetValidation(popupProfileSelector);  
  const data = userInfo.getUserInfo();
  nameInput.value = data.userName;
  titleInput.value = data.userJob;
  popupProfile.open();
}

function openPlaceForm () {
  placeValidator.resetValidation(popupPlaceSelector);
  popupPlace.open();
}







