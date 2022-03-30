export default class Card {

    constructor(data, cardSelector) {
        this._text = data.text;
        this._imageLink = data.imageLink
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".places__card").cloneNode(true);

        return cardElement;
    }

    _toggleHeart(evt){
        evt.target.classList.toggle('places__card-button-liked');
    }

    _removeCard(evt){
        evt.target.parentElement.remove();
    }

    _openPicturePopup (evt){
        const imageLink = evt.target.src;
        const imageName = evt.target.alt;
        popupImage.setAttribute('src', imageLink);
        popupImage.setAttribute('alt', imageName);    
        popupImageTitle.textContent = imageName;
        openModal(popupForPlace);
    }


    _setEventListeners() {
        this._element.querySelector(".places__card-button").addEventListener("click", (evt) => {
            this._toggleHeart(evt);
          });
          this._element.querySelector(".places__card-delete-icon").addEventListener("click", (evt) => {
            this._removeCard(evt);
          });
          this._element.querySelector(".places__card-image").addEventListener("click", (evt) => {
            this._openPicturePopup(evt);
          });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners(); 
      
        this._element.querySelector(".places__card-image").src = this._imageLink;
        this._element.querySelector(".places__card-image").alt = this._text;
        this._element.querySelector(".places__card-title").textContent = this._text;
      
        return this._element;
      } 

}