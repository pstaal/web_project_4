

export default class Card {

    constructor(data, cardSelector, handleCardClick) {
        this._text = data.text;
        this._imageLink = data.imageLink
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".places__card").cloneNode(true);

        return cardElement;
    }

    _toggleHeart(){
        this._heartIcon.classList.toggle('places__card-button-liked');
    }

    _removeCard(){
        this._element.remove();
        this._element = null;
    }
   


    _setEventListeners() {
        this._element.querySelector(".places__card-button").addEventListener("click", (evt) => {
            this._toggleHeart(evt);
          });
          this._element.querySelector(".places__card-delete-icon").addEventListener("click", (evt) => {
            this._removeCard(evt);
          });
          this._element.querySelector(".places__card-image").addEventListener("click", (evt) => {
            this._handleCardClick({ link: this._imageLink, text: this._text }); 
          });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._heartIcon = this._element.querySelector(".places__card-button");
        this._setEventListeners(); 
        this._element.querySelector(".places__card-image").src = this._imageLink;
        this._element.querySelector(".places__card-image").alt = this._text;
        this._element.querySelector(".places__card-title").textContent = this._text;
      
        return this._element;
      } 

}