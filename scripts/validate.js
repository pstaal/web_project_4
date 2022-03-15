 const showInputError = (formElement, inputElement, errorMessage, settings) => {
    // Find the error message element inside the very function
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // The rest remains unchanged
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    // Find the error message element
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // The rest remains unchanged
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }; 

  const hasInvalidInput = (inputList) => {
    inputList.some((input) => !input.validity.valid);
  };

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  const toggleInputError = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      // The parameter of showInputError() is now a form,
      // which contains a field to be checked
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      // The same for hideInputError(), Its parameter is now a form,
      // which contains a field to be checked
      hideInputError(formElement, inputElement, settings);
    }
  }; 

  const setEventListeners = (formElement, settings) => {
    // Find all fields inside the form, and
    // make an array from them using the Array.from() method
    const inputList = [...formElement.querySelectorAll(settings.inputSelector)];
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    
  
    // Iterate over the resulting array
    inputList.forEach((inputElement) => {
      // add the input event handler to each field
      inputElement.addEventListener("input", () => {
        // Call the toggleInputError() function inside the callback,
        // and pass the form and the element to be checked to it
        toggleInputError(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }; 


  const enableValidation = (settings) => {
    // It will find all forms with the specified class in DOM, and
    // make an array from them using the Array.from() method
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    // Iterate over the resulting array
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        // Cancel default behavior for each form
        evt.preventDefault();
      });
  
      // Call the setEventListeners() function for each form,
      // taking a form element as an argument
      setEventListeners(formElement, settings);
    });
  };

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }); 

  export function resetValidation (popup){
    const inputElements = Array.from(popup.querySelectorAll(".popup__input"));
    const form = popup.querySelector(".popup__form");
    inputElements.forEach((inputElement) => {
        hideInputError(form, inputElement, {inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"});
    });
  };

