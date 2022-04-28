import { api } from "../pages/index.js";

export default class Card {

    constructor(data, cardSelector, handleCardClick, popupConfirmation) {
        this._text = data.text;
        this._imageLink = data.imageLink;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._popupConfirmation = popupConfirmation;
        this._ownerId = data.owner;
        this.id = data._id;
        this._userId = data.currentId;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".places__card").cloneNode(true);

        return cardElement;
    }

    _toggleHeart(){
      let liked = this._element.querySelector(".places__card-button").classList.contains("places__card-button-liked");
      this._heartIcon.classList.toggle('places__card-button-liked');
      api.toggleLike(this.id, liked).then((result) => {
            this._element.querySelector(".places__likes-counter").innerHTML = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // log the error to the console
          });
    }
    

    removeCard(){
        this._element.remove();
        this._element = null;
    }


    _setEventListeners() {
        this._element.querySelector(".places__card-button").addEventListener("click", () => {
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
        this._heartIcon = this._element.querySelector(".places__card-button");
        if(this._likes.some(item => item._id === this._userId)) {
          this._heartIcon.classList.add('places__card-button-liked');
        }
        if(this._ownerId !== this._userId) {
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