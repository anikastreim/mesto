import { Card } from './Card.js';
import { FormValidator, config } from './FormValidator.js';
import { initialCards } from './constants.js';

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const templateGallery = document.querySelector(".template-gallery").content.querySelector(".gallery");;
const editPopup = document.querySelector(".popup_type_edit")
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup-image");
const closeButtons = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add")
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup-image__image");
const popupCaption = document.querySelector(".popup-image__caption");
const saveButtonAdd = document.querySelector(".popup__save_type_add");

const keyHandler = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
})

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
};

closeButtons.forEach((cross) => {
  cross.addEventListener("click", () => closePopup(cross.closest(".popup")));
});

export const openImagePopup = (evt) => {
  popupCaption.textContent = evt.name;
  popupImage.src = evt.link;
  popupImage.alt = evt.name;
  openPopup(imagePopup);
}

const createCard = (item)  => {
  const card = new Card(item, templateGallery, openImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  galleryWrapper.append(createCard(item));
});

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
  saveButtonAdd.classList.add("popup__save_disabled");
  saveButtonAdd.setAttribute("disabled", true);
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  galleryWrapper.prepend(createCard({name: titleInput.value, link: linkInput.value}));
  evt.target.reset();
  closePopup(addPopup);
});

const validatorEditForm = new FormValidator(config, formEdit);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(config, formAdd);
validatorAddForm.enableValidation();