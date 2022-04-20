import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo  from "../components/UserInfo.js";


import { profileName, profileFunction, newPlaceButton, editButton, nameInput, titleInput, popupProfileSelector, popupPlaceSelector, profileForm, placeForm } from "../utils/constants.js";

import "./styles.css";

//instantiate user info class
const userInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__function'});

//set default user name and user title
userInfo.setUserInfo({userName: "Jacques Cousteau", userJob: "Explorer"});

//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");
popupImage.setEventListeners();

//create handleCardClick function for cards
export function handleCardClick({ link, text }) {
  popupImage.open(link, text); 
};

//function to create a new card
function createCard(data, template, callback) {
  const card = new Card(data, template, callback);
  return card.generateCard();
}

//function to set the initial user
function getUser() {
  fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
    headers: {
      authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435"
    }
  })
    .then(res => res.json())
    .then((result) => {
        profileName.textContent = result.name;
        profileFunction.textContent = result.about;
    })
}

getUser();


//function to retrieve all the latest cards from the server
function getCards() {
  fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  headers: {
    authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435"
  }
})
  .then(res => res.json())
  .then((result) => {
    const section = new Section({ 
      items: result, 
      renderer: (item) => {
        const element = createCard({text: item.name, imageLink: item.link}, "#card-template", handleCardClick);
        section.addItem(element);
      }
      },
      ".places"
    );
    
    section.renderItems();
  }); 
}

getCards();

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
  userInfo.setUserInfo(data);
  profileForm.reset();
}

//create handle submit function for adding new places
 function handlePlaceSubmit(data){
  const placeTitle = data.title;
  const placeURL = data.link;

  const element = createCard({text: placeTitle, imageLink: placeURL}, "#card-template", handleCardClick);
  section.addItem(element);
  placeForm.reset();
};








