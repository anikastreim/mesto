let editButton = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close");
let formElement = popup.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__input_name");
let descriptionInput = popup.querySelector(".popup__input_description");

function toggleOpenPopup() {
  popup.classList.toggle("popup_opened");
};
function handleEditButtonClick() {
  toggleOpenPopup();
};
function  handleCloseButtonClick() {
  toggleOpenPopup();
};

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);

function handleFormSubmit (evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let descriptionValue = descriptionInput.value;
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");
  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  nameInput.value = nameValue;
  descriptionInput.value = descriptionValue;
  handleCloseButtonClick();
}

formElement.addEventListener('submit', handleFormSubmit);