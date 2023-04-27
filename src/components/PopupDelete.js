import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  open(card, cardId) {
    super.open();
    this.card = card;
    this.cardId = cardId;
  }

  setCallback(callbackSubmitForm) {
    this._callbackSubmitForm = callbackSubmitForm;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm();
    });
  }

  close() {
    super.close();
  }
}