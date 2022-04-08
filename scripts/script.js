import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { closeModal, openModal } from "./utils.js";
import Section from "./Section.js";

import { initialCards } from "./constants.js";


const section = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card({text: item.name, imageLink: item.link}, "#card-template", () => {

    });
    const element = card.generateCard();
    this.addItem(element);
  }
  },
  ".places"
);


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

//change the profile name and function
function editProfile(evt) {
    
  evt.preventDefault();
  
  const newName = nameInput.value;
  const newExpertise = titleInput.value;

  profileName.textContent = newName;
  profileFunction.textContent = newExpertise;

   // reset form
   popupFormProfile.reset();

  //close modal
  closeModal(popupProfile);
}


//add a new place to the list
function addPlace(evt) {

  evt.preventDefault();

  const placeTitle = placeTitleInput.value;
  const placeURL = placeUrlInput.value;

  const newCard = renderCard({text: placeTitle, imageLink: placeURL}, "#card-template");
  cardContainer.prepend(newCard);

  // reset form
  popupFormPlace.reset();

   //close modal
  closeModal(popupPlace);
}


