let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');
let nameInput = document.querySelector("[name='name']");
let expertiseInput = document.querySelector("[name='function']");
let profileName = document.querySelector('.profile__name');
let profileFunction = document.querySelector('.profile__function');
let cardContainer = document.querySelector('.places');


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

initialCards.forEach((card) => {
    let newCard = createCard(card);
    cardContainer.append(newCard);
});

function openModal(){
    //set values of textinputs
    nameInput.value = profileName.textContent;
    expertiseInput.value = profileFunction.textContent;
    popup.classList.add('popup_opened');
}

function closeModal(){
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);





//change the name and function in the DOM
let formElement = document.querySelector('.popup__form'); 

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();
    
    let newName = nameInput.value;
    let newExpertise = expertiseInput.value;

    profileName.textContent = newName;
    profileFunction.textContent = newExpertise;

    //close modal
    closeModal();

}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); 

