import { api, userInfo } from "./Api";




export default class Card {

    constructor(data, cardSelector, handleCardClick, popupConfirmation) {
        this._text = data.text;
        this._imageLink = data.imageLink;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._popupConfirmation = popupConfirmation;
        this._owner = data.owner;
        this.id = data._id;
        this._user = userInfo.getUserInfo().userName;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".places__card").cloneNode(true);

        return cardElement;
    }

    _toggleHeart(){
        this._heartIcon.classList.toggle('places__card-button-liked');
    }

    removeCard(){
        this._element.remove();
        this._element = null;
    }
   


    _setEventListeners() {
        this._element.querySelector(".places__card-button").addEventListener("click", () => {
            api.toggleLike(this.id);
            this._toggleHeart();
          });
          if(this._element.querySelector(".places__card-delete-icon")){ 
            this._element.querySelector(".places__card-delete-icon").addEventListener("click", () => {
              this._popupConfirmation.open(this);
            });
          }
          this._element.querySelector(".places__card-image").addEventListener("click", (evt) => {
            this._handleCardClick({ link: this._imageLink, text: this._text }); 
          });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.setAttribute("id", this.id);
        this._heartIcon = this._element.querySelector(".places__card-button");
        if(this._likes.some(item => item.name === this._user)) {
          this._heartIcon.classList.add('places__card-button-liked');
        }
        if(this._owner !== this._user) {
          this._element.querySelector(".places__card-delete-icon").remove();
        }
        this._setEventListeners(); 
        this._element.querySelector(".places__card-image").src = this._imageLink;
        this._element.querySelector(".places__card-image").alt = this._text;
        this._element.querySelector(".places__card-title").textContent = this._text;
        this._element.querySelector(".places__likes-counter").textContent = this._likes.length;
      
        return this._element;
      } 

}