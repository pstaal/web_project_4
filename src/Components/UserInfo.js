export default class UserInfo {
    constructor ({userNameSelector, userJobSelector}){
        this._profileName = document.querySelector(userNameSelector);
        this._profileFunction = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userJob: this._profileFunction.textContent
        };
    }

    setUserInfo({ userName, userJob }) {
        this._profileName.textContent = userName;
        this._profileFunction.textContent = userJob;
    }

};