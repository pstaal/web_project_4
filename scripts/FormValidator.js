export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }
    
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => { 
    
          return !inputElement.validity.valid; 
    
        }); 
      }

    _showInputError (form, inputElement, errorMessage ) {
        // Find the error message element inside the very function
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        // The rest remains unchanged
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
      }
      
    _hideInputError (form, inputElement ) {
        // Find the error message element
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        // The rest remains unchanged
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
      }

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._settings.inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(this._settings.inactiveButtonClass);
          buttonElement.disabled = false;
        }
      }
    
    _toggleInputError (form, inputElement) {
        if (!inputElement.validity.valid) {
          // The parameter of showInputError() is now a form,
          // which contains a field to be checked
          this._showInputError(form, inputElement, inputElement.validationMessage);
        } else {
          // The same for hideInputError(), Its parameter is now a form,
          // which contains a field to be checked
          this._hideInputError(form, inputElement);
        }
      }

   _setEventListeners(form) {
    form.addEventListener("submit", (evt) => {
        // Cancel default behavior for the form
        evt.preventDefault();
    });
    const inputList = [...form.querySelectorAll(this._settings.inputSelector)];
    const buttonElement = form.querySelector(this._settings.submitButtonSelector);
    
  
    // Iterate over the resulting array
    inputList.forEach((inputElement) => {
      // add the input event handler to each field
      inputElement.addEventListener("input", () => {
        // Call the toggleInputError() function inside the callback,
        // and pass the form and the element to be checked to it
        this._toggleInputError(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

   }

   enableValidation() {
        const form = document.querySelector(this._form);

        this._setEventListeners(form);
  }
}