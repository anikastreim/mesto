import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
constructor(popupSelector, deleteHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._deleteHandler = deleteHandler;
  }

  open(card) {
    super.open();
    this.card = card;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteHandler(this.cardId);
    });
  }

  close() {
    super.close();
  }
}