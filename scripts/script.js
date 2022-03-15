import { resetValidation }  from "./validate.js";

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const popupForPlace = document.querySelector('.popup-picture');
const editButton = document.querySelector('.profile__button-name-change');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close');
const popupPictureCloseButton = popupForPlace.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileFunction = document.querySelector('.profile__function');
const cardContainer = document.querySelector('.places');
const newPlaceButton = document.querySelector('.profile__button-add-place');
const bodyPage = document.querySelector('.page');
const popupImage = document.querySelector('.popup-picture__image');
const popupImageTitle = document.querySelector('.popup-picture__title');
const popupTitle = document.querySelector('.popup__title');
const popupButton = document.querySelector('.popup__button');
const popupInputs = document.querySelectorAll('.popup__input');
const popupFormProfile = document.querySelector('.popup__form-profile');
const popupFormPlace = document.querySelector('.popup__form-place');
const nameInput = document.querySelector("[name='name']");
const titleInput = document.querySelector("[name='function']");
const placeTitleInput = document.querySelector("[name='title']");
const placeUrlInput = document.querySelector("[name='link']");


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

//create a card function 
function createCard(data) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
    const cardImage = cardElement.querySelector('.places__card-image');
    cardImage.setAttribute("src", data.link);
    cardElement.querySelector('.places__card-title').textContent = data.name;
    cardImage.setAttribute("alt", data.name);
    //add event listener for likes
    cardElement.querySelector('.places__card-button').addEventListener('click', toggleHeart);
    //add event listener to remove card
    cardElement.querySelector('.places__card-delete-icon').addEventListener('click', removeCard);
    //add event listener to open picture
    cardImage.addEventListener('click', openPicturePopup);
    return cardElement;
  } 

//put all initial cards into the DOM
initialCards.forEach((card) => {
    const newCard = createCard(card);
    cardContainer.append(newCard);
});

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

    const newCard = createCard({link: placeURL, name: placeTitle});
    cardContainer.prepend(newCard);

    // reset form
    popupFormPlace.reset();

     //close modal
    closeModal(popupPlace);
}


//add event listeners to submit the form for profile
popupFormProfile.addEventListener('submit', editProfile);

//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', openPlaceForm);

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);

//add event listener to submit the form for the new place card
popupFormPlace.addEventListener('submit', addPlace);

// add eventlisteners to the three modals
popupPictureCloseButton.addEventListener('click', function() {closeModal(popupForPlace)});
popupPlaceCloseButton.addEventListener('click', function() {closeModal(popupPlace)});
popupProfileCloseButton.addEventListener('click', function() {closeModal(popupProfile)});


function exitModalEscape(evt){
  if (evt.key ==="Escape") {
    closeModal(document.querySelector(".popup_opened"));
  }

}

function exitModalClick(evt){
  console.log(evt.target);
  if (evt.target.classList.contains('popup') && document.querySelector(".popup_opened")) {
    closeModal(document.querySelector(".popup_opened"));
  }
}

function toggleHeart(evt){
    evt.target.classList.toggle('places__card-button-liked');
}

function removeCard(evt){
    evt.target.parentElement.remove();
}

function openModal(element){
   element.classList.add('popup_opened');
   document.addEventListener("keydown", exitModalEscape);
   document.addEventListener("click", exitModalClick);
}

function closeModal(element){
  element.classList.remove('popup_opened');
  document.removeEventListener("keydown", exitModalEscape);
  document.removeEventListener("mousedown", exitModalClick);
}



function openPicturePopup (evt){
    const imageLink = evt.target.src;
    const imageName = evt.target.alt;
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', imageName);    
    popupImageTitle.textContent = imageName;
    openModal(popupForPlace);
}

function disableButton(element){
  const button = element.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.disabled = true;
}


function openProfilePopup () {
    resetValidation(popupProfile);  
    disableButton(popupProfile);
    nameInput.value = profileName.textContent;
    titleInput.value = profileFunction.textContent;
    openModal(popupProfile); 
}

function openPlaceForm () {
  resetValidation(popupPlace);
  disableButton(popupPlace);
  openModal(popupPlace);
}




