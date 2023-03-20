import { FormValidator } from './validate.js';

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const template = document.querySelector(".template-gallery").content;
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

const validatorEditForm = new FormValidator(config, formEdit);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(config, formAdd);
validatorAddForm.enableValidation();

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

const createCard = (element) => {
    const galleryElements = template.querySelector(".gallery").cloneNode(true);
    const galleryName = galleryElements.querySelector(".gallery__caption");
    const galleryImage = galleryElements.querySelector(".gallery__image");
    galleryName.textContent = element.name;
    galleryImage.src = element.link;
    galleryImage.alt = element.name;
    const deleteButton = galleryElements.querySelector(".gallery__bin");
    deleteButton.addEventListener("click", () => {
      galleryElements.remove();
    });
    const likeButton = galleryElements.querySelector(".gallery__like");
    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("gallery__like_active");
    });    
    galleryImage.addEventListener("click", () => {
      popupCaption.textContent = element.name;
      popupImage.src = element.link;
      popupImage.alt = element.name;
      openPopup(imagePopup);
    });
    return galleryElements;
};

initialCards.forEach((element) => {
  galleryWrapper.append(createCard(element));
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
  const newCard = createCard({name: titleInput.value, link: linkInput.value});
  galleryWrapper.prepend(newCard);
  evt.target.reset();
  closePopup(addPopup);
});