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

const galleryWrapper = document.querySelector('.galleries');
const template = document.getElementById('gallery');


/* const handleDelete = (evt) => {
  evt.target.closest('.gallery__container').remove();
}; */

const loadImages = (element) => {
    const galleryElements = template.content.cloneNode(true);
    const galleryName = galleryElements.querySelector('.gallery__caption');
    const galleryImage = galleryElements.querySelector('.gallery__image');
    galleryName.textContent = element.name;
    galleryImage.src = element.link;
    galleryImage.alt = element.name;
    /* const deleteButton = galleryElements.querySelector('.button__delete');
    deleteButton.addEventListener('click', handleDelete) */
    return galleryElements;
}

initialCards.forEach((element) => {
    galleryWrapper.append(loadImages(element))
})













let editButton = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");
let formElement = popup.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__input_type_name");
let descriptionInput = popup.querySelector(".popup__input_type_description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function toggleOpenPopup() {
  popup.classList.toggle("popup_opened");
};

function handleEditButtonClick() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  toggleOpenPopup();
};

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", toggleOpenPopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);