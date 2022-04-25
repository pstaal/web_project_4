import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, handleClick) {
        super(popupSelector);
        this._handleClick = handleClick;
        this._button = this._popup.querySelector('.popup__button');
    }
    
    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._handleClick(this._card);
            this.close();
        });
    }


}