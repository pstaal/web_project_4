import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    open(imageLink, imageName){
        const popupImage = document.querySelector('.popup-picture__image');
        const popupImageTitle = document.querySelector('.popup-picture__title');
        popupImage.setAttribute('src', imageLink);
        popupImage.setAttribute('alt', imageName);    
        popupImageTitle.textContent = imageName;
        this._popup.classList.add('popup_opened');
    } 

}