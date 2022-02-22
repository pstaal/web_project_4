let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileFunction = document.querySelector('.profile__function');
let cardContainer = document.querySelector('.places');
let newPlaceButton = document.querySelector('.profile__button-add-place');
let bodyPage = document.querySelector('.page');
let popupForPlace = document.querySelector('.popup-picture');
let popupImage = document.querySelector('.popup-picture__image');
let popupImageTitle = document.querySelector('.popup-picture__title');
let popupPictureCloseButton = document.querySelector('.popup-picture__button');
let popupTitle = document.querySelector('.popup__title');
let popupButton = document.querySelector('.popup__button');
let popupInputs = document.querySelectorAll('.popup__input');
let popupForm = document.querySelector('.popup__form');

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
    cardElement.querySelector('.places__card-image').setAttribute("src", data.link);
    cardElement.querySelector('.places__card-title').textContent = data.name;
    cardElement.querySelector('.places__card-image').setAttribute("alt", data.name);
    //add event listener for likes
    cardElement.querySelector('.places__card-button').addEventListener('click', toggleHeart);
    //add event listener to remove card
    cardElement.querySelector('.places__card-delete-icon').addEventListener('click', removeCard);
    //add event listener to open picture
    cardElement.querySelector('.places__card-image').addEventListener('click', openPicture);
    return cardElement;
  } 

//put all initial cards into the DOM
initialCards.forEach((card) => {
    let newCard = createCard(card);
    cardContainer.append(newCard);
});

//change the profile name and function
function editProfile(evt) {
    
    evt.preventDefault();
    
    let newName = document.querySelector("[name='name']").value;
    let newExpertise = document.querySelector("[name='function']").value;

    profileName.textContent = newName;
    profileFunction.textContent = newExpertise;

    //close modal
    closeFormModal();
}


//add a new place to the list
function addPlace(evt) {

    evt.preventDefault();

    let placeTitle = document.querySelector("[name='title']").value;
    let placeURL = document.querySelector("[name='link']").value;

    let newCard = createCard({link: placeURL, name: placeTitle});
    cardContainer.prepend(newCard);

     //close modal
    closeFormModal();
}


function toggleHeart(evt){
    evt.target.classList.toggle('places__card-button-liked');
}

function removeCard(evt){
    evt.target.parentElement.remove();
}

function closePictureModal() {
  popupForPlace.classList.remove('popup-picture_opened');
}

function openPictureModal(){
   popupForPlace.classList.add('popup-picture_opened');
}

function closeFormModal() {
  popupInputs[0].value = "";
  popupInputs[1].value = "";
  popup.classList.remove('popup_opened');
}

function openFormModal(evt){
   popup.classList.add('popup_opened');
}


function openPicture(evt){
    let imageLink = evt.target.src;
    let imageName = evt.target.alt;
    
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', imageName);
    popupPictureCloseButton.addEventListener('click', closePictureModal);
    popupImageTitle.textContent = imageName;
    
    openPictureModal();
}

function openPlacePopup () { 
     closeButton.addEventListener('click', closeFormModal);
     popupTitle.textContent = "New Place";
     popupButton.textContent ="Create";
     popupInputs[0].setAttribute('name', 'title');
     popupInputs[0].setAttribute('placeholder', 'Title');
     popupInputs[1].setAttribute('name', 'link');
     popupInputs[1].setAttribute('placeholder', 'Image URL');
     popupForm.addEventListener('submit', addPlace);
     openFormModal();
}


function openProfilePopup () {
    closeButton.addEventListener('click', closeFormModal);
    popupTitle.textContent = "Edit Profile";
    popupButton.textContent ="Save";
    popupInputs[0].setAttribute('name', 'name');
    popupInputs[0].value = profileName.textContent;
    popupInputs[1].setAttribute('name', 'function');
    popupInputs[1].value = profileFunction.textContent;
    popupForm.addEventListener('submit', editProfile);
    openFormModal(); 
};

//add event listener to the new place button
newPlaceButton.addEventListener('click', openPlacePopup);

//add event listener to the profile change button
editButton.addEventListener('click', openProfilePopup);



