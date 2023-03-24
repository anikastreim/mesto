import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, config } from "./constants.js";

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const templateGallery = document.querySelector(".template-gallery").content.querySelector(".gallery");;
const editPopup = document.querySelector(".popup_type_edit")
const addPopup = document.querySelector(".popup_type_add");
const closeButtons = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add")
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");

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

export const openPopup = (popup) => {
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

const createCard = (data)  => {
  const card = new Card(data, templateGallery);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((data) => {
  galleryWrapper.append(createCard(data));
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
  validatorAddForm.toggleButtonState();
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