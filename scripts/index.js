const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const template = document.getElementById("gallery");
const popup = document.querySelector(".popup");
const editPopup = document.querySelector(".popup_type_edit")
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup-image");
const closeButton = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add")
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup-image__image");
const popupCaption = document.querySelector(".popup-image__caption")

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

closeButton.forEach((cross) => {
  cross.addEventListener("click", () => closePopup(cross.closest(".popup")));
});

const createCard = (element) => {
    const galleryElements = template.content.cloneNode(true);
    const galleryName = galleryElements.querySelector(".gallery__caption");
    const galleryImage = galleryElements.querySelector(".gallery__image");
    galleryName.textContent = element.name;
    galleryImage.src = element.link;
    galleryImage.alt = element.name;
    const deleteButton = galleryElements.querySelector(".gallery__bin");
    deleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".gallery").remove();
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
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newImage = createCard({name: titleInput.value, link: linkInput.value});
  galleryWrapper.prepend(newImage);
  evt.target.reset();
  closePopup(addPopup);
});