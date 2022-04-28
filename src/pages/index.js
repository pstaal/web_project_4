import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupConfirmation from "../components/PopupConfirmation";
import PopupWithImage from "../components/PopupWithImage";
import { profilePicture, profileButton, placeButton, pictureButton, newPlaceButton, editButton, nameInput, titleInput, popupProfileSelector, popupPlaceSelector, profileForm, placeForm, pictureForm, profilePictureButton, popupPictureSelector } from "../utils/constants.js";
import "./styles.css";


//set constants

let section;
let currentId;

//initalize api class
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435",
    "Content-Type": "application/json"
  }
}); 


//handleclick function for deleting card
function handleClick(card) {
  api.deleteCard(card.id);
  card.removeCard();
}

//instantiate popup confirmation class
const popupConfirmation = new PopupConfirmation(".popup-confirm", handleClick);
popupConfirmation.setEventListeners();

//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");
popupImage.setEventListeners();

//instantiate user info class
export const userInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__function'});


//function to create a new card
function createCard(data, template, callback, popupConfirmation) {
    const card = new Card(data, template, callback, popupConfirmation);
    return card.generateCard();
}

//create handleCardClick function for cards
export function handleCardClick({ link, text }) {
  popupImage.open(link, text); 
};




api.initialize().then(res => {
  const [user, data] = res;
  section = new Section({ 
    items: data, 
    renderer: (item) => {
      console.log(item)
      currentId = user._id;
      const element = createCard({text: item.name, imageLink: item.link, likes: item.likes, owner: item.owner._id, _id: item._id, currentId}, "#card-template", handleCardClick, popupConfirmation);
      section.addItem(element);
    }
    },
    ".places"
  );
  section.renderItems();

  userInfo.setUserInfo({userName: user.name, userJob: user.about});
  profilePicture.src = user.avatar;

  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });


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
  profileButton.textContent = "Saving...";
  api.setNewUser(data).then(data => {
    profileButton.textContent = "Save";
    userInfo.setUserInfo({ userName: data.name, userJob: data.about}); 
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
  profileForm.reset();
}

//create handle submit function for adding new places
 function handlePlaceSubmit(data){
  placeButton.textContent = "Saving...";
  api.addCart(data).then((result) => {
    placeButton.textContent = "Create";
    const element = createCard({text: result.name, imageLink: result.link, likes: result.likes, owner: document.querySelector(".profile__name").innerHTML, _id: result._id, currentId}, "#card-template", handleCardClick, popupConfirmation);
    section.addItem(element);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
  placeForm.reset();
};

//create handle submit for new profile picture
function handlePictureSubmit(data){
  pictureButton.textContent = "Saving...";
  api.changePicture(data).then((result) => {
    pictureButton.textContent = "Save";
    profilePicture.src = result.avatar;
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
  pictureForm.reset();
}









