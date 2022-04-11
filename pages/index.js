import FormValidator from "../Components/FormValidator.js";
import Card from "../Components/Card.js";
import Section from "../Components/Section.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import UserInfo  from "../Components/UserInfo.js";
import { handleCardClick, handlePlaceSubmit, handleProfileSubmit, openPlaceForm, openProfilePopup } from "../Utils/utils.js";

import { initialCards, newPlaceButton, editButton } from "../Utils/constants.js";

//instantiate user info class
const userInfo = new UserInfo({userName: "", userJob: ""});

//set default user name and user title
userInfo.setUserInfo({userName: "Jacques Cousteau", userJob: "Explorer"});

//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");
popupImage.setEventListeners();

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

section.renderItems();

//instantiate popup place form
const popupPlace = new PopupWithForm(".popup-place", handlePlaceSubmit);
popupPlace.setEventListeners();

//instantiate popup profile form
const popupProfile = new PopupWithForm(".popup-profile", handleProfileSubmit);
popupProfile.setEventListeners();

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











