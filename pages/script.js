let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-name-change');
let closeButton = document.querySelector('.popup__close');

function openModal(){
    popup.classList.add('popup__open');
}

function closeModal(){
    popup.classList.remove('popup__open');
}

editButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);