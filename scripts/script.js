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

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();
    
    let newName = document.querySelector("[name='name']").value;
    let newExpertise = document.querySelector("[name='function']").value;

    profileName.textContent = newName;
    profileFunction.textContent = newExpertise;

    //close popup
    closePopup();

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
     bodyPage.append(newPopup);
     return;
    } else if (evt.target === editButton) {
    newPopup.querySelector('.popup__title').textContent = "Edit Profile";
    newPopup.querySelector('.popup__button').textContent ="Save";
    let inputs = newPopup.querySelectorAll('.popup__input');
    inputs[0].setAttribute('name', 'name');
    inputs[0].value = profileName.textContent;
    inputs[1].setAttribute('name', 'function');
    inputs[1].value = profileFunction.textContent;
    newPopup.querySelector('.popup__form').addEventListener('submit', handleProfileFormSubmit);
    bodyPage.append(newPopup);
    return;
    }
    return;
};

//add event listener to the new place button
newPlaceButton.addEventListener('click', openPopup);

//add event listener to the profile change button
editButton.addEventListener('click', openPopup);


