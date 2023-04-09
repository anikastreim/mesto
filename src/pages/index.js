import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, config, profileName, profileDescription, editButton, addButton, galleryWrapper, templateGallery, editPopup, addPopup, formEdit, formAdd, nameInput, descriptionInput, imagePopup } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
}

const popupImage = new PopupWithImage(imagePopup);
popupImage.setEventListeners();

const createCard = (data)  => {
  const card = new Card(data, templateGallery, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const validatorEditForm = new FormValidator(config, formEdit);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(config, formAdd);
validatorAddForm.enableValidation();

const userInfo = new UserInfo({ userName: profileName, userDescription: profileDescription });

const popupEditProfile = new PopupWithForm(editPopup, 
  (data) => {
    userInfo.setUserInfo(data.name, data.description);
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(addPopup, 
  ({ name, link }) => {
    galleryList.addItem(createCard({ name, link }));
    popupAddImage.close();
  }
);
popupAddImage.setEventListeners();

editButton.addEventListener("click", () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  descriptionInput.value = data.description;
  validatorEditForm.resetValidation();
});

addButton.addEventListener("click", () => {
  popupAddImage.open();
  validatorAddForm.resetValidation();
});

const galleryList = new Section({
  items: initialCards,
  renderer: (card) => {
    galleryList.addItem(createCard(card));
  },
},
  galleryWrapper
);
galleryList.renderItems();
