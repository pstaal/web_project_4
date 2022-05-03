import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import Card from "../components/Card";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupConfirmation from "../components/PopupConfirmation";
import PopupWithImage from "../components/PopupWithImage";
import { validationSettings, profilePicture, profileButton, placeButton, pictureButton, newPlaceButton, editButton, nameInput, titleInput, popupProfileSelector, popupPlaceSelector, profileForm, placeForm, pictureForm, profilePictureButton, popupPictureSelector } from "../utils/constants.js";
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

//instantiate popup confirmation class
const popupConfirmation = new PopupConfirmation(".popup-confirm", handleClick);
popupConfirmation.setEventListeners();

//handleclick function for deleting card
function handleClick(card) {
  api.deleteCard(card.id).then(res => {
    popupConfirmation.close();
    card.removeCard();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}

//toggleLike function
function toggleLike() {
  let isLiked = this._element.querySelector(".places__card-button").classList.contains("places__card-button-liked");
  this._heartIcon.classList.toggle('places__card-button-liked');
  api.toggleLike(this.id, isLiked).then((result) => {
      this._likeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
}


//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");
popupImage.setEventListeners();

//instantiate user info class
export const userInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__function', pictureSelector: '.profile__picture'});


//function to create a new card
function createCard(data, template, callback, popupConfirmation, toggleLike) {
    const card = new Card(data, template, callback, popupConfirmation, toggleLike);
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
      currentId = user._id;
      const element = createCard({text: item.name, imageLink: item.link, likes: item.likes, owner: item.owner._id, _id: item._id, currentId}, "#card-template", handleCardClick, popupConfirmation, toggleLike);
      section.addItem(element);
    }
    },
    ".places"
  );
  section.renderItems();

  userInfo.setUserInfo({userName: user.name, userJob: user.about, userAvatar: user.avatar});

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
const profileValidator = new FormValidator( validationSettings, ".popup__form-profile");

profileValidator.enableValidation();

const placeValidator = new FormValidator( validationSettings, ".popup__form-place");

placeValidator.enableValidation();

const pictureValidator = new FormValidator( validationSettings, ".popup__form-profile-picture");

pictureValidator.enableValidation();

//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', openPlaceForm);

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);

//add event listener to open the form to change the profile picture
profilePictureButton.addEventListener('click', openProfilePicture);

//function to open form for picture change
function openProfilePicture () {
  popupProfilePicture.open();
}

//function to open profile
function openProfilePopup () {
  const { userName, userJob } = userInfo.getUserInfo();
  nameInput.value = userName;
  titleInput.value = userJob;
  popupProfile.open();
}

//function to open place form
function openPlaceForm () {
  popupPlace.open();
}

//create handle submit function for changing profile
function handleProfileSubmit(data) {
  popupProfile.renderLoading(true);
  api.setNewUser(data).then(data => {
    userInfo.setUserInfo({ userName: data.name, userJob: data.about, userAvatar: data.avatar}); 
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  })
  .finally(() => {
    popupProfile.renderLoading(false);
  });
}

//create handle submit function for adding new places
 function handlePlaceSubmit(data){
  popupPlace.renderLoading(true);
  api.addCart(data).then((result) => {
    const element = createCard({text: result.name, imageLink: result.link, likes: result.likes, owner: currentId, _id: result._id, currentId}, "#card-template", handleCardClick, popupConfirmation, toggleLike);
    section.addItem(element);
    popupPlace.close();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  })
  .finally(() => {
    popupPlace.renderLoading(false);
  });
}

//create handle submit for new profile picture
function handlePictureSubmit(data){
  popupProfilePicture.renderLoading(true);
  api.changePicture(data).then((result) => {
    userInfo.setUserInfo({userName: result.name, userJob: result.about, userAvatar: result.avatar});
    popupProfilePicture.close();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  })
  .finally(() => {
    popupProfilePicture.renderLoading(false);
  });
}









