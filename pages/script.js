let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');

function openModal(){
    popup.classList.add('popup__opened');
}

function closeModal(){
    popup.classList.remove('popup__opened');
}

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

//set values of textinputs
let formInputs = document.querySelectorAll('.popup__input');
let nameInput = formInputs[0];
let expertiseInput = formInputs[1];
let nameValue = document.querySelector('.profile__name').textContent;
let expertiseValue = document.querySelector('.profile__function').textContent;

nameInput.value = nameValue;
expertiseInput.value = expertiseValue;

//change the name and function in the DOM
let formElement = document.querySelector('.popup__form'); 

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();
    
    let newName = nameInput.value;
    let newExpertise = expertiseInput.value;

    document.querySelector('.profile__name').textContent = newName;
    document.querySelector('.profile__function').textContent = newExpertise;

    //close modal
    popup.classList.remove('popup__opened');

}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit); 