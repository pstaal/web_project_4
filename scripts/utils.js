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

export { openModal, closeModal };
