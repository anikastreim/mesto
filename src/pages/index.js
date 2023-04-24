import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config, formUpdate, profileName, profileDescription, profileAvatar, editButton, addButton, avatarPopup, galleryWrapper, templateGallery, editPopup, addPopup, formEdit, formAdd, nameInput, descriptionInput, imagePopup } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from "../components/PopupDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "3588b988-43cb-4f1c-aad4-f506556db71e",
    "Content-Type": "application/json"
  }
});

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

const validatorUpdateForm = new FormValidator(config, formUpdate);
validatorUpdateForm.enableValidation();

const userInfo = new UserInfo({ userName: profileName, userDescription: profileDescription, userAvatar: profileAvatar });

const popupEditProfile = new PopupWithForm(editPopup, 
  (data) => {
    popupEditProfile.renderLoading(true);
    api
      .updateProfileInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      });
  }
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(addPopup, 
  (data) => {
    popupAddImage.renderLoading(true);
    api
      .addNewCard(data)
      .then((data) => {
        galleryList.addItem(createCard(data));
        popupAddImage.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddImage.renderLoading(false);
      });
  }
);
popupAddImage.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(avatarPopup, 
  (avatar) => {
    popupUpdateAvatar.renderLoading(true);
    api
      .updateAvatar(avatar)
      .then((avatar) => {
        userInfo.setUserAvatar(avatar);
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false);
      });
  }
);
popupUpdateAvatar.setEventListeners();

editButton.addEventListener("click", () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  descriptionInput.value = data.about;
  validatorEditForm.resetValidation();
});

addButton.addEventListener("click", () => {
  popupAddImage.open();
  validatorAddForm.resetValidation();
});

profileAvatar.addEventListener("click", () => {
  popupUpdateAvatar.open();
  validatorUpdateForm.resetValidation();
});

const galleryList = new Section({
  renderer: (cards) => {
    galleryList.addItem(createCard(cards));
  },
},
  galleryWrapper
);

let userId;
Promise.all([
  api.getInitialUserInfo(),
  api.getInitialCards()
])
    .then(([ profileData, cards ]) => {
      userInfo.setUserInfo(profileData);
      userInfo.setUserAvatar(profileData); 
      userId = profileData._id;
      galleryList.renderItems(cards.reverse());
    })
    .catch((err) => {
      console.log(err);
    });