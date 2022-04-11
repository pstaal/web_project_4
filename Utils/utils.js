
import { nameInput, titleInput, popupProfileSelector, popupPlaceSelector } from "./constants.js";

//create handleCardClick function for cards
export function handleCardClick(evt) {
 const imageLink = evt.target.src;
 const imageName = evt.target.alt;
 popupImage.open(imageLink, imageName); 
};

//create handle submit function for adding new places
export function handlePlaceSubmit(data){
  const placeTitle = data.title;
  const placeURL = data.link;

  const card = new Card({text: placeTitle, imageLink: placeURL}, "#card-template", handleCardClick);
  const element = card.generateCard();
  section.addItem(element);
};

//create handle submit function for changing profile
export function handleProfileSubmit(data) {
  userInfo.setUserInfo(data);
}

//function to open profile
export function openProfilePopup () {
  profileValidator.resetValidation(popupProfileSelector);  
  const data = userInfo.getUserInfo();
  nameInput.value = data.userName;
  titleInput.value = data.userJob;
  popupProfile.open();
}

//function to open place form
export function openPlaceForm () {
  placeValidator.resetValidation(popupPlaceSelector);
  popupPlace.open();
}