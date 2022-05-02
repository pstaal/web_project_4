import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button');
        this._submitButtonText = this._submitButton.textContent;
    }

    renderLoading(isLoading, loadingText='Saving...') {
        if (isLoading) {
          this._submitButton.textContent = loadingText;
        } else {
          this._submitButton.textContent = this._submitButtonText;
        }
    }

    _getInputValues() {
        

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
        super.close();
        this._form.reset();
    }


    setEventListeners() {

        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });

    }
    

};