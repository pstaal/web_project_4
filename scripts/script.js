let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileFunction = document.querySelector('.profile__function');
let cardContainer = document.querySelector('.places');
let newPlaceButton = document.querySelector('.profile__button-add-place');
let bodyPage = document.querySelector('.page');


//initial cards 
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


function closePopup(){
    document.querySelector('.popup').remove();
}

function editProfile(evt) {
    
    evt.preventDefault();
    
    let newName = document.querySelector("[name='name']").value;
    let newExpertise = document.querySelector("[name='function']").value;

    profileName.textContent = newName;
    profileFunction.textContent = newExpertise;

    //close popup
    closePopup();

}

function addPlace(evt) {

    evt.preventDefault();

    let placeTitle = document.querySelector("[name='title']").value;
    let placeURL = document.querySelector("[name='link']").value;

    let newCard = createCard({link: placeURL, name: placeTitle});
    cardContainer.prepend(newCard);

     //close popup
    closePopup();
}


function toggleHeart(evt){
    evt.target.classList.toggle('places__card-button-liked');
}

function removeCard(evt){
    evt.target.parentElement.remove();
}

function closePicture(evt) {
    evt.target.parentElement.parentElement.remove();
}

function openPicture(evt){
    let imageLink = evt.target.src;
    let imageName = evt.target.alt;
    const pictureTemplate = document.querySelector('#popup-picture-template').content;
    const newPicture = pictureTemplate.querySelector('.popup-picture').cloneNode(true);
    newPicture.querySelector('.popup-picture__image').setAttribute('src', imageLink);
    newPicture.querySelector('.popup-picture__image').setAttribute('alt', imageName);
    newPicture.querySelector('.popup-picture__title').textContent = imageName;
    newPicture.querySelector('.popup-picture__button').addEventListener('click', closePicture);
    bodyPage.append(newPicture);
}

const openPopup = (evt) => {
    const popupTemplate = document.querySelector('#popup-template').content;
    const newPopup = popupTemplate.querySelector('.popup').cloneNode(true);
    newPopup.querySelector('.popup__close').addEventListener('click', closePopup);
  
 if (evt.target === newPlaceButton) {
     newPopup.querySelector('.popup__title').textContent = "New Place";
     newPopup.querySelector('.popup__button').textContent ="Create";
     let inputs = newPopup.querySelectorAll('.popup__input');
     inputs[0].setAttribute('name', 'title');
     inputs[0].setAttribute('placeholder', 'Title');
     inputs[1].setAttribute('name', 'link');
     inputs[1].setAttribute('placeholder', 'Image URL');
     newPopup.querySelector('.popup__form').addEventListener('submit', addPlace);
     bodyPage.append(newPopup);
    } else if (evt.target === editButton) {
    newPopup.querySelector('.popup__title').textContent = "Edit Profile";
    newPopup.querySelector('.popup__button').textContent ="Save";
    let inputs = newPopup.querySelectorAll('.popup__input');
    inputs[0].setAttribute('name', 'name');
    inputs[0].value = profileName.textContent;
    inputs[1].setAttribute('name', 'function');
    inputs[1].value = profileFunction.textContent;
    newPopup.querySelector('.popup__form').addEventListener('submit', editProfile);
    bodyPage.append(newPopup);
    }
};

//add event listener to the new place button
newPlaceButton.addEventListener('click', openPopup);

//add event listener to the profile change button
editButton.addEventListener('click', openPopup);



