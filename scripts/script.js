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
    cardElement.querySelector('.places__card-image').addEventListener('click', openPicturePopup);
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
    closeModal(popupProfile);
}


//add a new place to the list
function addPlace(evt) {

    evt.preventDefault();

    let placeTitle = document.querySelector("[name='title']").value;
    let placeURL = document.querySelector("[name='link']").value;

    let newCard = createCard({link: placeURL, name: placeTitle});
    cardContainer.prepend(newCard);

     //close modal
    closeModal(popupPlace);
}


//add event listeners to submit the form for profile
popupFormProfile.addEventListener('submit', editProfile);

//add event listener to open the form for a new place card
newPlaceButton.addEventListener('click', function(){openModal(popupPlace)});

//add event listener to open the form for the profile
editButton.addEventListener('click', openProfilePopup);

//add event listener to submit the form for the new place card
popupFormPlace.addEventListener('submit', addPlace);

// add eventlisteners to the three modals
popupPictureCloseButton.addEventListener('click', function() {closeModal(popupForPlace)});
popupPlaceCloseButton.addEventListener('click', function() {closeModal(popupPlace)});
popupProfileCloseButton.addEventListener('click', function() {closeModal(popupProfile)});



function toggleHeart(evt){
    evt.target.classList.toggle('places__card-button-liked');
}

function removeCard(evt){
    evt.target.parentElement.remove();
}

function openModal(element){
   element.classList.add('popup_opened');
}

function closeModal(element){
  element.classList.remove('popup_opened');
}



function openPicturePopup (evt){
    let imageLink = evt.target.src;
    let imageName = evt.target.alt;
    
    popupImage.setAttribute('src', imageLink);
    popupImage.setAttribute('alt', imageName);    
    popupImageTitle.textContent = imageName;
    
    openModal(popupForPlace);
}


function openProfilePopup () {
    
    popupInputs[0].value = profileName.textContent;
    popupInputs[1].value = profileFunction.textContent;
    openModal(popupProfile); 
};





