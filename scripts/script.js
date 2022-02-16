let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');
let nameInput = document.querySelector("[name='name']");
let expertiseInput = document.querySelector("[name='function']");
let profileName = document.querySelector('.profile__name');
let profileFunction = document.querySelector('.profile__function');


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

