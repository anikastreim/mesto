import { imagePopup, popupImage, popupCaption } from "./constants.js";
import { openPopup } from "./index.js";

export class Card {
  constructor(data, templateGallery) {
    this.name = data.name;
    this.link = data.link;
    this._templateGallery = templateGallery;
  };

  _getTemplate() {
    const galleryElement = this._templateGallery.cloneNode(true);
    return galleryElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._galleryName = this._element.querySelector(".gallery__caption");
    this._galleryImage = this._element.querySelector(".gallery__image");
    this._galleryName.textContent = this.name;
    this._galleryImage.src = this.link;
    this._galleryImage.alt = this.name;
    this._deleteButton = this._element.querySelector(".gallery__bin");
    this._likeButton = this._element.querySelector(".gallery__like");
    this._setEventListeners();
    return this._element;
  };

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleLike = () => {
    this._likeButton.classList.toggle("gallery__like_active");
  };

  _openImagePopup = () => {
    popupCaption.textContent = this.name;
    popupImage.src = this.link;
    popupImage.alt = this.name;
    openPopup(imagePopup);
  }
  
  _setEventListeners = () => {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });    
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
    this._galleryImage.addEventListener("click", () => {
      this._openImagePopup(); 
    });
  }
}