import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
constructor(popupSelector, deleteHandler) {
    super(popupSelector);
    this._deleteHandler = deleteHandler;
  }

  open(card, cardId) {
    super.open();
    this.cardId = cardId;
    this.card = card;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteHandler();
    });
  }

  close() {
    super.close();
  }
}