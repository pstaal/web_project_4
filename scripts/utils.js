const popupProfile = document.querySelector('.popup-profile');
const popupPlace = document.querySelector('.popup-place');
const profileName = document.querySelector('.profile__name');
const profileFunction = document.querySelector('.profile__function');
const popupFormProfile = document.querySelector('.popup__form-profile');
const popupFormPlace = document.querySelector('.popup__form-place');
const cardContainer = document.querySelector('.places');

function exitModalEscape(evt){
    if (evt.key ==="Escape") {
      closeModal(document.querySelector(".popup_opened"));
    }
  }

  
function exitModalClick(evt){
    if (evt.target.classList.contains('popup') && document.querySelector(".popup_opened")) {
      closeModal(document.querySelector(".popup_opened"));
    }
  }




// open modal

function openModal(element){
    element.classList.add('popup_opened');
    document.addEventListener("keydown", exitModalEscape);
    document.addEventListener("click", exitModalClick);
 }

// close modal

function closeModal(element){
    element.classList.remove('popup_opened');
    document.removeEventListener("keydown", exitModalEscape);
    document.removeEventListener("click", exitModalClick);
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

    const newCard = new Card({text: placeTitle, imageLink: placeURL}, "#card-template").generateCard();
    cardContainer.prepend(newCard);

    // reset form
    popupFormPlace.reset();

     //close modal
    closeModal(popupPlace);
}

function openProfilePopup () {
    resetValidation(popupProfile);  
    nameInput.value = profileName.textContent;
    titleInput.value = profileFunction.textContent;
    openModal(popupProfile); 
  }
  
  function openPlaceForm () {
  resetValidation(popupPlace);
  openModal(popupPlace);
  }

export { openModal, closeModal, editProfile, addPlace, openProfilePopup, openPlaceForm };
