import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__save");
    this._submitButtonText = this._submitButton.textContent;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._card, this._cardId);
    });
  }
}