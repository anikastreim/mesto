const showInputError = (formElement, inputElement, errorMessage, item) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(item.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(item.errorClass);
};
  
const hideInputError = (formElement, inputElement, item) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(item.inputErrorClass);
  errorElement.classList.remove(item.errorClass);
  errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, item) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, item);
  } else {
    hideInputError(formElement, inputElement, item);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
  
const toggleButtonState = (inputList, buttonElement, item) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(item.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(item.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, item) => {
  const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, item);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, item);
      toggleButtonState(inputList, buttonElement, item);
    });
  });
};

const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement, item);
  }); 
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
});