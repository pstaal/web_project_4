export default class UserInfo {
    constructor ({userNameSelector, userJobSelector, pictureSelector}){
        this._profileName = document.querySelector(userNameSelector);
        this._profileFunction = document.querySelector(userJobSelector);
        this._picture = document.querySelector(pictureSelector);
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userJob: this._profileFunction.textContent
        };
    }

    setUserInfo({ userName, userJob, userAvatar }) {
        this._profileName.textContent = userName;
        this._profileFunction.textContent = userJob;
        this._picture.src = userAvatar;
    }
};