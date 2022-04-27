import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { api, userInfo } from "../components/Api.js";



import { newPlaceButton, editButton, nameInput, titleInput, popupProfileSelector, popupPlaceSelector, profileForm, placeForm, pictureForm, profilePictureButton, popupPictureSelector } from "../utils/constants.js";

import "./styles.css";

api.getInitialCards();
api.getInitialUser();

//instantiate popup place form
const popupPlace = new PopupWithForm(".popup-place", handlePlaceSubmit);
popupPlace.setEventListeners();

//instantiate popup profile form
const popupProfile = new PopupWithForm(".popup-profile", handleProfileSubmit);
popupProfile.setEventListeners();

//instantiate popup for profile picture
const popupProfilePicture = new PopupWithForm(".popup-profile-picture", handlePictureSubmit);
popupProfilePicture.setEventListeners();

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

const pictureValidator = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}, ".popup__form-profile-picture");

pictureValidator.enableValidation();

//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', openPlaceForm);

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);

//add event listener to open the form to change the profile picture
profilePictureButton.addEventListener('click', openProfilePicture);

//function to open form for picture change
function openProfilePicture () {
  pictureValidator.resetValidation(popupPictureSelector);
  popupProfilePicture.open();
}

//function to open profile
function openProfilePopup () {
  profileValidator.resetValidation(popupProfileSelector);  
  const { userName, userJob } = userInfo.getUserInfo();
  nameInput.value = userName;
  titleInput.value = userJob;
  popupProfile.open();
}

//function to open place form
function openPlaceForm () {
  placeValidator.resetValidation(popupPlaceSelector);
  popupPlace.open();
}

//create handle submit function for changing profile
function handleProfileSubmit(data) {
  api.setNewUser(data);
  profileForm.reset();
}

//create handle submit function for adding new places
 function handlePlaceSubmit(data){
  api.addCart(data);
  placeForm.reset();
};

//create handle submit for new profile picture
function handlePictureSubmit(data){
  api.changePicture(data);
  pictureForm.reset();
}









