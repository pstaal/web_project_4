import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor() {
        this._popupImage = document.querySelector('.popup-picture__image');
        this._popupImageTitle = document.querySelector('.popup-picture__title');
    }

    open(imageLink, imageName){
        this._popupImage.setAttribute('src', imageLink);
        this._popupImage.setAttribute('alt', imageName);    
        this._popupImageTitle.textContent = imageName;
        super.open();
    } 

}