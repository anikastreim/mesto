const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Ленские столбы',
    link: './images/pillars.jpg'
  },
  {
    name: 'Остров Врангеля',
    link: './images/wrangel-island.jpg'
  },
  {
    name: 'Кунгурская пещера',
    link: '../images/kungur-cave.jpg'
  }
];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const galleryWrapper = document.querySelector('.galleries');
const template = document.getElementById('gallery');
const popup = document.querySelector(".popup");
const editPopup = document.querySelector(".popup_type_edit")
const addPopup = document.querySelector(".popup_type_add");
const imagePopup = document.querySelector(".popup-image");
const closeButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_type_name");
const descriptionInput = popup.querySelector(".popup__input_type_description");
const titleInput = popup.querySelector(".popup__input_type_title");
const linkInput = popup.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup-image__image");
const popupCaption = document.querySelector(".popup-image__caption")

// открытие попапа

function openPopup(popup) {
  popup.classList.add("popup_opened");
};

// закрытие попапа

function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

// попап фулл картинки

// удаление

const deleteImages = (evt) => {
  evt.target.closest('.gallery').remove();
};

// лайки

const likeImages = (evt) => {
  evt.target.classList.toggle('gallery__like_active');
};

// загрузка картинок на страницу

const loadAllImages = (element) => {
    const galleryElements = template.content.cloneNode(true);
    const galleryName = galleryElements.querySelector('.gallery__caption');
    const galleryImage = galleryElements.querySelector('.gallery__image');
    galleryName.textContent = element.name;
    galleryImage.src = element.link;
    galleryImage.alt = element.name;
    const deleteButton = galleryElements.querySelector('.gallery__bin');
    deleteButton.addEventListener('click', deleteImages);
    const likeButton = galleryElements.querySelector('.gallery__like');
    likeButton.addEventListener('click', likeImages);
    galleryImage.addEventListener("click", function() {
      popupCaption.textContent = element.name;
      popupImage.src = element.link;
      popupImage.alt = element.name;
      openPopup(imagePopup);
    })
    return galleryElements;
}

initialCards.forEach((element) => {
  galleryWrapper.append(loadAllImages(element))
})


// попап редактирования

function editButtonClick() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
};

// попап добавления картинки

function addButtonClick() {
  openPopup(addPopup);
};

// сохранение данных в попапе редактирования

function formSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
}


// вызов функций

editButton.addEventListener("click", editButtonClick);
addButton.addEventListener("click", addButtonClick);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener('submit', formSubmit);
