export default class Card {
  constructor({ data, templateGallery, handleCardClick, handleLikeButtonClick, handleDeleteButtonClick, userId }) {
    this.likes = data.likes;
    this.name = data.name;
    this.link = data.link;
    this._templateGallery = templateGallery;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._ownerId = data.owner._id;
    this.id = data._id;
    this._userId = userId;
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
    this._counter = this._element.querySelector(".gallery__counter");
    
    this.renderLikes();

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
    
    this._setEventListeners();
    return this._element;
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  renderLikes() {
    this._counter.textContent = this.likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("gallery__like_active");
    }
    else {
      this._likeButton.classList.remove("gallery__like_active");
    }
  }

  isLiked() {
    return this.likes.some(like => like._id === this._userId);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });    
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}