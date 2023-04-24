export default class UserInfo {
  constructor({ userName, userDescription, userAvatar }) {
    this._name = userName;
    this._about = userDescription;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}