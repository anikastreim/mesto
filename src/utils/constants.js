const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active"
};

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const templateGallery = document.querySelector(".template-gallery").content.querySelector(".gallery");
const editPopup = document.querySelector(".popup_type_edit")
const addPopup = document.querySelector(".popup_type_add");
const avatarPopup = document.querySelector(".popup_type_update");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const formUpdate = document.querySelector(".popup__form_type_update"); 
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const imagePopup = document.querySelector(".popup-image");
const deletePopup = document.querySelector(".popup_type_delete");

export { config, deletePopup, profileName, profileDescription, profileAvatar, editButton, addButton, avatarPopup, galleryWrapper, templateGallery, editPopup, addPopup, formEdit, formAdd, formUpdate, nameInput, descriptionInput, imagePopup };