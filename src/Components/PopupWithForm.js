import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        // Get all field elements
        this._inputList = this._popup.querySelectorAll(".popup__input");

        // Create an empty object
        this._formValues = {};

        // Add the values of the fields to this object
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // Return the values object
        return this._formValues;
    } 

    close() {
        this._popup.querySelector('.popup__form').reset();
        this._popup.classList.remove('popup_opened');
    }


    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });

        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });

        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("click", (evt) => {
            if (evt.target.classList.contains('popup') && document.querySelector(".popup_opened")) {
                this.close();
              }
        });

    }
    

};