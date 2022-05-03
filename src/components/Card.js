export default class Card {

    constructor(data, cardSelector, handleCardClick, popupConfirmation, toggleLike) {
        this._text = data.text;
        this._imageLink = data.imageLink;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._popupConfirmation = popupConfirmation;
        this._ownerId = data.owner;
        this.id = data._id;
        this._userId = data.currentId;
        this._toggleLike = toggleLike;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".places__card").cloneNode(true);

        return cardElement;
    }

    removeCard(){
        this._element.remove();
        this._element = null;
    }

    isLiked() {
      return this._element.querySelector(".places__card-button").classList.contains("places__card-button-liked");
    }

    setLikes(result) {
      this._heartIcon.classList.toggle('places__card-button-liked');
      this._likeCounter.textContent = result.likes.length;
    }


    _setEventListeners() {
        this._heartIcon.addEventListener("click", () => {
            this._toggleLike(this);
        });
          if(this._trashIcon){ 
            this._trashIcon.addEventListener("click", () => {
              this._popupConfirmation.open(this);
            });
          }
          this._pictureElement.addEventListener("click", (evt) => {
            this._handleCardClick({ link: this._imageLink, text: this._text }); 
          });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._heartIcon = this._element.querySelector(".places__card-button");
        this._likeCounter = this._element.querySelector(".places__likes-counter");
        this._pictureElement = this._element.querySelector(".places__card-image");
        this._trashIcon = this._element.querySelector(".places__card-delete-icon");
        if(this._likes.some(item => item._id === this._userId)) {
          this._heartIcon.classList.add('places__card-button-liked');
        }
        if(this._ownerId !== this._userId) {
          this._trashIcon.remove();
        }
        this._setEventListeners(); 
        this._pictureElement.src = this._imageLink;
        this._pictureElement.alt = this._text;
        this._element.querySelector(".places__card-title").textContent = this._text;
        this._likeCounter.textContent = this._likes.length;
      
        return this._element;
      } 

}