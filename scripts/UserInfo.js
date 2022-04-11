import { profileName, profileFunction } from "./constants.js";

export default class UserInfo {
    constructor ({userName, userJob}){
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        return {
            userName: this._userName,
            userJob: this._userJob
        };
    }

    setUserInfo({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;

        const newName = this._userName;
        const newExpertise = this._userJob;
      
        profileName.textContent = newName;
        profileFunction.textContent = newExpertise;
    }

};